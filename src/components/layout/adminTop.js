import React from "react";
import UserManager from "../../manager/usermanager";

class AdminTop extends React.Component {

    logout(){

        UserManager.UnsetTokenAndRedirectHome();
    }

    render() {
        return (

            <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
                <div className="navbar-brand" href="#">ColdCDN</div>

                <ul className="navbar-nav align-items-center ml-auto">

                    <li className="displaynone nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages"
                           href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false"><i data-feather="globe"></i></a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                             aria-labelledby="navbarDropdownMessages">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="mr-2" data-feather="globe"></i>
                                Change Language
                            </h6>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-content">English</div>
                            </a>
                        </div>
                    </li>

                    <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle"
                           href="#" role="button" onClick={()=>{ this.logout(); }}
                           aria-expanded="false"><i data-feather="log-out"></i></a>
                    </li>
                </ul>
            </nav>

          );
    }
}

export  default AdminTop;