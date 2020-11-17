import React from 'react';

class AdminContent extends React.Component {
    render() {
        return (
            <main className="content">
                {this.props.children}
            </main>
        );
    }
}

export  default  AdminContent;