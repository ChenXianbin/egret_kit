/**
   * WxKit为优化使用小游戏中常用的函数方法调用
   *
   */

const PLATFORM: WxPlatform = new WxPlatform();

class WxKit {

    /**
     * 调用login完成getUserInfo版登陆操作
     */
    public static async login() {
        let code = null;
        let userInfo = null;
        let result = null;
        await PLATFORM.login()
            .then((res: { code?}) => { code = res.code })
            .catch(err => { console.warn(err) });
        await PLATFORM.getUserInfo()
            .then((res: { iv?, enctypecode?}) => { userInfo = JSON.parse(JSON.stringify(res)) })
            .catch(async err => {
                await WxKit.reAuth()
                    .then((res: { iv?, encryptedData?}) => { userInfo = JSON.parse(JSON.stringify(res)) });
            })

        await PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
            .then(res => { result = JSON.parse(JSON.stringify(res)); })
            .catch(err => { console.warn(err) });
        Api.setToken(result.data.token);
        UserData.setUserData(result.data);
        Api.postEvent('open');
        console.log('login_success');
        return result;
    }

    /**
     * getUserInfo授权失败时重新弹出需授权弹窗,若拒绝则继续弹出
     */
    private static async reAuth() {
        wx.hideLoading();
        return new Promise((resolve, reject) => {
            PLATFORM.showAuthModal()
                .then(async (res: { authSetting }) => {
                    if (res.authSetting['scope.userInfo']) {
                        await PLATFORM.getUserInfo().then(res => { resolve(res); })
                    } else {
                        await WxKit.reAuth().then(res => { resolve(res); });
                    }
                })
        })
    }

    /**
     * 设置默认分享
     */
    public static setDefaultShare() {
        wx.showShareMenu({
            withShareTicket: true,
            success: void (0),
            fail: void (0)
        });
        wx.onShareAppMessage(function () {
            return {
                title: GameConfig.getShareTitle(),
                imageUrl: GameConfig.getShareImg()
            }
        });

    }

    /**
     * @param  {string} type? type可能取值 ： groupRank(排行榜群排行) groupResult(结果页群排行) reborn(分享重生) normalShare(普通分享)
     * @param  {string} title? 
     * @param  {string} imageUrl?
     */
    public static async shareGame(type?: string, title?: string, imageUrl?: string) {
        // 不传type时，默认为普通分享
        type || (type = 'normalShare');
        // 不传title时，为默认title
        title || (title = GameConfig.getShareTitle());
        // 不传imageUrl时，为默认image
        imageUrl || (imageUrl = GameConfig.getShareImg());

        if (imageUrl == 'get') {
            imageUrl = await Api.getShareUrl();
        }

        return new Promise((resolve, reject) => {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: type.match('group') ? 'groupRank=1' : '',
                success: res => {
                    Api.postEvent(type);
                    resolve(res);
                },
                fail: (err) => { resolve(null); }
            })
        })

    }

    /**
     * 分享重生调用
     * @param  {string} title
     * @param  {string} imgUrl?
     */
    public static async rebornGame(title: string, imgUrl?: string) {
        let reborn_result = false;
        await WxKit.shareGame('reborn', title, imgUrl).then(res => { reborn_result = !!res; })
        return reborn_result;
    }



    public static linkOpenData(message: {}, width?: number, height?: number) {
        let basic = {
            isDisplay: "true",
            token: Api.getToken(),
            userInfo: UserData.getUserData()
        }

        for (let key in message) {
            basic[key] = message[key];
        }

        let open_data_container = new egret.Sprite();
        let openDataContext = wx.getOpenDataContext();
        const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        let bitmap: egret.Bitmap;
        bitmap = new egret.Bitmap(texture);
        bitmap.width = width || GameConfig.getWidth();
        bitmap.height = height || GameConfig.getHeight();
        bitmap.name = "openData";
        open_data_container.addChild(bitmap);

        egret.startTick((timeStarmp: number) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);

        openDataContext.postMessage(basic);

        return open_data_container;
    }

    public static async uploadScore(score: number) {
        let week_record = 0;
        await Records.getWeekScore().then(res => {
            week_record = res;
        });
        if (score >= week_record) {
            await PLATFORM.setKVData({"score":score + '' , "date": Utils.getNowDate()})
                .then(res =>{});
        }
        return true;
    }

    /**
     * 设置回到前台事件处理音频及群排行
     */
    public static setOnShowRule() {
        wx.onShow(() => {
            Mp3.playBGM();
        })
    }

}

// 设置默认分享
WxKit.setDefaultShare();
WxKit.setOnShowRule();