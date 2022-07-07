import React from "react";

class AdminContent extends React.Component {
    render() {
        return (
            <main className="content" style={{ minHeight: "700px" }}>
                <div className="card-footer text-center" style={{ backgroundColor: "rgb(255 206 78)" }}>
                    <div className="small" style={{ color: "ButtonText" }}>
                        Please switch to meson test-net 3.0 . Go to&nbsp;
                        <a
                            className="a-rocket"
                            style={{ color: "rgb(0 111 204)" }}
                            href="https://www.meson.network"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.meson.network
                        </a>
                        . Register using the same email is preferred in version 3.0 .<br />
                        All the tokens in 2.5 network will be transferred to 3.0 network after deprecation complete.
                    </div>
                </div>
                {this.props.children}
            </main>
        );
    }
}

export default AdminContent;