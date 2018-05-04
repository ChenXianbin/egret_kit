class Utils {
    private static dateRange = [];

    public static getNowDate(){
        return this.dateFtt(new Date(),"yyyy-MM-dd hh:mm:ss");
    }

    public static getWeekTime() {
        let now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth();
        let d = now.getDate();
        let day = now.getDay();
        let weekStart = new Date(y, m, d - (day ? (day - 1) : 6));
        let weekEnd = new Date(y, m, d + (day ? (8 - day) : 1))
        Utils.dateRange = [this.dateFtt(weekStart), this.dateFtt(weekEnd)];
        return Utils.dateRange
    }

    public static isInTimeRange(timeStr) {
        if (timeStr) {
            let recordTime = new Date(timeStr.replace(/-/g, '/')).getTime();
            return recordTime > this.dateRange[0] && recordTime < this.dateRange[1];
        } else {
            return false;
        }

    }

    public static transObj(kvData) {
        let res = {};
        kvData.map((data) => {
            res[data.key] = data.value;
        })
        return res;
    }
    // 时间格式处理
    public static dateFtt(date,fmt?) {
        var o = {
            "M+": date.getMonth() + 1,                     //月份   
            "d+": date.getDate(),                          //日   
            "h+": date.getHours(),                         //小时   
            "m+": date.getMinutes(),                       //分   
            "s+": date.getSeconds(),                       //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),   //季度   
            "S": date.getMilliseconds()                    //毫秒   
        };
        fmt || (fmt = "yyyy-MM-ddThh:mm:ss+00:00");
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}