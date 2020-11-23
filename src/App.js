/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-11-23 09:06:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/App.js
 */
import React from 'react';
import './app.css'
import "@inovua/reactdatagrid-community/index.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import WelcomePage from "./pages/welcome/welcome";
import TestPage from "./pages/test/test";
import RegisterPage from "./pages/register/register";
import UserManagerPage from "./pages/user/usermanager";
import BindDomain from "./pages/client/binddomain";
import BalancePage from "./pages/account/balance";
import MonitorPage from "./pages/monitoring/monitor";
import TerminalPage from "./pages/terminal/terminals";
import ClientTraffic from './pages/clientTraffic/clientTraffic';
import TerminalTraffic from './pages/terminalTraffic/terminalTraffic';
import terminalTotalProfit from './pages/terminalTotalProfit/terminalTotalProfit';
import TokenControlPage from './pages/tokenControl/tokenControl';
import axios from "axios";
import Global from './global/global';
import momentTimeZone from "moment-timezone"
import moment from "moment"



function App() {
    ///routing to the right page
    let router_map = {
        home: HomePage,
        login: LoginPage,
        register: RegisterPage,
        welcome: WelcomePage,
        test: TestPage,
        usermanager: UserManagerPage,
        balance: BalancePage,
        monitoring: MonitorPage,
        tokencontrol: TokenControlPage,

        //for terminal pages
        terminals: TerminalPage,
        terminaltraffic: TerminalTraffic,
        terminaltotalprofit: terminalTotalProfit,

        /////blow for client pages
        binddomain: BindDomain,
        clienttraffic: ClientTraffic,
    };

    //GetServerTimeZone
    console.log("get time zone");
    momentTimeZone.tz.setDefault("Europe/London");
    axios
        .get(Global.apiHost + "/api/v1/user/servertimezone")
        .then((response) => {
            console.log(response.data);
            if (response.data.data.status == 0) {
                let timeZone = response.data.data;
                momentTimeZone.tz.setDefault(timeZone);
            }

            console.log(moment().format("YYYY-MM-DD HH:MM:SS"));
        });

    for (const urlkey in router_map) {
        if (window.location.href.includes(urlkey)) {
            const Page = router_map[urlkey];
            return <Page />;
            break;
        }
    }

    return <HomePage />;
}

export default App;
