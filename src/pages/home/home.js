
import React from 'react';

class HomePage extends React.Component {

    constructor() {
        super();
        window.location.href="/homepage.html";
    }

    render() {
        return (
            <div>Redirecting...</div>
        );
    }
}

export  default  HomePage;