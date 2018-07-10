class EgretSubPackageLoading extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        EgretSubPackageLoading.instance = this;
    }

    onAddToStage() {
        this.txt = new egret.TextField();
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.width = this.stage.stageWidth;
        this.txt.y = this.stage.stageHeight - this.txt.size >> 1;
        this.txt.textColor = 0xff0000;
        this.addChild(this.txt);
    }

    setProgress(res) {
        // iOS真机为totalBytesWriten 微信官方将于近期修复 2018.6.19
        this.txt.text = `${res.totalBytesWritten || res.totalBytesWriten} / ${res.totalBytesExpectedToWrite}`;
        console.log(res.progress);
    }

    onSuccess() {
        const stage = this.stage;
        stage.removeChild(this);
        EgretSubPackageLoading.instance = null;
        // 创建文档类，开发者需要根据自身项目更改
        const main = new Main();
        stage.addChild(main);
    }
}

window.EgretSubPackageLoading = EgretSubPackageLoading;