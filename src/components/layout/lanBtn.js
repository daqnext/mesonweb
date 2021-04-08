/*
 * @Author: your name
 * @Date: 2021-03-24 19:15:34
 * @LastEditTime: 2021-04-08 11:51:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/components/layout/lanBtn.js
 */
import React from "react";

class LanBtn extends React.Component {
    render() {
        return (
            <div className="dropdown  mb-lg-0 ">
                <a id="langsDropdown" style={{color: 'white'}} href="#" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="true"
                   className="dropdown-toggle footer-language-link pb-2">
                    <img src="https://assets.meson.network:10443/static/assets/flags/united-states-of-america.svg" alt="USA Flag"
                         className="language-flag" /> English
                    {/* <i className="fas fa-chevron-down ml-1"></i> */}
                </a>
                <div aria-labelledby="langsDropdown" className="sidebar-dropdown-menu dropdown-menu dropdown-menu-center mt-0  "
                     x-placement="bottom-start">
                    <a href="#" className="dropdown-item text-gray text-sm"><img
                        src="https://assets.meson.network:10443/static/assets/flags/united-states-of-america.svg" alt="Germany Flag"
                        className="language-flag" /> English</a>
                </div>
            </div>
        );
    }
}

export  default  LanBtn;



