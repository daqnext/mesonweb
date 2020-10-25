import React from 'react';
import './app.css'

import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import WelcomePage from "./pages/welcome/welcome";
import TestPage from "./pages/test/test";
import RegisterPage from "./pages/register/register";
import UserManagerPage from "./pages/user/usermanager";

function App() {

    ///routing to the right page
    let router_map={
        'home':HomePage,
        'login':LoginPage,
        'register':RegisterPage,
        'welcome':WelcomePage,
        'test': TestPage,
        'usermanager':UserManagerPage,
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
