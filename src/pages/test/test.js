
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";

class TestPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
           await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true
        });
    }

    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }

        return (
            <AdminLayout
                name="test"
                description="testpage"
            >
                <div onClick={()=>{

                    usermanager.getuserinfo("dSyyh3wPoKGuNHSqHjOGWg==")

                }}>test userinfo</div>

                <div onClick={()=>{

                   UserManager.SetUserToken("xxxx");

                }}>set user token</div>

                <div onClick={()=>{

                    localStorage.coldcdnusertoken=null;
                    console.log(localStorage.coldcdnusertoken);

                }}>unset user token</div>


                <div onClick={()=>{

                    console.log(UserManager.GetUserInfo());

                }}>log userinfo</div>



            </AdminLayout>
        );
    }
}

export  default  TestPage;