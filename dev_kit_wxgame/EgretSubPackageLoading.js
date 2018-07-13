class EgretSubPackageLoading extends egret.DisplayObjectContainer {
  constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    EgretSubPackageLoading.instance = this;
  }

  onAddToStage() {
    let _self = this;

    _self.bg = new egret.Bitmap();
    _self.bg.x = 0;
    _self.bg.y = 0;
    _self.bg.width = _self.stage.stageWidth;
    _self.bg.height = _self.stage.stageHeight;
    // 加载背景图资源
    let img_loader = new egret.ImageLoader();
    img_loader.addEventListener(egret.Event.COMPLETE, (evt) => {
      var loader = evt.currentTarget;
      let texture = new egret.Texture();
      texture.bitmapData = loader.data;
      _self.bg.texture = texture;
    }, this);
    img_loader.load('preload/bg.jpg');

    _self.plane = new egret.Bitmap();
    _self.plane.x = 0;
    _self.plane.y = _self.stage.stageHeight / 2;
    _self.plane.rotation = 90;
    // 加载作为进度指示的小飞机图
    let plane_loader = new egret.ImageLoader();
    plane_loader.addEventListener(egret.Event.COMPLETE, (evt) => {
      var loader = evt.currentTarget;
      let texture = new egret.Texture();
      texture.bitmapData = loader.data;
      _self.plane.texture = texture;
      _self.plane.anchorOffsetX = _self.plane.width / 2;
      _self.plane.anchorOffsetY = _self.plane.height / 2;
    }, this);
    plane_loader.load('preload/myplane.png');

    _self.addChild(_self.bg);
    _self.addChild(_self.plane);
  }

  setProgress(res) {
    // iOS真机为totalBytesWriten 微信官方将于近期修复 2018.6.19
    this.plane.x = this.stage.stageWidth * ((res.totalBytesWritten || res.totalBytesWriten) / res.totalBytesExpectedToWrite);
    console.log(res.progress);
  }

  onSuccess() {
    const stage = this.stage;
    EgretSubPackageLoading.instance = null;
    // 创建文档类，开发者需要根据自身项目更改
    const main = new Main();
    // 先加入Main界面，然后在延时去掉loading界面，避免中间出现闪屏
    stage.addChild(main);
    egret.setTimeout(()=>{
      stage.removeChild(this);
    },this,500);
  }
}

window.EgretSubPackageLoading = EgretSubPackageLoading;