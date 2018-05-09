class UserData {
    private static openId:string;
    private static id:string;
    private static avatar_url:string;
    private static nickname:string;
    private static gender:string;
    private static userInfo:{}


    public static getOpenId(){
        return this.openId;
    }

    public static getId(){
        return this.id;
    }

    public static getUserData(){
        return JSON.parse(JSON.stringify(this.userInfo));
    }

    public static setUserData(userData:{avatar_url,id,nickname,gender,open_id}){
        this.avatar_url = userData.avatar_url;
        this.openId = userData.open_id;
        this.nickname = userData.nickname;
        this.gender = userData.gender;
        this.id = userData.id;
        this.userInfo = userData;
    }
}