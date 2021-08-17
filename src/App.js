/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2021-08-16 21:49:32
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
import FileManagerPage from './pages/fileManager/fileManager'
import MiningRulesPage from './pages/miningRules/miningRules'
import BlogPage from './pages/blogContent/blogContent'
import LiveStreamingPlayPage from './pages/liveStreamingPlayPage/liveStreamingPlayPage'
import Streams from './pages/liveStreaming/liveStreaming'
import DemoFileManagerPage from "./pages/fileManagerDemo/fileManagerDemo";
import DemoArweavePage from "./pages/arweaveDemo/arweaveDemo";
import TimeManager from './manager/timemanager';
import BindEmail from './pages/bindEmail/bindEmail';
import BindPhone from './pages/bindPhone/bindPhone';
import ChangeEmail from './pages/changeEmail/changeEmail';
import ChangePhone from './pages/changePhone/changePhone';
import AdminAirdrop from './pages/adminAirdrop/adminAirdrop';
import UserAirdrop from './pages/userAirdrop/userAirdrop';


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
        bindphone:BindPhone,
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
        filemanager: FileManagerPage,

        //for blog
        blogeditor: BlogEditorPage,
        userbloglist: UserBlogList,
        blog:BlogPage,
        
        //for demo
        demofilemanager: DemoFileManagerPage,
        demoarweave:DemoArweavePage,

        //live streaming page
        livestreaming:LiveStreamingPlayPage,
        streams:Streams
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
