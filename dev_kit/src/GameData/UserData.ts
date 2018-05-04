class UserData {
    private static openId:string;
    private static avatar_url:string;
    private static nickname:string;
    private static gender:string;
    private static userInfo:{}


    public static getOpenId(){
        return this.openId;
    }

    public static getUserData(){
        return JSON.parse(JSON.stringify(this.userInfo));
    }

    public static setUserData(userData:{avatar_url,id,nickname,gender}){
        this.avatar_url = userData.avatar_url;
        this.openId = userData.id;
        this.nickname = userData.nickname;
        this.gender = userData.gender;
        this.userInfo = userData;
    }
}