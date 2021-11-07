/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2021-11-04 17:50:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/App.js
 */
import React from 'react';
import './app.css'
import "@inovua/reactdatagrid-community/index.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import HomePage from "./pages/home/home2";
import LoginPage from "./pages/login/login";
import WelcomePage from "./pages/welcome/welcome";
import TestPage from "./pages/test/test";
import RegisterPage from "./pages/register/register";
import ResetPasswordPage from "./pages/resetPassword/resetPassword"
import UserManagerPage from "./pages/user/usermanager";
import BindDomain from "./pages/client/binddomain";
import BalancePage from "./pages/account/balance";
import MonitorPage from "./pages/monitoring/monitor";
import TerminalPage from "./pages/terminal/terminals";
import ClientTraffic from './pages/clientTraffic/clientTraffic';
import TerminalTraffic from './pages/terminalTraffic/terminalTraffic';
import TerminalTotalProfit from './pages/terminalTotalProfit/terminalTotalProfit';
import TerminalBalance from './pages/terminalBalance/terminalBalance';
import TokenControlPage from './pages/tokenControl/tokenControl';
import AdminMachine from './pages/adminMachine/adminMachine';
import AdminPriceSetting from './pages/adminPriceSettting/adminPriceSetting';
import BlogEditorPage from './pages/blogEditor/blogEditor';
import UserBlogList from './pages/userBlogList/userBlogList';
import AdminBlogList from './pages/adminBlogList/adminBlogList';
// import FileManagerPage from './pages/fileManager/fileManager'
import MiningRulesPage from './pages/miningRules/miningRules'
import NewMiningRulesPage from './pages/miningRulesNew/miningRulesNew'
import BlogPage from './pages/blogContent/blogContent'
import LiveStreamingPlayPage from './pages/liveStreamingPlayPage/liveStreamingPlayPage'
import Streams from './pages/liveStreaming/liveStreaming'
import DemoFileManagerPage from "./pages/fileManagerDemo/fileManagerDemo";
import DemoArweavePage from "./pages/arweaveDemo/arweaveDemo";
import TimeManager from './manager/timemanager';
import BindEmail from './pages/bindEmail/bindEmail';
//import BindPhone from './pages/bindPhone/bindPhone';
import ChangeEmail from './pages/changeEmail/changeEmail';
import ChangePhone from './pages/changePhone/changePhone';
import AdminAirdrop from './pages/adminAirdrop/adminAirdrop';
import UserAirdrop from './pages/userAirdrop/userAirdrop';

//finance server page
import AdminAirdrop_f from "./pages/adminAirdrop_f/adminAirdrop_f";
import Balance_f from "./pages/account_f/balance_f";
import TerminalTotalProfit_f from "./pages/terminalTotalProfit_f/terminalTotalProfit_f"
import TerminalBalance_f from "./pages/terminalBalance_f/terminalBalance_f"
import UserAirdrop_f from "./pages/userAirdrop_f/userAirdrop_f"
import WithdrawMgr_f from "./pages/withdrawmgr_f/withdrawmgr_f"
import Stake_f from "./pages/stake_f/stake_f"

{/* <li className= {this.getActive("/adminairdrop_f")+" nav-item"}  ><a className="nav-link" href="/adminairdrop_f"><span>AdminAirdrop_f</span></a></li>
                        <li className= {this.getActive("/balance_f") + " nav-item"}><a className="nav-link" href="/balance_f"><span>Balance_f</span></a></li>
                        <li className= {this.getActive("/terminaltotalprofit_f") + " nav-item"}><a className="nav-link" href="/terminaltotalprofit_f"><span>Earnings_f</span></a></li>
                        <li className= {this.getActive("/terminalbalance_f")+" nav-item"}><a className="nav-link" href="/terminalbalance_f"><span>TokenBalance_f</span></a></li>
                        <li className= {this.getActive("/userairdrop_f")+" nav-item"}><a className="nav-link" href="/userairdrop_f"><span>UserAirdrop_f</span></a></li>
                        <li className= {this.getActive("/withdrawmgr_f")+" nav-item"}><a className="nav-link" href="/withdrawmgr_f"><span>WithdrawMgr_f</span></a></li> */}



function App() {
    TimeManager.UpdateServerTimeZone();
    ///routing to the right page
    let router_map = {
        home: HomePage,
        login: LoginPage,
        register: RegisterPage,
        resetpassword:ResetPasswordPage,
        welcome: WelcomePage,
        bindemail:BindEmail,
        //bindphone:BindPhone,
        changeemail:ChangeEmail,
        changephone:ChangePhone,

        //for admin
        test: TestPage,
        usermanager: UserManagerPage,
        monitoring: MonitorPage,
        tokencontrol: TokenControlPage,
        adminmachine: AdminMachine,
        adminpricesetting: AdminPriceSetting,
        adminbloglist:AdminBlogList,
        adminairdrop:AdminAirdrop,

        //for terminal pages
        terminals: TerminalPage,
        miningrules: MiningRulesPage,
        terminaltraffic: TerminalTraffic,
        terminaltotalprofit: TerminalTotalProfit,
        terminalbalance: TerminalBalance,
        userairdrop:UserAirdrop,

        /////blow for client pages
        binddomain: BindDomain,
        clienttraffic: ClientTraffic,
        balance: BalancePage,
        // filemanager: FileManagerPage,

        //for blog
        blogeditor: BlogEditorPage,
        userbloglist: UserBlogList,
        blog:BlogPage,
        
        //for demo
        demofilemanager: DemoFileManagerPage,
        demoarweave:DemoArweavePage,

        //live streaming page
        livestreaming:LiveStreamingPlayPage,
        streams:Streams,

        //finance server page
        adminairdrop_f:AdminAirdrop_f,
        exchangemgr_f:WithdrawMgr_f,

        //for client page
        balance_f:Balance_f,

        //for terminal tage
        terminaltotalprofit_f:TerminalTotalProfit_f,
        terminalbalance_f:TerminalBalance_f,
        userairdrop_f:UserAirdrop_f,
        stake_f:Stake_f
    };


    for (const urlkey in router_map) {
        if (window.location.pathname=="/"+urlkey) {
            const Page = router_map[urlkey];
            return <Page />;
            break;
        }
    }

    return <HomePage />;
}

export default App;
