/*
 * @Author: your name
 * @Date: 2021-11-07 16:11:18
 * @LastEditTime: 2021-11-07 16:44:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mesonweb/src/components/loading/loading.js
 */

import React from "react";
import ReactDOM from "react-dom";

export class Loading {
    static loadingElement = null

    static HideLoading(){
        if (this.loadingElement!=null) {
            document.body.removeChild(this.loadingElement);
            this.loadingElement=null
        }
    }

    static ShowLoading(showStr){
        if (this.loadingElement!=null) {
            document.body.removeChild(this.loadingElement);
        }
        const element = document.createElement("div");
        const view =(<div style={{position:"fixed",left:"0",right:"0",top:"0",bottom:"0",backgroundColor:"rgba(0,0,0,0.8)",zIndex:"10000",justifyContent:"center",alignItems:"center",display: "flex"}}><div style={{textAlign:"center",marginTop:"-100px",fontSize:"50px"}}>{showStr}</div></div>)
        ReactDOM.render(view, element);
        document.body.appendChild(element);
        this.loadingElement=element
    }



    // static ShowLoading111(
    //     type="warning",
    //     title="Are you sure",
    //     message="",
    //     showCancel= true,
    //     confirmBtnBsStyle="primary",
    //     cancelBtnBsStyle="primary",
    //     confirmText= "Confirm",
    //     onConfirm=null,
    //     onCancel= null
    // ) {
    //     const element = document.createElement("div");
    //     const view = (
    //         <SweetAlert
    //             warning={type === "warning"}
    //             success={type === "success"}
    //             showCancel={showCancel}
    //             confirmBtnText={confirmText}
    //             confirmBtnBsStyle={confirmBtnBsStyle}
    //             cancelBtnBsStyle={cancelBtnBsStyle}
    //             title={title}
    //             onConfirm={() => {
    //                 if (onConfirm) {
    //                     onConfirm();
    //                 }
    //                 const index = this.windowStack.indexOf(element);
    //                 this.windowStack.splice(index, 1);
    //                 document.body.removeChild(element);
    //             }}
    //             onCancel={() => {
    //                 if (onCancel) {
    //                     onCancel();
    //                 }
    //                 const index = this.windowStack.indexOf(element);
    //                 this.windowStack.splice(index, 1);
    //                 document.body.removeChild(element);
    //             }}
    //             reverseButtons
    //             // focusCancelBtn
    //         >
    //             {message}
    //         </SweetAlert>
    //     );
    //     ReactDOM.render(view, element);
    //     document.body.appendChild(element);
    //     this.windowStack.push(element);
    // }
}
