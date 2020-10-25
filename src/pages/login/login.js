
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";

class LoginPage extends React.Component {
    render() {
        return (
            <AdminLayout
                name="Login"
                description="login page"
            >


                <div className="card-body">

                    <form>

                        <div className="form-group">
                            <label className="small mb-1"  >UserName</label>
                            <input className="form-control py-4"  type="UserName"
                                   placeholder="Enter UserName"/>
                        </div>

                        <div className="form-group">
                            <label className="small mb-1" htmlFor="inputPassword">Password</label>
                            <input className="form-control py-4" id="inputPassword" type="password"
                                   placeholder="Enter password"/>
                        </div>


                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox"/>
                                <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember
                                    password</label>
                            </div>
                        </div>

                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="small" href="auth-password-basic.html">Forgot Password?</a>
                            <a className="btn btn-primary" href="index.html">Login</a>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center">
                    <div className="small"><a href="auth-register-basic.html">Need an account? Sign up!</a></div>
                </div>

            </AdminLayout>
        );
    }
}

export  default  LoginPage;