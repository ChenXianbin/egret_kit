  /**
     * eKit为优化使用方法后的egret引擎常用函数调用，包括创建bitmap，text，shape等
     *
     */
class eKit {

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * @param  {string} name
     * @param  {Object} settings?
     */
    public static createBitmapByName(name: string, settings?: Object): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if (settings) {
            for (let key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    }

    /**
     * 根据text创建TextField对象
     * @param  {string} text
     * @param  {Object} settings?
     */
    public static createText(text: string, settings?: Object): egret.TextField {
        let result = new egret.TextField();
        result.text = text;
        if (settings) {
            for (let key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    }


    /**
     * 异步根据URL获取头像
     * @param  {any=''} url
     * @param  {Object} settings?
     */
    public static async createAvatar(url: any = '', settings?: Object) {
        return new Promise((resolve, reject) => {
            if (!url) { reject('无头像') }
            RES.getResByUrl(url, function (evt: any) {
                let textTure: egret.Texture = <egret.Texture>evt;
                let bitmap: egret.Bitmap = new egret.Bitmap(textTure);
                if (settings) {
                    for (let key in settings) {
                        bitmap[key] = settings[key];
                    }
                }
                resolve(bitmap);
            }, this, RES.ResourceItem.TYPE_IMAGE)
        })
    }


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
    public static createLine(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape {
        let shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.moveTo(points[0][0], points[0][1]);
        points.map((point, index) => {
            index > 0 && shp.graphics.lineTo(points[index][0], points[index][1]);
        });
        shp.graphics.endFill();
        if (settings) {
            for (let key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    }


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
    public static createRect(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape {
        let shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawRect(points[0], points[1], points[2], points[3]);
        if (settings) {
            for (let key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    }

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
    public static createCircle(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape {
        let shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawCircle(points[0], points[1], points[2]);
        if (settings) {
            for (let key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    }

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
    public static createArc(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape {
        let shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawArc(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (let key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    }

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
    public static createRoundRect(points: Array<any>, param: { beginFill?: { color: number, alpha: number }, lineStyle?: { thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number } }, settings?: Object): egret.Shape {
        let shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawArc(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (let key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    }
}