import React from "react";

import './sidebar.css'
import UserManager from "../../manager/usermanager";

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataready: false,
        };
    }


    logout(){
        UserManager.UnsetTokenAndRedirectHome();
    }


    async componentDidMount() {
        if (UserManager.GetUserToken() == null) {
            this.setState({
                dataready: true,
            });
            return;
        }

        ////////
        await UserManager.UpdateUserInfo();
        this.setState({
            dataready: true,
        });
    }




    getActive(key){
        if(window.location.href.includes(key)){
            return 'active';
        }else{
            return '';
        }
    }



    renderUserAdminSiderBar() {
        if (!UserManager.checkUserHasAuth(UserManager.UserAuth.admin)) {
            return <div></div>;
        }

        return (

            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-adminbar" data-toggle="collapse"
                   data-target="#submenu-adminbar" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-users-cog"></span>
                            </span>
                            Admin
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-adminbar" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li  className= {this.getActive("/test")+" nav-item"} ><a className="nav-link" href="/test"><span>Test</span></a></li>
                        <li  className= {this.getActive("/usermanager")+" nav-item"}  ><a className="nav-link" href="/usermanager"><span>UserManager</span></a></li>
                        <li className= {this.getActive("/monitoring")+" nav-item"}  ><a className="nav-link" href="/monitoring"><span>Monitoring</span></a></li>
                    </ul>
                </div>
            </li>
        );
    }

    renderUserTerminalSiderBar() {
        if (!UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)) {
            return <div></div>;
        }

        return (

            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-terminal" data-toggle="collapse"
                   data-target="#submenu-terminal" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-server"></span>
                            </span>
                            Terminal
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-terminal" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li className= {this.getActive("/terminals")+" nav-item"}><a className="nav-link" href="/terminals"><span>Terminals</span></a></li>
                        <li className= {this.getActive("/terminalprofit")+" nav-item"}><a className="nav-link" href="/terminalprofit"><span>Profit</span></a></li>
                        <li className= {this.getActive("/terminalbonus")+" nav-item"}><a className="nav-link" href="/terminalbonus"><span>Bonus</span></a></li>
                    </ul>
                </div>
            </li>

        );
    }

    renderUserClientSiderBar() {
        if (!UserManager.checkUserHasAuth(UserManager.UserAuth.client)) {
            return <div></div>;
        }

        return (
            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-client" data-toggle="collapse"
                   data-target="#submenu-client" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-skiing"></span>
                            </span>
                            Client
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-client" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li  className= {this.getActive("/binddomain")+" nav-item"}><a className="nav-link" href="/binddomain"><span>BindDomain</span></a></li>
                        <li className= {this.getActive("/clienttraffic")+" nav-item"}><a className="nav-link" href="/clienttraffic"><span>Traffic</span></a></li>
                        <li className= {this.getActive("/balance")+" nav-item"}><a className="nav-link" href="/balance"><span>Balance</span></a></li>
                    </ul>
                </div>
            </li>
        );
    }



    ///////////////////////////////
    renderLoginRegbar() {
        if (UserManager.GetUserInfo() != null) {
            return <div></div>;
        }

        return (
            <div>
                <li className=  {this.getActive("/login")+" nav-item"} >
                    <a href="/login" className="nav-link"  >
                        <span className="sidebar-icon">
                            <span className="fas fa-key"></span>
                        </span>
                        <span>Login</span>
                    </a>
                </li>

                <li className= {this.getActive("/register")+" nav-item"} >
                    <a href="/register" className="nav-link">
                        <span className="sidebar-icon">
                            <span className="fas fa-registered"></span>
                        </span>
                        <span>Register</span>
                    </a>
                </li>
            </div>
        );
    }

    renderUserSiderBar() {
        if (UserManager.GetUserInfo() == null) {
            return <div></div>;
        }

        const UserAdminSiderBar = this.renderUserAdminSiderBar();
        const UserClientSiderBar = this.renderUserClientSiderBar();
        const UserTerminalSiderBar = this.renderUserTerminalSiderBar();
        return (
            <div>

                <li className= {this.getActive("/welcome")+" nav-item"}>
                    <a href="/welcome" className="nav-link">
                        <span className="sidebar-icon">
                            <span className="fas fa-chart-pie"></span>
                        </span>
                        <span>Dashboards</span>
                    </a>
                </li>

                {UserAdminSiderBar}
                {UserClientSiderBar}
                {UserTerminalSiderBar}


            </div>
        );
    }

    renderHeader(){
        if (UserManager.GetUserInfo() == null) {
            return (
                <div className="user-card d-flex align-items-center justify-content-between justify-content-md-center pb-4">
                    <div className="d-flex align-items-center">
                        <div className="d-block">
                            <h2 className="h6">Please Login</h2>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="user-card d-flex align-items-center justify-content-between   pb-4">
                <div className="d-flex align-items-center">
                    <div className="d-block">
                        <h2 className="h6">{UserManager.userinfo.username}</h2>
                        <a  onClick={()=>{ this.logout(); }} className="btn btn-secondary btn-xs">
                                                <span className="mr-2">
                                                    <span className="fas fa-sign-out-alt"></span>
                                                </span>
                            Sign Out
                        </a>
                    </div>
                </div>
            </div>
        );


    }




    render() {

        if (!this.state.dataready) {
            return <div></div>;
        }

        const headeruser= this.renderHeader();
        const LoginRegbar = this.renderLoginRegbar();
        const UserSiderBar = this.renderUserSiderBar();

        return (

            <nav id="sidebarMenu" className="sidebar d-md-block bg-primary text-white collapse px-4">
                <div className="sidebar-sticky pt-4 mx-auto">
                    {headeruser}
                    <ul className="nav flex-column mt-4">
                        {LoginRegbar}
                        {UserSiderBar}
                    </ul>
                </div>
            </nav>

        );
    }
}

export  default AdminSidebar;