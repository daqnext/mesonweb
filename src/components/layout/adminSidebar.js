import React from "react";

import './sidebar.css'
import UserManager from "../../manager/usermanager";

class AdminSidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            dataready:false
        };
    }

    
    async componentDidMount() {

        if(UserManager.GetUserToken()==null){
            this.setState({
                dataready:true
            });
            return;
        }

        ////////
        await UserManager.UpdateUserInfo();
        this.setState({
            dataready:true
        });
    }


    renderLoginRegbar(){
        if(UserManager.GetUserInfo()!=null){
            return <div></div>
        }

        return(
                <div>
                    <div className="sidenav-menu-heading">Login/Register</div>

                    <a className="nav-link " href="/login"
                       aria-controls="collapseDashboards">
                        <div className="nav-link-icon"><i data-feather="log-in"></i></div>
                        Login
                    </a>

                    <a className="nav-link " href="/register"
                       aria-controls="collapseDashboards">
                        <div className="nav-link-icon"><i data-feather="plus"></i></div>
                        Register
                    </a>
                </div>
            )
    }


    renderUserAdminSiderBar(){
        if(!UserManager.checkUserHasAuth(UserManager.UserAuth.admin)){
            return (<div></div>)
        }

        return (
            <div>
                <div className="sidenav-menu-heading">Admin-Pannel</div>
                <a className="nav-link " href="/test"
                   aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    Test
                </a>
                <a className="nav-link " href="/usermanager" aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    UserManager
                </a>
                <a className="nav-link " href="/monitoring" aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    Monitoring
                </a>
            </div>
        )

    }

    renderUserClientSiderBar(){
        if(!UserManager.checkUserHasAuth(UserManager.UserAuth.client)){
            return (<div></div>)
        }

        return (
            <div>
                <div className="sidenav-menu-heading">CDN-Client-Pannel</div>
                <a className="nav-link " href="/binddomain" aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    BindDomain
                </a>
            </div>
        )

    }



    renderUserSiderBar(){
        if(UserManager.GetUserInfo()==null){
            return <div></div>
        }

        const UserAdminSiderBar=this.renderUserAdminSiderBar();
        const UserClientSiderBar=this.renderUserClientSiderBar();
        return (

            <div>
                <div className="sidenav-menu-heading">Welcome</div>
                <a className="nav-link " href="/welcome"
                   aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    Dashboards
                </a>

                {UserAdminSiderBar}
                {UserClientSiderBar}

                <div className="sidenav-menu-heading">Finance</div>
                <a className="nav-link " href="/balance"
                   aria-controls="collapseDashboards">
                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                    My-Balance
                </a>


                <div className="sidenav-footer">
                    <div className="sidenav-footer-content">
                        <div className="sidenav-footer-subtitle">Logged in as:</div>
                        <div className="sidenav-footer-title">{UserManager.GetUserInfo().username}</div>
                    </div>
                </div>

            </div>


        )
    }


    render() {

        if(!this.state.dataready){
            return <div></div>
        }

        const LoginRegbar=this.renderLoginRegbar();
        const UserSiderBar=this.renderUserSiderBar();


        return (
                <div id="layoutSidenav_nav" style={{borderRight:"1px solid #dedede"}}>
                    <nav className="sidenav sidenav-light">
                        <div className="sidenav-menu">
                            <div className="nav">
                                {UserSiderBar}
                                {LoginRegbar}
                            </div>
                        </div>
                    </nav>
                </div>
        );
    }
}

export  default AdminSidebar;