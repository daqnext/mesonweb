
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";

class WelcomePage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:"xxxx"
        };
    }

    updatetable(){
        this.setState({dataready:"yyy"});
    }

    render() {
        return (
            <AdminLayout
                name="welcome"
                description="this is welcome"
            >

                <div className="datatable " onClick={()=>{this.updatetable()}}>
                    <table className="table tablebluehead table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800{this.state.dataready}</td>
                            <td>
                                <div className="badge badge-primary badge-pill">Full-time</div>
                            </td>
                            <td>
                                <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                    data-feather="more-vertical"></i></button>
                                <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                    data-feather="trash-2"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </AdminLayout>
        );
    }
}

export  default  WelcomePage;