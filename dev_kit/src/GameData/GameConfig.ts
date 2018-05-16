
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 * 
 */
class GameConfig{

    // http通讯地址
    private static basicUrl:string = "http://minigame.api.wxagame.com/game-plane/api";
    // 游戏自定义ID
    private static appCode:number = 1;
    // 游戏版本号
    private static version:string = "1.0.0";
    // 游戏基本分享标题
    private static shareTitle:string = "分享标题";
    // 游戏基本分享图片
    private static shareImg:string = "imgUrl";
    // 游戏基本宽
    private static stageWidth:number = 0;
    // 游戏基本高
    private static stageHeight:number = 0;
    // 游戏KEY
    private static key:string = '3&*q(Gzi5$!8*ae&h8y#45+!v';
    // 游戏stage
    private static stage:egret.DisplayObjectContainer = null;



    public static getBasicUrl(){return this.basicUrl};

    public static getAppCode(){return this.appCode};

    public static getVersion(){return this.version};

    public static getShareTitle(){return this.shareTitle};

    public static getShareImg(){return this.shareImg};

    public static setStageWidthHeight(stage:{stageHeight:number,stageWidth:number}){this.stageWidth = stage.stageWidth;this.stageHeight = stage.stageHeight}

    public static getWidth(){return this.stageWidth};

    public static getHeight(){return this.stageHeight};

    public static getKey(){return this.key};

    public static setMain(main:egret.DisplayObjectContainer){
        this.stage = main;
    }

    public static getMain(){
        return this.stage;
    }
}