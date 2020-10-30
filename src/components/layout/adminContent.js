import React from 'react';

class AdminContent extends React.Component {
    render() {
        return (

                <div id="layoutSidenav_content">
                    <main>
                        <header className="page-header page-header-dark bg-gradient-primary-to-secondary mb-4">
                            <div className="container">
                                <div className="page-header-content pt-4">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-auto mt-4">
                                            <h1 className="page-header-title">
                                                {this.props.name}
                                            </h1>
                                            <div className="page-header-subtitle">#</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="container mt-n10">
                            <div className="card">
                                <div className="card-header">{this.props.description}</div>
                                <div className="card-body">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>

                    </main>

                    <footer className="footer mt-auto footer-light">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 small">Copyright &copy; coldcdn.com 2020</div>
                                <div className="col-md-6 text-md-right small">
                                    <a href="#!">Privacy Policy</a>
                                    &middot;
                                    <a href="#!">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>


        );
    }
}

export  default  AdminContent;