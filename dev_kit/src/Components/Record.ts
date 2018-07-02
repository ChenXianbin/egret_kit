class Records {
    // 玩家自己本周最高成绩
    private static weekScore: any;
    // 玩家历史最高成绩
    private static historyScore: any;
    // 世界排行榜总表
    private static worldRankings: any;
    // 玩家当前局成绩
    private static score: number = 62;
    // 玩家当前记录类型
    private static record_type:number;


    /**
     * 获取个人周最高成绩
     */
    public static async getWeekScore() {
        let weekTime = Utils.getWeekTime();
        let postData = {
            record_type:1
        }
        let record = 0
        await Api.getBestRecord(1).then(res => { record = res['week_best'] });
        this.weekScore = record;
        return record;
    }

    /**
     * 获取个人历史最高成绩
     */
    public static async getHistoryScore() {
        let postData = {
           record_type:1
        }
        let record = 0
        await Api.getBestRecord(1).then(res => { record = res['history_best'] });
        this.historyScore = record;
        return record;
    }

    /**
     * 网络刷新世界排行榜数据
     */
    public static async refreshWorldRanking() {
        let result = null;
        await Api.getRankings().then(res => { result = res });
        this.worldRankings = result;
        return result;
    }

    /**
     * 获取世界排行榜数据
     */
    public static getRankings() {
        return JSON.parse(JSON.stringify(this.worldRankings));
    }

    /**
     * 获取当前成绩
     */
    public static getScore() {
        return this.score;
    }

    /**
     * 更新当前成绩
     */
    public static updateScore(score?: number) {
        this.score = score || 0;
    }

    /**
     * 更新当前游戏类型
     */
    public static updateRecordType(record_type?: number) {
        this.record_type = record_type || 0;
    }



    /**
     * 上传成绩，同时上传至腾讯云及自己服务器
     */
    public static async uploadScore(){
        let uploadData = {score:(this.score||0),record_type:(this.record_type||1)};
        // 若网络不好，上传自己服务器失败，则重新上传（后期需完善若超时规则）
        await Api.uploadRecords(uploadData)
            .then(async result =>{ !result && await Records.updateScore()});

        await WxKit.uploadScore(this.score || 0);

        return true;
    }

}