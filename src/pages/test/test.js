
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



    renderContent(){
        if(!this.state.dataready||!UserManager.checkUserHasAuth(UserManager.UserAuth.admin)){
            return (<div className="alert alert-danger" role="alert">Auth Required</div>);
        }


        return(<div>
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
        </div>);
    }


    render() {


        const Content=this.renderContent();

        return (
            <AdminLayout
                name="test"
                description="testpage"
            >
                {Content}
            </AdminLayout>
        );
    }
}

export  default  TestPage;