
// 版本控制组件
class VersionCtrl{

    private static configuration:{};
    
    /**
     * 调用refreshVersionCtrl重新获取
     */
    public static async refreshVersionCtrl(){
        this.configuration =  await Api.getConfiguration();
    }

    public static queryConfig(key:string){
        return this.configuration[key];
    }
}