
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import {isMobile} from 'react-device-detect';

class WelcomePage extends React.Component {


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

        let mobilewarning=(<div></div>)
        if (isMobile) {
            mobilewarning=(<div className="alert alert-danger" role="alert">
                Mobile web browser is not supported.
                Please use desktop web browser.
            </div>)
        }


        return (
            <AdminLayout
                name="Welcome"
                description="Welcome"
            >

                <div className="card border-light shadow-sm">
                    <div className="card-body">

                            <div>Welcome:{UserManager.userinfo.username}</div>
                            <div>CurentTime :{new Date().toLocaleString()}</div>
                            {mobilewarning}
                    </div>
                </div>

            </AdminLayout>
        );
    }
}

export  default  WelcomePage;