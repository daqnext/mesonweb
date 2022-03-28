/*
 * @Author: your name
 * @Date: 2021-08-02 08:57:16
 * @LastEditTime: 2021-08-02 09:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/components/confirm/confirm.tsx
 */
import React from "react";
import ReactDOM from "react-dom";
import SweetAlert from "react-bootstrap-sweetalert";

export class Confirm {
    static windowStack = [];

    static ShowConfirm(
        type="warning",
        title="Are you sure",
        message="",
        showCancel= true,
        confirmBtnBsStyle="primary",
        cancelBtnBsStyle="primary",
        confirmText= "Confirm",
        onConfirm=null,
        onCancel= null
    ) {
        const element = document.createElement("div");
        const view = (
            <SweetAlert
                warning={type === "warning"}
                success={type === "success"}
                showCancel={showCancel}
                confirmBtnText={confirmText}
                confirmBtnBsStyle={confirmBtnBsStyle}
                cancelBtnBsStyle={cancelBtnBsStyle}
                title={title}
                onConfirm={() => {
                    if (onConfirm) {
                        onConfirm();
                    }
                    const index = this.windowStack.indexOf(element);
                    this.windowStack.splice(index, 1);
                    document.body.removeChild(element);
                }}
                onCancel={() => {
                    if (onCancel) {
                        onCancel();
                    }
                    const index = this.windowStack.indexOf(element);
                    this.windowStack.splice(index, 1);
                    document.body.removeChild(element);
                }}
                reverseButtons
                // focusCancelBtn
            >
                {message}
            </SweetAlert>
        );
        ReactDOM.render(view, element);
        document.body.appendChild(element);
        this.windowStack.push(element);
    }
}
