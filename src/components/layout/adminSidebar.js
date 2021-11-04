import React from "react";

import './sidebar.css'
import UserManager from "../../manager/usermanager";

import LanBtn from "./lanBtn";

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
                        <li className={this.getActive("/monitoring") + " nav-item"}  ><a className="nav-link" href="/monitoring"><span>Monitoring</span></a></li>
                        <li className={this.getActive("/tokencontrol") + " nav-item"}  ><a className="nav-link" href="/tokencontrol"><span>TokenControl</span></a></li>
                        <li className= {this.getActive("/adminmachine")+" nav-item"}  ><a className="nav-link" href="/adminmachine"><span>AdminMachine</span></a></li>
                        <li className={this.getActive("/adminpricesetting") + " nav-item"}  ><a className="nav-link" href="/adminpricesetting"><span>AdminPriceSetting</span></a></li>
                        <li className= {this.getActive("/adminbloglist")+" nav-item"}  ><a className="nav-link" href="/adminbloglist"><span>BlogList</span></a></li>
                        <li className= {this.getActive("/adminairdrop")+" nav-item"}  ><a className="nav-link" href="/adminairdrop"><span>Airdrop</span></a></li>

                        {/* finance server ready */}
                        <li className= {this.getActive("/adminairdrop_f")+" nav-item"}  ><a className="nav-link" href="/adminairdrop_f"><span>AdminAirdrop_f</span></a></li>
                        <li className= {this.getActive("/withdrawmgr_f")+" nav-item"}><a className="nav-link" href="/withdrawmgr_f"><span>WithdrawMgr_f</span></a></li>

                    </ul>
                </div>
            </li>
        );
    }

    renderUserBlogSiderBar() {
        if (!UserManager.checkUserHasAuth(UserManager.UserAuth.blog)) {
            return <div></div>;
        }

        return (

            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-blog" data-toggle="collapse"
                   data-target="#submenu-blog" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-users-cog"></span>
                            </span>
                            Blog
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-blog" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li className={this.getActive("/blogeditor") + " nav-item"}  ><a className="nav-link" href="/blogeditor"><span>BlogEditor</span></a></li>
                        <li className= {this.getActive("/userbloglist")+" nav-item"}  ><a className="nav-link" href="/userbloglist"><span>BlogList</span></a></li>
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
                        <li className= {this.getActive("/miningrules")+" nav-item"}><a className="nav-link" href="/miningrules"><span>Mining Rules</span></a></li>
                        <li className= {this.getActive("/terminaltraffic")+" nav-item"}><a className="nav-link" href="/terminaltraffic"><span>Traffic</span></a></li>
                        <li className={this.getActive("/terminaltotalprofit") + " nav-item"}><a className="nav-link" href="/terminaltotalprofit"><span>Earnings</span></a></li>
                        <li className= {this.getActive("/terminalbalance")+" nav-item"}><a className="nav-link" href="/terminalbalance"><span>TokenBalance</span></a></li>
                        <li className= {this.getActive("/userairdrop")+" nav-item"}><a className="nav-link" href="/userairdrop"><span>Airdrop</span></a></li>

                        {/* finance server */}
                        {/* <li className= {this.getActive("/terminaltotalprofit_f") + " nav-item"}><a className="nav-link" href="/terminaltotalprofit_f"><span>Earnings_f</span></a></li> */}
                        {/* <li className= {this.getActive("/terminalbalance_f")+" nav-item"}><a className="nav-link" href="/terminalbalance_f"><span>TokenBalance_f</span></a></li> */}
                        {/* <li className= {this.getActive("/stake_f")+" nav-item"}><a className="nav-link" href="/stake_f"><span>Stake_f</span></a></li> */}
                        {/* <li className= {this.getActive("/userairdrop_f")+" nav-item"}><a className="nav-link" href="/userairdrop_f"><span>UserAirdrop_f</span></a></li> */}
                        
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
                        <li className={this.getActive("/balance") + " nav-item"}><a className="nav-link" href="/balance"><span>Balance</span></a></li>
                        {/* <li className= {this.getActive("/filemanager")+" nav-item"}><a className="nav-link" href="/filemanager"><span>FileManager</span></a></li> */}
                        
                        {/* finance_server */}
                        {/* <li className= {this.getActive("/balance_f") + " nav-item"}><a className="nav-link" href="/balance_f"><span>Balance_f</span></a></li> */}
                    </ul>
                </div>
            </li>
        );
    }

    renderLiveStreamingSiderBar() {
        if (!UserManager.checkUserHasAuth(UserManager.UserAuth.livestream)) {
            return <div></div>;
        }

        return (
            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-livestreaming" data-toggle="collapse"
                   data-target="#submenu-livestreaming" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-skiing"></span>
                            </span>
                            LiveStreaming
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-livestreaming" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li  className= {this.getActive("/streams")+" nav-item"}><a className="nav-link" href="/streams"><span>Livestreaming</span></a></li>
                    </ul>
                </div>
            </li>
        );
    }

    renderCommonUserSiderBar() {
        return (
            <li className="nav-item">
                <a className="nav-link d-flex justify-content-between align-items-center"
                   href="#submenu-user" data-toggle="collapse"
                   data-target="#submenu-user" aria-expanded="true">
                        <span>
                            <span className="sidebar-icon">
                                <span className="fas fa-user"></span>
                            </span>
                            User
                        </span>
                    <span className="link-arrow">
                            <span className="fas fa-chevron-right"></span>
                        </span>
                </a>
                <div className="multi-level collapse show" role="list" id="submenu-user" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li  className= {this.getActive("/resetpassword")+" nav-item"}><a className="nav-link" href="/resetpassword"><span>Reset Password</span></a></li>
                        {
                        UserManager.IsUserBindEmail()==false?
                        <li  className= {this.getActive("/bindemail")+" nav-item"}><a className="nav-link" href="/bindemail"><span>Bind Email</span></a></li>:
                        <li  className= {this.getActive("/changeemail")+" nav-item"}><a className="nav-link" href="/changeemail"><span>Change Email</span></a></li>
                        }
                        {/* {
                        UserManager.IsUserBindPhone()==false?
                        <li  className= {this.getActive("/bindphone")+" nav-item"}><a className="nav-link" href="/bindphone"><span>Bind Phone</span></a></li>:
                        <li  className= {this.getActive("/changephone")+" nav-item"}><a className="nav-link" href="/changephone"><span>Change Phone</span></a></li>
                        } */}
                    
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

                <li className= {this.getActive("/resetpassword")+" nav-item"} >
                    <a href="/resetpassword" className="nav-link">
                        <span className="sidebar-icon">
                            <span className="fas fa-recycle"></span>
                        </span>
                        <span>Reset Password</span>
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
        const UserBlogSiderBar = this.renderUserBlogSiderBar();
        const CommonUserBar = this.renderCommonUserSiderBar();
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
                {CommonUserBar}
                {UserTerminalSiderBar}
                {UserClientSiderBar}
                {UserBlogSiderBar}

            </div>
        );
    }

    renderHeader(){
        if (UserManager.GetUserInfo() == null) {
            return (
                <div className="user-card d-flex align-items-center justify-content-between justify-content-md-center pb-4">
                    <div className="d-flex align-items-center">
                        <div className="d-block">
                            <LanBtn></LanBtn>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="user-card d-flex align-items-center justify-content-between   pb-4">
                <div className="d-flex align-items-center">
                    <div className="d-block">
                        <LanBtn></LanBtn>

                        <a  style={{marginTop:'20px'}} onClick={()=>{ this.logout(); }} className="btn btn-secondary-rocket btn-xs">
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