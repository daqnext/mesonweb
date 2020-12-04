import React from 'react';
import AdminSidebar from "./adminSidebar";
import AdminContent from "./adminContent";
import "./adminlayout.css"

class AdminLayout extends React.Component {
    render() {
        return (
            <div className="container-fluid bg-soft">
                <div className="row">
                    <div className="col-12">
                        <AdminSidebar></AdminSidebar>
                        <AdminContent>
                            <nav className="contenthead" aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-transparent">
                                    <li className="breadcrumb-item"><a href="#">{this.props.name}</a></li>
                                    <li className="breadcrumb-item"><a href="#">{this.props.description}</a></li>
                                </ol>
                            </nav>
                            {this.props.children}
                        </AdminContent>
                    </div>
                </div>
            </div>
    );

    }
    }

    export  default  AdminLayout;