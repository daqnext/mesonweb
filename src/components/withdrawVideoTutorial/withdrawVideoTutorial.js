/*
 * @Author: your name
 * @Date: 2021-11-08 14:01:10
 * @LastEditTime: 2021-11-08 14:02:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mesonweb/src/components/withdrawVideoTutorial/withdrawVideoTutorial.js
 */

import React from "react";

class WithdrawVideoTutorial extends React.Component {
    render() {
        return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2">Video Tutorial</strong>
                </div>
                <div className="toast-body" style={{ marginLeft: "5px" }}>
                    <a
                        href="https://coldcdn.com/api/cdn/wr1cs5/video/msntt_exchange_stake_compress.mp4"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                        <i>[Link1]</i>
                    </a>
                    &nbsp;&nbsp;
                    <a
                        href="https://youtu.be/PDNeJypsSiw"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                        <i>[Link2]</i>
                    </a>
                </div>
                
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2">FAQ-read me first</strong>
                </div>
                <div className="toast-body" style={{ marginLeft: "5px" }}>
                    <a
                        href="https://docs.meson.network/faq#about-test-tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                        <i>[About Token]</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default WithdrawVideoTutorial;
