# 小游戏开发套件设计

## 套件制作目的

对egret引擎开发微信小游戏过程中的通用数据结构及基础代码进行提取，方便复用

## 套件功能点：

### 0.wx_mini_game.d.ts声明文件优化（进行中）

    对标微信小游戏api标准文档，对非必传字段作出兼容，减少冒红

### 1.基础 Http 通讯（制定通讯格式）（已完成）

    1.基础Http通讯，调用 new Api(token)传入token后可以进行http通讯

### 2.基础 WebSocket 通讯（制定通讯格式）(todo)

### 3.微信登陆流程封装（单句调用，拒绝授权时回调，封装记录token）（已完成）

    1. await 调用 WxKit.login(),阻塞进程，拒绝授权时重复提醒,将信息写入UserData内，返回 {code,iv,encryptedData}

### 4.微信分享流程封装（单句调用，回调分享结果，分享成功后上传数据埋点）（已完成）

    1.微信初始化分享及显示分享按钮封装完成

    2.微信分享调用封装完成（分为三类，普通分享，重生分享，群排名分享）其中根据埋点，群排名分为结果页群排名与排行榜群排名

### 5.游戏重生功能封装（已完成）

    1.await 调用 WxKit.rebornGame 方法，返回重生分享成功与否的布尔值

### 6.上传成绩封装（已完成）

    1.调用Records.updateScore 更新自己游戏成绩

    2.调用Records.getScore 获取自己的游戏成绩

    3.调用Records.uploadScore 上传成绩到自己服务器及腾讯云服务器

### 7.获取世界排行榜（单句调用，带loading界面，返回排行数据）（已完成）

    1.await 调用 Records.refreshWorldRanking 重新请求世界排行榜数据

    2.调用 Records.getRankings 获取已缓存的世界排行榜数据（全榜）

### 8.开放数据域接入方法基础封装（单句调用，data与view分离）（已完成）

    1.主域调用开放数据域方法完成，调用WxKit.linkOpenData ,传入type决定获取数据类型为好友排行，群组排行和相邻好友

### 9.开放数据域四种常规用法数据结构封装（1.好友排行榜 2.群组排行榜 3.排名相邻好友显示）（已完成）


### 10.个人最高及本周最高战绩获取封装（已完成）

    1.await调用 Records.getWeekRecord获取周最高成绩

    2.await调用 Records.getHistoryRecord获取历史最高成绩

### 11.封装物理引擎引用(todo)

    1.封装p2物理引擎（todo）

    2.封装3d物理引擎（todo）

### 12.版本控制功能封装（已完成）

    版本控制信息刷新功能完成

    根据功能节点名查询版本控制情况调用完成

### 13.egret引擎基本用法优化封装（加载头像，插入图片，插入文字，插入矢量绘图）（已完成）

    1.创建Bitmap对象：eKit.createBitmapByName(name: string, settings?: Object): egret.Bitmap

    2.创建TextField对象：eKit.createText(text: string, settings?: Object): egret.TextField

    3.异步创建用户头像的Bitmap对象：eKit.createAvatar(url: any = '', settings?: Object)

    4.创建折线段矢量绘图对象：eKit.createLine(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape

    5.创建矩形矢量绘图对象：eKit.createRect(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape

    6.创建圆形矢量绘图对象：eKit.createCircle(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape

    7.创建圆弧路径矢量绘图对象：eKit.createArc(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape

    8.创建圆角矩形矢量绘图对象：eKit.createRoundRect(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape

    9.创建序列帧方法（todo）

### 14.引导判定封装(todo)

### 15.触摸操控套件封装（摇杆+按钮，触摸定位，左右点击，四格点击等）(todo)

### 16.音频调用封装(已完成)

    根据微信小游戏的音频API封装简易的音频加载及播放调用函数

### 17.数据埋点封装(已完成)
    
    调用 Api.postEvent()传入event_type即可调用埋点方法

    游戏打开埋点于登陆成功之后

    分享埋点于分享成功回调

### 18.标准化处理函数（日期，小数点等）(todo)
