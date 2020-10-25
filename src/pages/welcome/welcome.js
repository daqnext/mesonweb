
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";

class WelcomePage extends React.Component {
    render() {
        return (
            <AdminLayout
                name="welcome"
                description="this is welcome"
            >
                <div>this is test page</div>
            </AdminLayout>
        );
    }
}

export  default  WelcomePage;