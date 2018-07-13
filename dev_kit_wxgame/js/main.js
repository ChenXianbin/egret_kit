var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
var WxPlatform = (function () {
    function WxPlatform() {
        this.name = 'wxgame';
        this.header = {};
    }
    // 开放域获取好友排行
    WxPlatform.prototype.getFriendCloudStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getFriendCloudStorage({
                            keyList: ["socre", "date"],
                            success: function (res) {
                                console.log(res);
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    // 开放域获取群组排行
    WxPlatform.prototype.getGroupCloudStorage = function (shareTicket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getGroupCloudStorage({
                            keyList: ["score", "date"],
                            success: function (res) {
                                // console.log(res.data);
                                var data = new Array();
                                if (res.data && res.data.length != 0) {
                                    res.data.forEach(function (item, index) {
                                        var kvData = Utils.transObj(item.KVDataList);
                                        if (Utils.isInTimeRange(kvData['date'])) {
                                            data.push({
                                                score: parseInt(kvData['score']),
                                                date: kvData['date'] || '',
                                                openId: item.openid,
                                                user: {
                                                    nickname: item.nickname,
                                                    avatar_url: item.avatarUrl
                                                }
                                            });
                                        }
                                    });
                                    data.sort(function (a, b) {
                                        var valueA = a['score'];
                                        var valueB = b['score'];
                                        return valueB - valueA;
                                    });
                                }
                                resolve(data);
                            },
                            fail: function (err) {
                                reject(err);
                            },
                            complete: function (res) {
                            },
                            shareTicket: shareTicket
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.setKVData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataList = [];
                        for (var key in data) {
                            dataList.push({ key: key, value: data[key] });
                        }
                        wx.setUserCloudStorage({
                            KVDataList: dataList,
                            success: function (res) {
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.showLoading({
                            title: '游戏加载中...',
                            mask: true
                        });
                        wx.login({
                            success: function (res) {
                                resolve(res);
                            }, fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.auth = function (jsCode, iv, encrytedData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = {
                            js_code: jsCode,
                            iv: iv,
                            encrypted_data: encrytedData
                        };
                        var that = _this;
                        wx.request({
                            url: Api.loginPath,
                            method: 'POST',
                            data: data,
                            success: function (res) {
                                that.header = {
                                    Authorization: res.data.token
                                };
                                wx.hideLoading();
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getUserInfo({
                            success: function (res) {
                                var userInfo = res.userInfo;
                                var nickName = userInfo.nickName;
                                var avatarUrl = userInfo.avatarUrl;
                                var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                                var province = userInfo.province;
                                var city = userInfo.city;
                                var country = userInfo.country;
                                userInfo.encryptedData = res.encryptedData;
                                userInfo.iv = res.iv;
                                resolve(userInfo);
                            }, fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.showAuthModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.hideLoading();
                return [2 /*return*/, new Promise(function (resolve, reject) {
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
                                });
                            },
                        });
                    })];
            });
        });
    };
    return WxPlatform;
}());
__reflect(WxPlatform.prototype, "WxPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new WxPlatform();
}
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 *
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.getBasicUrl = function () { return this.basicUrl; };
    ;
    GameConfig.getAppCode = function () { return this.appCode; };
    ;
    GameConfig.getVersion = function () { return this.version; };
    ;
    GameConfig.getShareTitle = function () { return this.shareTitle; };
    ;
    GameConfig.getShareImg = function () { return this.shareImg; };
    ;
    GameConfig.setStageWidthHeight = function (stage) { this.stageWidth = stage.stageWidth; this.stageHeight = stage.stageHeight; };
    GameConfig.getWidth = function () { return this.stageWidth; };
    ;
    GameConfig.getHeight = function () { return this.stageHeight; };
    ;
    GameConfig.getKey = function () { return this.key; };
    ;
    GameConfig.setMain = function (main) {
        this.stage = main;
    };
    GameConfig.getMain = function () {
        return this.stage;
    };
    // http通讯地址,请自行填入自己的服务器地址，若有跨域问题则点开开发工具详情，勾选不校验合法域名
    GameConfig.basicUrl = "";
    // 游戏自定义ID
    GameConfig.appCode = 1;
    // 游戏版本号
    GameConfig.version = "1.0.0";
    // 游戏基本分享标题
    GameConfig.shareTitle = "分享标题";
    // 游戏基本分享图片
    GameConfig.shareImg = "imgUrl";
    // 游戏基本宽
    GameConfig.stageWidth = 0;
    // 游戏基本高
    GameConfig.stageHeight = 0;
    // 游戏KEY
    GameConfig.key = '';
    // 游戏stage
    GameConfig.stage = null;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
var Utils = (function () {
    function Utils() {
    }
    Utils.getNowDate = function () {
        return this.dateFtt(new Date(), "yyyy-MM-dd hh:mm:ss");
    };
    Utils.getWeekTime = function () {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth();
        var d = now.getDate();
        var day = now.getDay();
        var weekStart = new Date(y, m, d - (day ? (day - 1) : 6));
        var weekEnd = new Date(y, m, d + (day ? (8 - day) : 1));
        Utils.dateRange = [this.dateFtt(weekStart), this.dateFtt(weekEnd)];
        return Utils.dateRange;
    };
    Utils.isInTimeRange = function (timeStr) {
        if (timeStr) {
            var recordTime = new Date(timeStr.replace(/-/g, '/')).getTime();
            return recordTime > this.dateRange[0] && recordTime < this.dateRange[1];
        }
        else {
            return false;
        }
    };
    Utils.transObj = function (kvData) {
        var res = {};
        kvData.map(function (data) {
            res[data.key] = data.value;
        });
        return res;
    };
    // 时间格式处理
    Utils.dateFtt = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        fmt || (fmt = "yyyy-MM-ddThh:mm:ss+00:00");
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Utils.dateRange = [];
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
/**
   * eKit为优化使用方法后的egret引擎常用函数调用，包括创建bitmap，text，shape等
   *
   */
var eKit = (function () {
    function eKit() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * @param  {string} name
     * @param  {Object} settings?
     */
    eKit.createSprite = function (settings) {
        var result = new egret.Sprite();
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * @param  {string} name
     * @param  {Object} settings?
     */
    eKit.createBitmapByName = function (name, settings) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 根据text创建TextField对象
     * @param  {string} text
     * @param  {Object} settings?
     */
    eKit.createText = function (text, settings) {
        var result = new egret.TextField();
        result.text = text;
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 异步根据URL获取头像
     * @param  {any=''} url
     * @param  {Object} settings?
     */
    eKit.createAvatar = function (url, settings) {
        if (url === void 0) { url = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!url) {
                            reject('无头像');
                        }
                        RES.getResByUrl(url, function (evt) {
                            var textTure = evt;
                            var bitmap = new egret.Bitmap(textTure);
                            if (settings) {
                                for (var key in settings) {
                                    bitmap[key] = settings[key];
                                }
                            }
                            resolve(bitmap);
                        }, _this, RES.ResourceItem.TYPE_IMAGE);
                    })];
            });
        });
    };
    /**
     * 根据参数绘制直线段
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createLine = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.moveTo(points[0][0], points[0][1]);
        points.map(function (point, index) {
            index > 0 && shp.graphics.lineTo(points[index][0], points[index][1]);
        });
        shp.graphics.endFill();
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制矩形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createRect = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawRect(points[0], points[1], points[2], points[3]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createCircle = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawCircle(points[0], points[1], points[2]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆弧路径
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createArc = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawArc(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆角矩形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createRoundRect = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawRoundRect(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 传入一个DisplayObject，将其从其父元素上移除
     * @param  {egret.DisplayObject} children
     */
    eKit.removeChild = function (children) {
        if (children.parent) {
            children.parent.removeChild(children);
        }
    };
    /**
     * 清空显示容器内显示元素，可输入start防止索引号之前的元素被清空
     * @param  {egret.DisplayObjectContainer} displayObjectContainer
     * @param  {number} start?
     */
    eKit.clearView = function (displayObjectContainer, start) {
        isNaN(start) && (start = -1);
        while (displayObjectContainer.$children.length > start + 1) {
            displayObjectContainer.removeChildAt(start + 1);
        }
        return true;
    };
    return eKit;
}());
__reflect(eKit.prototype, "eKit");
// baseUrl:http请求接口地址
var baseUrl = GameConfig.getBasicUrl();
// version:后台定义的游戏id
var app_code = GameConfig.getAppCode();
// app_code:后台定义的游戏版本号
var version = GameConfig.getVersion();
var Api = (function () {
    function Api() {
    }
    /**
     * post请求数据，默认需要token才能请求
     * @param  {} url post地址
     * @param  {} data post数据，默认放在body内
     */
    Api.post = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!Api.token) {
                            reject('token为空，请重新登陆');
                        }
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(url, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.setRequestHeader("Authorization", Api.token);
                        request.send(data);
                        request.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = evt.currentTarget;
                            res.response ? resolve(JSON.parse(res.response)) : resolve({});
                        }, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                            reject(evt);
                        }, _this);
                    })];
            });
        });
    };
    /**
     * get请求数据
     * @param  {} url 请求地址
     * @param  {} noToken? 是否需要传入token，若为true，则不需要传token亦可访问
     */
    Api.get = function (url, noToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!Api.token && !noToken) {
                            reject('token为空，请重新登陆');
                        }
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(url, egret.HttpMethod.GET);
                        request.setRequestHeader("Authorization", Api.token);
                        request.send();
                        request.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = evt.currentTarget;
                            resolve(JSON.parse(res.response));
                        }, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                            reject(evt);
                        }, _this);
                    })];
            });
        });
    };
    Api.getToken = function () {
        return this.token;
    };
    /**
     * uploadRecords 上传成绩，调用后返回true即上传成功，返回false即上传失败
     * @param  {} record_data
     */
    Api.uploadRecords = function (record_data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        // MD5签名
                        record_data = MD5.createSignObject(record_data);
                        return [4 /*yield*/, Api.post(Api.uploadRecordsPath, record_data).catch(function (e) {
                                result = false;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getBestRecord 根据传入的时间范围，调用后返回传入时间范围内最佳成绩，如有错误，则返回null
     * @param  {} timeRange
     */
    Api.getBestRecord = function (record_type) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.get(Api.bestRecordPath + '?record_type=' + record_type).then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getRankings 调用后返回世界排行榜数据，如有错误，则返回null
     * @param  {} timeRange
     */
    Api.getRankings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        wx.showLoading({
                            title: '排行榜加载中...',
                            mask: true,
                            success: function () { },
                            fail: function () { },
                            complete: function () { }
                        });
                        return [4 /*yield*/, Api.get(Api.getRankingsPath + '?record_type=1&page=1&per_page=200').then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        wx.hideLoading();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getRankings 调用后返回分享图片链接，如有错误，则返回默认分享图地址
     * @param  {} timeRange
     */
    Api.getShareUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        return [4 /*yield*/, Api.get(Api.getShareUrlPath).then(function (res) {
                                result = res.url;
                            }).catch(function (e) {
                                result = '';
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 查询socket用的地址，return{tunnelId,connectUrl}
     */
    Api.getTunnel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.get(Api.tunnelPath).then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Api.postEvent = function (event_type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.doPostEvent) {
                    return [2 /*return*/, true];
                }
                if (isNaN(event_type)) {
                    event_type = this.event_type.indexOf(event_type) + 1;
                }
                else if (!this.event_type[event_type]) {
                    event_type = 0;
                }
                if (event_type == 0) {
                    throw new Error('事件传值不是预设的值');
                }
                Api.post(Api.postEventPath, { event_type: event_type });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 查询版本控制情况
     */
    Api.getConfiguration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.get(Api.configurationsPath + '?version=' + version + '&app_code=' + app_code, true)
                                .then(function (res) { result = res[0]; })
                                .catch(function (err) { console.warn(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 登陆完成，获取token后调用以设置token
     * @param  {string} token
     */
    Api.setToken = function (token) {
        Api.token = token;
    };
    Api.baseUrl = baseUrl;
    // api地址
    Api.loginPath = baseUrl + '/game-plane/api/v1/auth_login'; //登录游戏
    Api.uploadRecordsPath = baseUrl + "/game-plane/api/v1/upload_record"; //上传成绩
    Api.bestRecordPath = baseUrl + "/game-plane/api/v2/best_record"; //获取最好成绩
    Api.getRankingsPath = baseUrl + "/game-plane/api/v2/week_rank_list"; //获取世界周排行榜
    Api.getShareUrlPath = baseUrl + "/game-plane/api/share_url"; //动态获取分享图片
    Api.postEventPath = baseUrl + "/game-plane/api/events"; //事件埋点上传
    Api.tunnelPath = baseUrl + "/game-plane/api/tunnel"; //获取socket地址
    Api.configurationsPath = baseUrl + "/game-plane/api/v1/config"; //获取游戏配置JSON
    // 事件类型字段                打开     单人游戏       上传成绩        重玩      分享           结果群排名     排行榜榜群排名  重生  
    Api.event_type = ['open', 'singleGame', 'uploadScore', 'replay', 'normalShare', 'groupResult', 'groupRank', 'reborn'];
    /**
     * 事件埋点
     * @param  {number} event_type
     */
    Api.doPostEvent = false;
    return Api;
}());
__reflect(Api.prototype, "Api");
var rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
};
var addUnsigned = function (lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4)
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
        if (lResult & 0x40000000)
            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        else
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    }
    else {
        return (lResult ^ lX8 ^ lY8);
    }
};
var F = function (x, y, z) {
    return (x & y) | ((~x) & z);
};
var G = function (x, y, z) {
    return (x & z) | (y & (~z));
};
var H = function (x, y, z) {
    return (x ^ y ^ z);
};
var I = function (x, y, z) {
    return (y ^ (x | (~z)));
};
var FF = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
};
var GG = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
};
var HH = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
};
var II = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
};
var convertToWordArray = function (string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWordsTempOne = lMessageLength + 8;
    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
};
var wordToHex = function (lValue) {
    var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValueTemp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
};
var uTF8Encode = function (string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
    var output = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            output += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        }
        else {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
};
var MD5 = (function () {
    function MD5() {
    }
    MD5.createNonceStr = function (length) {
        //  默认创建16为随机字符串
        length || (length = 16);
        var alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += alphabet[Math.floor(Math.random() * (62))];
        }
        return result;
    };
    MD5.createSignObject = function (param) {
        var param_str = '', noncestr = this.createNonceStr();
        param['nonce_str'] = noncestr;
        var param_arr = [];
        for (var key in param) {
            param_arr.push(key + '=' + param[key]);
        }
        param_str = param_arr.sort(function (a, b) { return a > b ? 1 : -1; }).join('&') + '&key=' + GameConfig.getKey();
        console.log(param_str);
        param['nonce_str'] = noncestr;
        param['sign'] = this.encode(param_str).toUpperCase();
        return param;
    };
    MD5.encode = function (string) {
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = uTF8Encode(string);
        x = convertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        return tempValue.toLowerCase();
    };
    return MD5;
}());
__reflect(MD5.prototype, "MD5");
var Mp3 = (function () {
    function Mp3() {
    }
    // 初始化音轨
    Mp3.loadEventSound = function () {
        this.eventSoundList = SoundRes.eventSoundList.map(function (soundData) {
            if (!soundData['cnt']) {
                soundData['context'] = wx.createInnerAudioContext();
                soundData['context'].src = soundData.path;
                return soundData;
            }
            else {
                var obj = { name: soundData.name, soundArr: [] };
                for (var i = 0, l = soundData['cnt']; i < l; i++) {
                    var res = {};
                    res['context'] = wx.createInnerAudioContext();
                    res['context'].src = soundData.path;
                    obj['soundArr'].push(res);
                }
                return obj;
            }
        });
    };
    // 切换背景音乐
    Mp3.switchBgm = function (bgm_name) {
        var _this = this;
        this.bgm && this.bgm.pause();
        this.eventSoundList.map(function (soundData) {
            if (soundData.name == bgm_name) {
                if (soundData['context']) {
                    _this.bgm = soundData['context'];
                }
                else {
                    _this.bgm = soundData['soundArr'][0]['context'];
                }
            }
        });
        this.bgm && (this.bgm.loop = true);
        this.bgm && !this.mute && this.bgm.play();
    };
    //播放背景音乐
    Mp3.playBGM = function () {
        this.bgm && !this.mute && this.bgm.play();
    };
    // 停止背景音乐
    Mp3.stopBGM = function () {
        this.bgm && this.bgm.pause();
    };
    // 播放事件音效
    Mp3.playEvent = function (event_name) {
        var _this = this;
        this.eventSoundList.map(function (soundData) {
            if (soundData.name == event_name) {
                if (soundData['context']) {
                    !_this.mute && soundData['context'].play();
                }
                else {
                    var target = soundData['soundArr'][0];
                    soundData['soundArr'].push(soundData['soundArr'].shift());
                    !_this.mute && target['context'].play();
                }
            }
        });
    };
    Mp3.bgm = null;
    Mp3.eventSoundList = null;
    // 静音标识
    Mp3.mute = false;
    return Mp3;
}());
__reflect(Mp3.prototype, "Mp3");
var Records = (function () {
    function Records() {
    }
    /**
     * 获取个人周最高成绩
     */
    Records.getWeekScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var weekTime, postData, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        weekTime = Utils.getWeekTime();
                        postData = {
                            record_type: 1
                        };
                        record = 0;
                        return [4 /*yield*/, Api.getBestRecord(1).then(function (res) { record = res['week_best']; })];
                    case 1:
                        _a.sent();
                        this.weekScore = record;
                        return [2 /*return*/, record];
                }
            });
        });
    };
    /**
     * 获取个人历史最高成绩
     */
    Records.getHistoryScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postData, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            record_type: 1
                        };
                        record = 0;
                        return [4 /*yield*/, Api.getBestRecord(1).then(function (res) { record = res['history_best']; })];
                    case 1:
                        _a.sent();
                        this.historyScore = record;
                        return [2 /*return*/, record];
                }
            });
        });
    };
    /**
     * 网络刷新世界排行榜数据
     */
    Records.refreshWorldRanking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.getRankings().then(function (res) { result = res; })];
                    case 1:
                        _a.sent();
                        this.worldRankings = result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 获取世界排行榜数据
     */
    Records.getRankings = function () {
        return JSON.parse(JSON.stringify(this.worldRankings));
    };
    /**
     * 获取当前成绩
     */
    Records.getScore = function () {
        return this.score;
    };
    /**
     * 更新当前成绩
     */
    Records.updateScore = function (score) {
        this.score = score || 0;
    };
    /**
     * 更新当前游戏类型
     */
    Records.updateRecordType = function (record_type) {
        this.record_type = record_type || 0;
    };
    /**
     * 上传成绩，同时上传至腾讯云及自己服务器
     */
    Records.uploadScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var uploadData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadData = { score: (this.score || 0), record_type: (this.record_type || 1) };
                        // 若网络不好，上传自己服务器失败，则重新上传（后期需完善若超时规则）
                        return [4 /*yield*/, Api.uploadRecords(uploadData)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = !result;
                                        if (!_a) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Records.updateScore()];
                                    case 1:
                                        _a = (_b.sent());
                                        _b.label = 2;
                                    case 2:
                                        _a;
                                        return [2 /*return*/];
                                }
                            }); }); })];
                    case 1:
                        // 若网络不好，上传自己服务器失败，则重新上传（后期需完善若超时规则）
                        _a.sent();
                        return [4 /*yield*/, WxKit.uploadScore(this.score || 0)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // 玩家当前局成绩
    Records.score = 62;
    return Records;
}());
__reflect(Records.prototype, "Records");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createChildren, _this);
        return _this;
    }
    Main.prototype.createChildren = function () {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        loadingView.visible = false;
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        console.log('load_1');
                        return [4 /*yield*/, RES.loadGroup("preload", 0, null)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("subpackage", 0, loadingView)];
                    case 3:
                        _a.sent();
                        console.log('load_2');
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        // 设置游戏参数内的默认舞台宽高
        GameConfig.setStageWidthHeight(this.stage);
        // 刷新版本控制数据
        VersionCtrl.refreshVersionCtrl();
        // 绘制背景
        var sky = eKit.createBitmapByName("bg_jpg", { width: GameConfig.getWidth(), height: GameConfig.getHeight(), x: 0, y: 0, touchEnabled: true });
        this.addChild(sky);
        /**
         *常用调用示例,不需要登录的在第一列
         *
         */
        // 切换背景音乐调用示例
        var bgm_btn = eKit.createSprite({ x: 20, y: 20 });
        this.addChild(bgm_btn);
        var bgm_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        bgm_btn.addChild(bgm_btn_bg);
        bgm_btn.addChild(eKit.createText('切换音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        bgm_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Mp3.switchBgm('bgm_game');
        }, this);
        // 事件音乐调用示例
        var music_btn = eKit.createSprite({ x: 20, y: 100 });
        this.addChild(music_btn);
        var music_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        music_btn.addChild(music_btn_bg);
        music_btn.addChild(eKit.createText('调用事件音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        music_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Mp3.playEvent('hit');
        }, this);
        // 触发粒子特效
        var particle_btn = eKit.createSprite({ x: 20, y: 180 });
        this.addChild(particle_btn);
        var particle_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        particle_btn.addChild(particle_btn_bg);
        particle_btn.addChild(eKit.createText('触发粒子', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        particle_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var system;
            return __generator(this, function (_a) {
                system = new particle.GravityParticleSystem(RES.getRes('boom_png'), RES.getRes('boom_json'));
                system.start(50);
                this.addChild(system);
                return [2 /*return*/];
            });
        }); }, this);
        // 清空按钮
        var clear_btn = eKit.createSprite({ x: 20, y: 260 });
        this.addChild(clear_btn);
        var clear_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        clear_btn.addChild(clear_btn_bg);
        clear_btn.addChild(eKit.createText('清空按钮', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        clear_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                eKit.clearView(this, 0);
                return [2 /*return*/];
            });
        }); }, this);
        // 显示banner广告,请先确保你的小游戏拥有流量主权限
        var banner_ad = null;
        var show_banner_ad_btn = eKit.createSprite({ x: 20, y: 340 });
        this.addChild(show_banner_ad_btn);
        var show_banner_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        show_banner_ad_btn.addChild(show_banner_ad_btn_bg);
        show_banner_ad_btn.addChild(eKit.createText('显示BANNER广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        show_banner_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // showBannerAd第一个参数填入广告id
                !banner_ad && (banner_ad = WxKit.showBannerAd(''));
                return [2 /*return*/];
            });
        }); }, this);
        // 隐藏banner广告
        var hide_banner_ad_btn = eKit.createSprite({ x: 20, y: 420 });
        this.addChild(hide_banner_ad_btn);
        var hide_banner_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        hide_banner_ad_btn.addChild(hide_banner_ad_btn_bg);
        hide_banner_ad_btn.addChild(eKit.createText('隐藏BANNER广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        hide_banner_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                banner_ad && typeof banner_ad.hide == 'function' && (banner_ad.hide(), banner_ad.destory(), banner_ad = null);
                return [2 /*return*/];
            });
        }); }, this);
        // 显示视频广告
        var show_video_ad_btn = eKit.createSprite({ x: 20, y: 500 });
        this.addChild(show_video_ad_btn);
        var show_video_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        show_video_ad_btn.addChild(show_video_ad_btn_bg);
        show_video_ad_btn.addChild(eKit.createText('显示视频广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        show_video_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // showVideoAd第一个参数填入广告id
                WxKit.showVideoAd('', function () {
                    //成功回调
                    wx.showToast({ title: '观看广告成功', icon: 'success', image: null });
                }, function () {
                    //失败回调
                    wx.showToast({ title: '观看广告失败', icon: null, image: null });
                });
                return [2 /*return*/];
            });
        }); }, this);
        /**
         * 常用调用示例,需要登录的在第二列
         *
         */
        // 登录调用示例
        var login_btn = eKit.createSprite({ x: 160, y: 20 });
        this.addChild(login_btn);
        var login_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        login_btn.addChild(login_btn_bg);
        login_btn.addChild(eKit.createText('调用登录', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
                    return [4 /*yield*/, WxKit.login()];
                    case 1:
                        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
                        _a.sent();
                        // console.log(UserData.getOpenId());
                        wx.hideLoading();
                        // 设置默认分享,需要登录后方可调用分享功能
                        WxKit.setDefaultShare();
                        WxKit.setOnShowRule();
                        return [2 /*return*/];
                }
            });
        }); }, this);
        // 分享调用示例
        var share_btn = eKit.createSprite({ x: 160, y: 100 });
        this.addChild(share_btn);
        var btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        share_btn.addChild(btn_bg);
        share_btn.addChild(eKit.createText('调用分享', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { WxKit.shareGame('normalShare', '我就试试分享', ''); }, this);
        // 调用开放数据域获取好友排行榜
        var friend_ranking_btn = eKit.createSprite({ x: 160, y: 180 });
        this.addChild(friend_ranking_btn);
        var friend_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        friend_ranking_btn.addChild(friend_ranking_btn_bg);
        friend_ranking_btn.addChild(eKit.createText('好友排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        friend_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var open_data;
            return __generator(this, function (_a) {
                open_data = WxKit.linkOpenData({});
                this.addChild(open_data);
                return [2 /*return*/];
            });
        }); }, this);
        // 播放背景音乐
        Mp3.loadEventSound();
        Mp3.switchBgm('bgm_default');
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var Ws = (function () {
    function Ws() {
    }
    return Ws;
}());
__reflect(Ws.prototype, "Ws");
/**
   * WxKit为优化使用小游戏中常用的函数方法调用
   *
   */
var PLATFORM = new WxPlatform();
var WxKit = (function () {
    function WxKit() {
    }
    /**
     * 调用login完成getUserInfo版登陆操作
     */
    WxKit.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var code, userInfo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = null;
                        userInfo = null;
                        result = null;
                        return [4 /*yield*/, PLATFORM.login()
                                .then(function (res) { code = res.code; })
                                .catch(function (err) { console.warn(err); })];
                    case 1:
                        _a.sent();
                        // 调用 wx.getUserInfo
                        return [4 /*yield*/, PLATFORM.getUserInfo()
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var userInfo;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            userInfo = JSON.parse(JSON.stringify(res));
                                            WxKit.iv = userInfo.iv;
                                            WxKit.enctypecode = userInfo.encryptedData;
                                            // 调用自己的服务器登录接口
                                            return [4 /*yield*/, PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
                                                    .then(function (res) {
                                                    result = JSON.parse(JSON.stringify(res));
                                                    // 设置通讯token
                                                    Api.setToken(result.data.token);
                                                    // 存入用户数据
                                                    UserData.setUserData(result.data);
                                                    console.log('login_success');
                                                })
                                                    .catch(function (err) { console.warn(err); })];
                                        case 1:
                                            // 调用自己的服务器登录接口
                                            _a.sent();
                                            console.warn('get_user_info_success');
                                            console.log(userInfo);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var button;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(typeof wx.createUserInfoButton != 'function')) return [3 /*break*/, 2];
                                            // 重授权弹窗调用，若拒绝会再次弹出
                                            return [4 /*yield*/, WxKit.reAuth()
                                                    .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                userInfo = JSON.parse(JSON.stringify(res));
                                                                // 授权成功后登录
                                                                return [4 /*yield*/, PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
                                                                        .then(function (res) {
                                                                        result = JSON.parse(JSON.stringify(res));
                                                                        Api.setToken(result.data.token);
                                                                        UserData.setUserData(result.data);
                                                                        console.log('login_success');
                                                                    })
                                                                        .catch(function (err) {
                                                                        console.warn(err);
                                                                    })];
                                                            case 1:
                                                                // 授权成功后登录
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            // 重授权弹窗调用，若拒绝会再次弹出
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            // else 方法进入新版调用 createUserInfoButton授权弹窗
                                            wx.hideLoading();
                                            button = wx.createUserInfoButton(WxLoginButton.btnSkin);
                                            button.show();
                                            button.onTap(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            console.log(res);
                                                            if (!(res.errMsg == 'getUserInfo:ok')) return [3 /*break*/, 2];
                                                            WxKit.iv = res.iv;
                                                            WxKit.enctypecode = res.encryptedData;
                                                            return [4 /*yield*/, PLATFORM.auth(code, WxKit.iv, WxKit.enctypecode)
                                                                    .then(function (res) {
                                                                    result = JSON.parse(JSON.stringify(res));
                                                                    Api.setToken(result.data.token);
                                                                    UserData.setUserData(result.data);
                                                                    console.log('login_success');
                                                                })
                                                                    .catch(function (err) { console.warn(err); })];
                                                        case 1:
                                                            _a.sent();
                                                            button.hide();
                                                            return [3 /*break*/, 3];
                                                        case 2: return [2 /*return*/, false];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        // 调用 wx.getUserInfo
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getUserInfo授权失败时重新弹出需授权弹窗,若拒绝则继续弹出
     */
    WxKit.reAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                wx.hideLoading();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        PLATFORM.showAuthModal()
                            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!res.authSetting['scope.userInfo']) return [3 /*break*/, 2];
                                        return [4 /*yield*/, PLATFORM.getUserInfo().then(function (res) { resolve(res); })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, WxKit.reAuth().then(function (res) { resolve(res); })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    /**
     * 设置默认分享
     */
    WxKit.setDefaultShare = function () {
        console.log('set_default_share');
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) { console.log('setting_success'); console.log(res); },
            fail: function (err) { console.warn(err); }
        });
        wx.onShareAppMessage(function () {
            return {
                title: GameConfig.getShareTitle() || '',
                imageUrl: GameConfig.getShareImg() || ''
            };
        });
    };
    /**
     * @param  {string} type? type可能取值 ： groupRank(排行榜群排行) groupResult(结果页群排行) reborn(分享重生) normalShare(普通分享)
     * @param  {string} title?
     * @param  {string} imageUrl?
     */
    WxKit.shareGame = function (type, title, imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 不传type时，默认为普通分享
                        type || (type = 'normalShare');
                        // 不传title时，为默认title
                        title || (title = GameConfig.getShareTitle());
                        // 不传imageUrl时，为默认image
                        imageUrl || (imageUrl = GameConfig.getShareImg());
                        if (!(imageUrl == 'get')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Api.getShareUrl()];
                    case 1:
                        imageUrl = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.shareAppMessage({
                                title: title,
                                imageUrl: imageUrl,
                                query: type.match('group') ? 'groupRank=1' : '',
                                success: function (res) {
                                    resolve(res);
                                },
                                fail: function (err) { resolve(null); }
                            });
                        })];
                }
            });
        });
    };
    /**
     * 分享重生调用
     * @param  {string} title
     * @param  {string} imgUrl?
     */
    WxKit.rebornGame = function (title, imgUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var reborn_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reborn_result = false;
                        return [4 /*yield*/, WxKit.shareGame('reborn', title, imgUrl).then(function (res) { reborn_result = !!res; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reborn_result];
                }
            });
        });
    };
    WxKit.linkOpenData = function (message, width, height) {
        var basic = {
            isDisplay: "true",
            token: Api.getToken(),
            userInfo: UserData.getUserData()
        };
        for (var key in message) {
            basic[key] = message[key];
        }
        var open_data_container = new egret.Sprite();
        var openDataContext = wx.getOpenDataContext();
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var bitmap;
        bitmap = new egret.Bitmap(texture);
        bitmap.width = width || GameConfig.getWidth();
        bitmap.height = height || GameConfig.getHeight();
        bitmap.name = "openData";
        open_data_container.addChild(bitmap);
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        openDataContext.postMessage(basic);
        console.log('link_done');
        return open_data_container;
    };
    // 上传成绩至开放数据域
    WxKit.uploadScore = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PLATFORM.setKVData({ "score": score + '', "date": Utils.getNowDate() })
                            .then(function (res) { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * 设置回到前台事件处理音频及群排行
     */
    WxKit.setOnShowRule = function () {
        wx.onShow(function () {
            Mp3.playBGM();
        });
    };
    WxKit.showVideoAd = function (ad_id, success_callback, err_callback) {
        var _this = this;
        // 无ad_id时弹出警告
        if (!(ad_id)) {
            wx.showModal({
                title: '系统提示', content: "请填入ad_id", showCancel: false, cancelText: "", confirmText: "确定",
                success: function () {
                    err_callback();
                }
            });
            return;
        }
        // 低版本兼容方法
        if (!(typeof wx.createRewardedVideoAd == 'function')) {
            wx.showModal({
                title: '系统提示', content: "您的微信版本太低，暂时无法获取广告", showCancel: false, cancelText: "", confirmText: "确定",
                success: function () {
                    success_callback();
                }
            });
            return;
        }
        this.video_ads[ad_id] = wx.createRewardedVideoAd({
            adUnitId: ad_id
        });
        this.current_video_ad_id = ad_id;
        // 播放广告时暂停背景音乐
        Mp3.stopBGM();
        this.video_ads[ad_id].load()
            .then(function () {
            // 加载成功后播放视频
            _this.video_ads[ad_id].show();
        })
            .catch(function (err) {
            wx.showModal({
                title: '系统提示', content: "暂时无法获取广告", showCancel: false, cancelText: "", confirmText: "确定",
                success: function () {
                    _this.current_video_ad_id == ad_id && success_callback() && (_this.current_video_ad_id = '');
                }
            });
        });
        // 兼容新老版本广告关闭按钮
        this.video_ads[ad_id].onClose(function onCloseFunc(status) {
            if (!status || status.isEnded) {
                // 用户完整观看广告
                WxKit.current_video_ad_id == ad_id && success_callback() && (WxKit.current_video_ad_id = '');
            }
            else {
                // 用户提前点击了【关闭广告】按钮,进入失败回调
                err_callback && WxKit.current_video_ad_id == ad_id && err_callback() && (WxKit.current_video_ad_id = '');
            }
            // 关闭后重开背景音乐
            Mp3.playBGM();
            // 停止监听close方法
            WxKit.video_ads[ad_id].offClose(onCloseFunc);
        });
    };
    /**
     * banner广告调用方法
     */
    WxKit.showBannerAd = function (ad_id) {
        // 无ad_id时弹出警告
        if (!(ad_id)) {
            wx.showModal({
                title: '系统提示', content: "请填入ad_id", showCancel: false, cancelText: "", confirmText: "确定",
                success: function () { }
            });
            return null;
        }
        // 低版本兼容方法
        var bannerAd = typeof wx.createBannerAd == 'function' ? wx.createBannerAd({
            adUnitId: ad_id,
            style: {
                left: 0,
                top: 0,
                width: 350
            }
        }) : null;
        if (bannerAd) {
            bannerAd.show();
            var _a = wx.getSystemInfoSync(), screenWidth = _a.screenWidth, screenHeight_1 = _a.screenHeight;
            bannerAd.onResize(function (res) {
                // banner广告放在底部
                bannerAd.style.top = screenHeight_1 - bannerAd.style.realHeight;
            });
            bannerAd.style.width = screenWidth;
        }
        return bannerAd;
    };
    // private static code = '';
    WxKit.iv = '';
    WxKit.enctypecode = '';
    /**
     * 流量主视频广告调用方法
     *
     */
    WxKit.video_ads = {};
    WxKit.current_video_ad_id = '';
    return WxKit;
}());
__reflect(WxKit.prototype, "WxKit");
var WxLoginButton = (function (_super) {
    __extends(WxLoginButton, _super);
    function WxLoginButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WxLoginButton.btnSkin = {
        type: 'text',
        text: '开 始 游 戏',
        style: {
            left: 22,
            bottom: 160,
            width: 360,
            height: 80,
            lineHeight: 80,
            backgroundColor: 'rgba(160,180,240,0.7)',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 32,
            borderRadius: 6,
        }
    };
    return WxLoginButton;
}(Object));
__reflect(WxLoginButton.prototype, "WxLoginButton");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var partRes = (function () {
    function partRes() {
    }
    partRes.initList = function () {
        this.list.map(function (res) {
            res.texture = RES.getRes(res.texture_path);
            res.json = RES.getRes(res.json_path);
        });
    };
    partRes.getRes = function (name) {
        var result = { texture: null, json: null };
        this.list.map(function (res) {
            if (res.name == name) {
                result = res;
            }
        });
        return result;
    };
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    partRes.list = [
        { name: 'boom', texture_path: 'boom_png', texture: null, json_path: 'boom_json', json: null },
        { name: 'hit', texture_path: 'hit_png', texture: null, json_path: 'hit_json', json: null },
        { name: 'flame', texture_path: 'flame_png', texture: null, json_path: 'flame_json', json: null },
    ];
    return partRes;
}());
__reflect(partRes.prototype, "partRes");
// 音频资源配置JSON
var SoundRes = (function () {
    function SoundRes() {
    }
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    SoundRes.eventSoundList = [
        { name: 'bgm_default', path: 'resource/assets/mp3/bgm_default.mp3' },
        { name: 'bgm_game', path: 'resource/assets/mp3/bgm_game2.mp3' },
        // 高频调用的音效，如子弹射击/击中音效等，进行多音轨队列播放，用 cnt 控制音轨队列容量
        { name: 'hit', path: 'resource/assets/mp3/hit.mp3', cnt: 10 },
    ];
    return SoundRes;
}());
__reflect(SoundRes.prototype, "SoundRes");
var UserData = (function () {
    function UserData() {
    }
    UserData.getOpenId = function () {
        return this.openId;
    };
    UserData.getId = function () {
        return this.id;
    };
    UserData.getUserData = function () {
        return JSON.parse(JSON.stringify(this.userInfo));
    };
    UserData.setUserData = function (userData) {
        this.avatar_url = userData.avatar_url;
        this.openId = userData.open_id;
        this.nickname = userData.nickname;
        this.gender = userData.gender;
        this.id = userData.id;
        this.userInfo = userData;
    };
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
// 版本控制组件
var VersionCtrl = (function () {
    function VersionCtrl() {
    }
    /**
     * 调用refreshVersionCtrl重新获取
     */
    VersionCtrl.refreshVersionCtrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Api.getConfiguration()];
                    case 1:
                        _a.configuration = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VersionCtrl.queryConfig = function (key) {
        return this.configuration[key];
    };
    return VersionCtrl;
}());
__reflect(VersionCtrl.prototype, "VersionCtrl");
;window.Main = Main;