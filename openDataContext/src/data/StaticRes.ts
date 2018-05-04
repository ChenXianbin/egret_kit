// 对于固定加载的资源，可以在此进行加载
class StaticRes{

    private static RES :Array<any>;

    private static paths:Array<{name:string,path:string,settings?:{}}> = [
        {name:'bg',path:"resource/assets/bg.jpg",settings:{}}
    ]

    /**
     * 根据paths加载静态的图片等资源
     */
    public static async loadPaths(){
        this.RES = this.paths.map(async (path)=>{
            let texture = await eKit.createBitmapByPath(path.path,path.settings);
            return {name:path.name,texture:texture};
        });
    }

    /**
     * 根据name获取对应texture
     * @param  {string} name
     */
    public static getRes(name:string){
        let texture = null;
        this.RES.map((res)=>{
            if(res.name == name){
                texture = res.texture;
            }
        });
        return texture;
    }
}