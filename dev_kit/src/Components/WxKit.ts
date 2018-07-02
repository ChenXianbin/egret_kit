/**
   * WxKit为优化使用小游戏中常用的函数方法调用
   *
   */

const PLATFORM: WxPlatform = new WxPlatform();

class WxKit {

    // private static code = '';
    private static iv = '';
    private static enctypecode = '';

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

        // 调用 wx.getUserInfo
        await PLATFORM.getUserInfo()
            .then(async (res: { iv?, enctypecode?}) => {
                let userInfo = JSON.parse(JSON.stringify(res))
                WxKit.iv = userInfo.iv;
                WxKit.enctypecode = userInfo.encryptedData;

                // 调用自己的服务器登录接口
                await PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
                    .then(res => {
                        result = JSON.parse(JSON.stringify(res));
                        // 设置通讯token
                        Api.setToken(result.data.token);
                        // 存入用户数据
                        UserData.setUserData(result.data);
                        console.log('login_success');
                    })
                    .catch(err => { console.warn(err) });

                console.warn('get_user_info_success');
                console.log(userInfo);

            })
            .catch(async err => {
                // if方法进入旧版getUserInfo对应的重授权弹窗
                if (typeof wx.createUserInfoButton != 'function') {
                    // 重授权弹窗调用，若拒绝会再次弹出
                    await WxKit.reAuth()
                        .then(async (res: { iv?, encryptedData?}) => {
                            userInfo = JSON.parse(JSON.stringify(res))
                            // 授权成功后登录
                            await PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
                                .then(res => {
                                    result = JSON.parse(JSON.stringify(res));
                                    Api.setToken(result.data.token);
                                    UserData.setUserData(result.data);
                                    console.log('login_success');
                                })
                                .catch(err => {
                                    console.warn(err);
                                });
                        });
                } else {
                    // else 方法进入新版调用 createUserInfoButton授权弹窗
                    wx.hideLoading();
                    var button = wx.createUserInfoButton(WxLoginButton.btnSkin)
                    button.show();
                    button.onTap(async (res) => {
                        console.log(res);
                        if (res.errMsg == 'getUserInfo:ok') {
                            WxKit.iv = res.iv;
                            WxKit.enctypecode = res.encryptedData;
                            await PLATFORM.auth(code, WxKit.iv, WxKit.enctypecode)
                                .then(res => {
                                    result = JSON.parse(JSON.stringify(res));
                                    Api.setToken(result.data.token);
                                    UserData.setUserData(result.data);
                                    console.log('login_success');
                                })
                                .catch(err => { console.warn(err) });
                            button.hide();
                        } else {
                            return false;
                        }

                    });
                }
            })






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
        console.log('set_default_share');
        wx.showShareMenu({
            withShareTicket: true,
            success: (res) => { console.log('setting_success'); console.log(res); },
            fail: (err) => { console.warn(err) }
        });
        wx.onShareAppMessage(function () {
            return {
                title: GameConfig.getShareTitle() || '',
                imageUrl: GameConfig.getShareImg() || ''
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
        console.log('link_done');
        return open_data_container;
    }

    // 上传成绩至开放数据域
    public static async uploadScore(score: number) {

        await PLATFORM.setKVData({ "score": score + '', "date": Utils.getNowDate() })
            .then(res => { });

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



    /**
     * 流量主视频广告调用方法
     * 
     */
    private static video_ads = {};
    private static current_video_ad_id = '';

    public static showVideoAd(ad_id: string, success_callback: Function, err_callback?: Function) {
        // 无ad_id时弹出警告
        if (!(ad_id)) {
            wx.showModal({
                title: '系统提示', content: "请填入ad_id", showCancel: false, cancelText: "", confirmText: "确定",
                success: () => {
                    err_callback();
                }
            })
            return
        }
        // 低版本兼容方法
        if (!(typeof wx.createRewardedVideoAd == 'function')) {
            wx.showModal({
                title: '系统提示', content: "您的微信版本太低，暂时无法获取广告", showCancel: false, cancelText: "", confirmText: "确定",
                success: () => {
                    success_callback();
                }
            })
            return
        }
        this.video_ads[ad_id] = wx.createRewardedVideoAd({
            adUnitId: ad_id
        })
        this.current_video_ad_id = ad_id;
        // 播放广告时暂停背景音乐
        Mp3.stopBGM();
        this.video_ads[ad_id].load()
            .then(() => {
                // 加载成功后播放视频
                this.video_ads[ad_id].show();
            })
            // 加载失败时直接当作玩家视频广告观看成功
            .catch(err => {
                wx.showModal({
                    title: '系统提示', content: "暂时无法获取广告", showCancel: false, cancelText: "", confirmText: "确定",
                    success: () => {
                        this.current_video_ad_id == ad_id && success_callback() && (this.current_video_ad_id = '');
                    }
                })
            });

        // 兼容新老版本广告关闭按钮
        this.video_ads[ad_id].onClose(function onCloseFunc(status) {
            if (!status || status.isEnded) {
                // 用户完整观看广告
                WxKit.current_video_ad_id == ad_id && success_callback() && (WxKit.current_video_ad_id = '');
            } else {
                // 用户提前点击了【关闭广告】按钮,进入失败回调
                err_callback && WxKit.current_video_ad_id == ad_id && err_callback() && (WxKit.current_video_ad_id = '');
            }
            // 关闭后重开背景音乐
            Mp3.playBGM();
            // 停止监听close方法
            WxKit.video_ads[ad_id].offClose(onCloseFunc);
        })

    }

    /**
     * banner广告调用方法
     */
    public static showBannerAd(ad_id: string): any {
        // 无ad_id时弹出警告
        if (!(ad_id)) {
            wx.showModal({
                title: '系统提示', content: "请填入ad_id", showCancel: false, cancelText: "", confirmText: "确定",
                success: () => { }
            })
            return null;
        }
        // 低版本兼容方法
        let bannerAd = typeof wx.createBannerAd == 'function' ? wx.createBannerAd({
            adUnitId: ad_id,
            style: {
                left: 0,
                top: 0,
                width: 350
            }
        }) : null;
        if (bannerAd) {
            bannerAd.show();
            let { screenWidth, screenHeight } = wx.getSystemInfoSync()
            bannerAd.onResize(res => {
                // banner广告放在底部
                bannerAd.style.top = screenHeight - bannerAd.style.realHeight;
            });
            bannerAd.style.width = screenWidth;
        }
        return bannerAd;
    }


}
