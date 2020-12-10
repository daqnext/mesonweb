/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2020-12-10 15:17:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import Font from "@ckeditor/ckeditor5-font/src/font";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import MyUploadAdapter from "./uploadAdapter";
import Global from '../../global/global';
import axios from "axios";
import "./blog.css";

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
        this.rawText=""
        this.isPublishing=false
        
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
                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary">
                        <strong className="mr-auto ml-2">Title</strong>
                    </div>
                    <div className="toast-body">
                        <input
                            className="form-control"
                            onChange={(event) => {
                                this.title = event.currentTarget.value;
                            }}
                            type="text"
                        />
                    </div>
                </div>

                {/* coverImg */}

                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary">
                        <strong className="mr-auto ml-2">Cover img</strong>
                    </div>
                    <div className="toast-body cover-img">
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                extraPlugins: [MyCustomUploadAdapterPlugin],
                                toolbar: ["imageUpload"],
                                allowEditor: false,
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                                this.coverImgUrl = data;
                            }}
                        />
                    </div>
                </div>

                {/* content */}
                <div className="blog-content">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            extraPlugins: [MyCustomUploadAdapterPlugin],
                            //plugins: [ Font ],
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
                    />
                </div>

                {/* raw text */}
                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{marginTop:'10px'}}
                >
                    <div className="toast-header text-primary">
                        <strong className="mr-auto ml-2">Raw text</strong>
                    </div>
                    <div className="toast-body">
                        <textarea
                            class="form-control"
                            placeholder="Hi Rocket, I would like to ..."
                            id="message-2"
                            rows="8"
                            required=""
                            onChange={(event) => {
                                this.rawText = event.currentTarget.value;
                            }}
                        ></textarea>                       
                    </div>
                </div>
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
                        if (this.isPublishing==true) {
                            return
                        }

                        let div = document.createElement("div");
                        div.innerHTML = this.coverImgUrl;
                        let img = div.querySelector("img")
                        let coverImgUrl=""
                        if (img) {
                            coverImgUrl=img.src
                        }

                        // console.log(this.content);
                        // console.log(this.rawText);

                        if (this.title==""||coverImgUrl==""||(this.content==""&&this.rawText=="")) {
                            this.props.alert.error("Publish Error");
                            return
                        }

                        this.isPublishing=true

                        
                        let response = await axios.post(
                            Global.apiHost + "/api/v1/blog/publishblog",
                            {
                                title: this.title,
                                coverImgUrl: coverImgUrl,
                                content: this.content,
                                rawText: this.rawText,
                            },
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + UserManager.GetUserToken(),
                                },
                            }
                        );
                        this.isPublishing=false
                        if (response.data.status != 0) {
                            this.props.alert.error("Publish Error");
                        }
                        let responseData = response.data.data;
                        console.log(responseData);
                        this.props.alert.success("Publish success");
                        //go to blog list
                        window.location.href = "/userbloglist";
                    }}
                >
                    Publish
                </button>
            </AdminLayout>
        );
    }
}

export default withAlert()(BlogEditorPage);