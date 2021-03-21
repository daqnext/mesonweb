import React from 'react';

class AdminContent extends React.Component {
    render() {
        return (
            <main className="content" style={{minHeight:"700px"}}>
                {this.props.children}
            </main>
        );
    }
}

export  default  AdminContent;