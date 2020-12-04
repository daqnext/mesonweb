/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2020-12-04 15:51:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";

import UserManager from "../../manager/usermanager";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import MyUploadAdapter from "./uploadAdapter";
import Global from '../../global/global';
import axios from "axios";

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        // 第二个参数设置上传图片的地址
        console.log(loader);
        return new MyUploadAdapter(
            loader,
            Global.apiHost + "/api/v1/common/uploadimg"
        );
    };
}

class BlogEditorPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false
        };

        this.title=""
        this.content = ""
        this.coverImgUrl = ""
        
        ClassicEditor.create(document.querySelector("#title-editor"), {
            toolbar: ["bold", "italic", "link"],
        }).catch((error) => {
            console.log(error);
        });
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
           await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true
        });
    }



    renderContent(){
        if(!this.state.dataready||!UserManager.checkUserHasAuth(UserManager.UserAuth.admin)){
            return (<div className="alert alert-danger" role="alert">Auth Required</div>);
        }


        return (
            <div>
                {/* title */}
                <div>Title</div>
                {/* <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: [""],
                    }}
                    //data=""
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.title = data;
                    }}
                /> */}
                <input
                    className="form-control"
                    onChange={(event) => {
                        this.title=event.currentTarget.value
                        
                    }}
                    type="text"
                />

                {/* coverImg */}
                <div>cover img</div>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        extraPlugins: [MyCustomUploadAdapterPlugin],
                        toolbar: ["imageUpload"],
                    }}
                    //data=""
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.coverImgUrl = data;
                    }}
                />

                {/* content */}
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        extraPlugins: [MyCustomUploadAdapterPlugin],
                    }}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.content = data;
                    }}
                    // onBlur={(event, editor) => {
                    //     console.log("Blur.", editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log("Focus.", editor);
                    // }}
                />
            </div>
        );
    }


    render() {


        const Content=this.renderContent();

        return (
            <AdminLayout name="Admin" description="BlogEditor">
                {Content}
                <button
                    className="btn btn-primary btn-ms"
                    type="button"
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    onClick={async () => {
                        console.log("publish");
                        // let div = document.createElement("div");
                        // div.innerHTML = this.title;
                        // let title=div.querySelector("p").innerText

                        let div = document.createElement("div");
                        div.innerHTML = this.coverImgUrl;
                        let coverImgUrl=div.querySelector("img").src

                        let response = await axios.post(
                            Global.apiHost + "/api/v1/common/publishblog",
                            {
                                title: this.title,
                                coverImgUrl: coverImgUrl,
                                content:this.content
                            },
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + UserManager.GetUserToken(),
                                },
                            }
                        );
                        if (response.data.status != 0) {
                            //alert
                        }
                        let responseData = response.data.data;
                        console.log(responseData);
                        

                    }}
                >
                    Publish
                </button>
            </AdminLayout>
        );
    }
}

export default BlogEditorPage;