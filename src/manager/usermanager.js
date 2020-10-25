import axios from "axios";

var userinfo=null;

class UserManager
{


    static userinfo=null;
    static usertoken=null;


    static UserAuth={
        admin:'admin',
        client:'client',
        terminal:'terminal'
    }

    static checkUserHasAuth(auth){
        if(UserManager.userinfo==null){
            return false;
        }
        return UserManager.userinfo.authority.includes(auth);
    }



    static SetUserToken(token){
        localStorage.setItem('coldcdnusertoken', token);
    }

    static UnSetUserToken(){
        localStorage.setItem('coldcdnusertoken', null);
    }

    static GetUserToken(){
        let result= localStorage.getItem('coldcdnusertoken');
        if(result=='null'||result===null){
            return null;
        }
        return result;
    }

    static   GetUserInfo(){
        return UserManager.userinfo;
    }

    static async UpdateUserInfo(){
            //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response=  await axios.get("https://coldcdn.com/api/v1/user/userinfo",{headers: {
                    Authorization: "Bearer "+UserManager.GetUserToken()
                }});

            if(response.data.status==0){
                UserManager.userinfo=response.data.data;
                return;
            }

            /////wrong user
            UserManager.UnSetUserToken();
            console.log(response.data);

    }


    static TokenCheckAndRedirectLogin(){
        if(UserManager.GetUserToken()===null){
            window.location.href="/login";
        }
    }

    static UnsetTokenAndRedirectHome(){
        UserManager.UnSetUserToken();
        window.location.href="/homepage.html";
    }



}

export default UserManager;