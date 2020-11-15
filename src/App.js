/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-11-15 15:55:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/App.js
 */
import React from 'react';
import './app.css'

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
import TerminalProfit from './pages/terminalProfit/terminalProfit';
import TerminalBonus from "./pages/terminalBonus/terminalBonus";

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

        //for terminal pages
        terminals: TerminalPage,
        terminalprofit: TerminalProfit,
        terminalbonus: TerminalBonus,

        /////blow for client pages
        binddomain: BindDomain,
        clienttraffic: ClientTraffic,
    };

    for (const urlkey in router_map) {
        if(window.location.href.includes(urlkey)){
            const Page =router_map[urlkey];
            return <Page />;
            break;
        }
    }

    return <HomePage />;
}

export default App;
