/*
 * @Author: your name
 * @Date: 2021-03-24 19:15:34
 * @LastEditTime: 2021-04-08 14:43:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/components/layout/adminLayout.js
 */
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