/*
 * @Author: your name
 * @Date: 2021-03-30 10:00:02
 * @LastEditTime: 2021-11-08 13:19:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/miningRules/miningRules.js
 */

import React from "react";
import bridge from "./bridge.html";
import AdminLayout from "../../components/layout/adminLayout";
class MiningRulesPage extends React.Component {
    constructor(props) {
        super(props);
//         const typed = `
//         var settings = {
//           "url": "/api/v1/common/tokenconfig",
//           "method": "GET",
//       };
       
//         $.ajax(settings).done(function (response) {
//           if (response.status == 0) {
//             let totalToken = response.data
//             console.log(totalToken)
//             $('#total_token').html(totalToken/1e9);
//           }
//         })   
// `;
//         new Function(typed)();
    }

    async componentDidMount() {}

    render() {
        return (
            <AdminLayout name="Terminal" description="Bridge">
                <div
                    dangerouslySetInnerHTML={{
                        __html: bridge,
                    }}
                ></div>
            </AdminLayout>
        );
    }
}

export default MiningRulesPage;
