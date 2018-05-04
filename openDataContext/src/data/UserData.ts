class UserData {
    public static userInfo: {};
    public static token: string;
    public static shareTicket: string;
    public static type: string;
    private static keyList: Array<any> = ["score", "date"];
    private static dateRange: Array<any> = []

    public static friendRanking: Array<any> = [];
    public static groupRanking: Array<any> = [];
    public static neighborRanking:Array<any> = [];


    /**
     * 获取好友排行榜数据
     */
    private static async getFriendStorage() {
        return new Promise((resolve, reject) => {
            wx.getFriendCloudStorage({
                keyList: ["score", "date"],
                success: res => {
                    let data: Array<Object> = new Array();
                    if (res.data && res.data.length != 0) {
                        res.data.forEach((item, index) => {
                            let kvData = this.transObj(item.KVDataList);
                            if (this.isInTimeRange(kvData['date'])) {
                                data.push({
                                    score: parseInt(kvData['score']),
                                    date: kvData['date'] || '',
                                    openId: item.openid,
                                    user: {
                                        nickname: item.nickname,
                                        avatar_url: item.avatarUrl
                                    }
                                })
                            }
                        });
                        data.sort(function (a, b) {
                            let valueA = a['score'];
                            let valueB = b['score'];
                            return valueB - valueA;
                        });
                        data = data.map((dat, index) => {
                            let result = JSON.parse(JSON.stringify(dat));
                            result.rank = ++index;
                            return result;
                        })
                    }
                    
                    resolve(data);
                },
                fail: err => {
                    reject(err);
                },
                complete: res => {

                }
            })
        })
    }

    /**
     * 获取群组排行榜
     * @param  {string} shareTicket
     */
    private static async getGroupStorage(shareTicket: string) {
        return new Promise((resolve, reject) => {
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: ["score", "date"],
                success: res => {
                    let data: Array<Object> = new Array();
                    if (res.data && res.data.length != 0) {
                        res.data.forEach((item, index) => {
                            let kvData = this.transObj(item.KVDataList);
                            if (this.isInTimeRange(kvData['date'])) {
                                data.push({
                                    score: parseInt(kvData['score']),
                                    date: kvData['date'] || '',
                                    openId: item.openid,
                                    user: {
                                        nickname: item.nickname,
                                        avatar_url: item.avatarUrl
                                    }
                                })
                            }
                        });
                        data.sort(function (a, b) {
                            let valueA = a['score'];
                            let valueB = b['score'];
                            return valueB - valueA;
                        });
                        data = data.map((dat, index) => {
                            let result = JSON.parse(JSON.stringify(dat));
                            result.rank = ++index;
                            return result;
                        })
                    }
                    resolve(data);
                },
                fail: err => {
                    reject(err);
                },
                complete: res => {

                }
            })
        })
    }

    /**
     * 获取完整的好友排行榜数据
     */
    public static async getFriendRanking() {
        let result = null;
        await this.getFriendStorage()
            .then(res => { result = res })
            .catch(err => { console.warn(err) });
        this.friendRanking = result || [];
        return result;
    }

    /**
     * 获取与自己排名相近的好友成绩及排名
     * @param  {number} range?
     */
    public static async getNeighborFriend(range?: number) {
        let userId = UserData.userInfo['id'];
        let results = [];
        let rankData = null;
        let userIndex = -1;
        range || (range = 1);
        await this.getFriendStorage()
            .then(res => { rankData = res })
            .catch(err => { console.warn(err) });
        if (rankData) {
            if (rankData.length <= range * 2 + 1) {
                results = rankData
            } else {
                rankData.map((data, index) => {
                    if (data.openId == userId) {
                        userIndex = index;
                    }
                });

                for (let cnt = -range, target = range; cnt <= target; cnt++) {
                    if (rankData[cnt]) {
                        results.push(rankData[userIndex + cnt]);
                    } else {
                        if (cnt < 0) {
                            results.push(rankData[userIndex + range + (range + cnt + 1)]);
                        } else {
                            results.push(rankData[userIndex - range - (range - cnt + 1)]);
                        }
                    }
                }
                results.sort((a, b) => { return a.rank - b.rank; })
            }
        }
        this.neighborRanking = results;
        return results;
    }


    /**
     * 获取完整的群组排行榜数据
     */
    public static async getGroupRanking(shareTicket: string) {
        let results = null;
        await this.getGroupStorage(shareTicket)
            .then(res => { results = res })
            .catch(err => { console.warn(err) });
            this.groupRanking = results || [];
        return results;
    }


    public static getWeekTime() {
        let now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth();
        let d = now.getDate();
        let day = now.getDay();
        let weekStart = new Date(y, m, d - (day ? (day - 1) : 6));
        let weekEnd = new Date(y, m, d + (day ? (8 - day) : 1))
        this.dateRange = [weekStart.getTime(), weekEnd.getTime()];
    }

    private static isInTimeRange(timeStr) {
        if (timeStr) {
            let recordTime = new Date(timeStr.replace(/-/g, '/')).getTime();
            return recordTime > this.dateRange[0] && recordTime < this.dateRange[1];
        } else {
            return false;
        }

    }

    private static transObj(kvData) {
        let res = {};
        kvData.map((data) => {
            res[data.key] = data.value;
        })
        return res;
    }
}

UserData.getWeekTime();