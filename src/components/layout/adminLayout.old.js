
import React from 'react';
import AdminTop from "./adminTop";
import AdminSidebar from "./adminSidebar";
import AdminContent from "./adminContent";

class AdminLayout extends React.Component {
    render() {
        return (
  
            <div>
                <AdminTop></AdminTop>
                <div id="layoutSidenav"   style={{minHeight: "800px"}} >
                    <AdminSidebar></AdminSidebar>
                    <AdminContent
                    name={this.props.name}
                    description={this.props.description}
                    >
                        {this.props.children}
                    </AdminContent>
                </div>
            </div>
        );
    }
}

export  default  AdminLayout;