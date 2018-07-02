/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */

declare interface Platform {

    getFriendCloudStorage(): Promise<any>;

    getGroupCloudStorage(shareTicket: string): Promise<any>;

    getUserInfo(): Promise<any>;

    login(): Promise<any>;

    setKVData(data): Promise<any>;

    auth(jsCode: String, iv: String, encryptedData: String): Promise<any>;

    showAuthModal(): Promise<any>;

}

class WxPlatform implements Platform {

    name = 'wxgame'
    header = {}

    // 开放域获取好友排行
    public async getFriendCloudStorage() {
        return new Promise((resolve, reject) => {
            wx.getFriendCloudStorage({
                keyList: ["socre", "date"],
                success: (res) => {
                    console.log(res);
                    resolve(res);
                },
                fail(err) {
                    reject(err);
                }
            })
        })
    }


    // 开放域获取群组排行
    public async getGroupCloudStorage(shareTicket: string) {

        return new Promise((resolve, reject) => {
            wx.getGroupCloudStorage({
                keyList: ["score", "date"],
                success: res => {
                    // console.log(res.data);
                    let data: Array<Object> = new Array();
                    if (res.data && res.data.length != 0) {
                        res.data.forEach((item, index) => {
                            let kvData = Utils.transObj(item.KVDataList);
                            if (Utils.isInTimeRange(kvData['date'])) {
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
                        })
                        data.sort(function (a, b) {
                            let valueA = a['score'];
                            let valueB = b['score'];
                            return valueB - valueA;
                        })
                    }

                    resolve(data);
                },
                fail: err => {
                    reject(err);
                },
                complete: res => {

                },
                shareTicket: shareTicket
            });
        });
    }

    public async setKVData(data) {
        return new Promise((resolve, reject) => {
            let dataList = [];
            for (let key in data) {
                dataList.push({ key: key, value: data[key] });
            }
            wx.setUserCloudStorage({
                KVDataList: dataList,
                success: (res) => {
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }


    public async login() {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '游戏加载中...',
                mask: true
            })
            wx.login({
                success: (res) => {
                    resolve(res);
                }, fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    public async auth(jsCode, iv, encrytedData) {
        return new Promise((resolve, reject) => {
            let data = {
                js_code: jsCode,
                iv: iv,
                encrypted_data: encrytedData
            }
            let that = this
            wx.request({
                url: Api.loginPath,
                method: 'POST',
                data: data,
                success: function (res) {
                    that.header = {
                        Authorization: res.data.token
                    }
                    wx.hideLoading()
                    resolve(res)
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    }

    public async getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    userInfo.encryptedData = res.encryptedData;
                    userInfo.iv = res.iv;
                    resolve(userInfo);
                }, fail: function (err) {
                    reject(err);
                }
            });
        });
    }


    public async showAuthModal() {
        wx.hideLoading();
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: '提示',
                content: '请您进行登陆授权',
                showCancel: false,
                cancelText: '',
                confirmText: '去授权',
                success: function (res) {
                    wx.openSetting({
                        success: function (result) {
                            resolve(result);
                        },
                        fail: function (err) {
                            reject(err);
                        }
                    })

                },
            })
        })
    }
}


if (!window.platform) {
    window.platform = new WxPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





