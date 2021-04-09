/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2021-04-09 23:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import MyUploadAdapter from "./uploadAdapter";
import Global from "../../global/global";
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
        this.state = {
            dataready: false,
            title: "",
            content: "<p>Hello from CKEditor 5!</p>",
            coverImgUrl: "",
            cover:"",
        };

        this.isPublishing = false;
        this.blogId = 0;

        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
        var blogid = getUrlParam("blog");
        console.log(blogid);
        if (blogid != null) {
            this.blogId = parseInt(blogid);
            axios.post(
                Global.apiHost + "/api/v1/common/getblog",
                {
                    id: parseInt(blogid),
                },
                {
                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                }
            ).then(response => {
                if (response.data.status == 0) {
                    let blog = response.data.data;
                    this.setState({
                        title: blog.title,
                        coverImgUrl: Global.s3BindDomain+blog.cover_img_url,
                        cover: `<figure class="image"><img src=${blog.cover_img_url}></figure>`,
                    });
                    axios
                        .get(Global.s3BindDomain + blog.content_url)
                        .then((response) => {
                            this.content = response.data;
                            this.setState({
                                content: response.data,
                            });
                        });
                    
                }
            });
        }
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready: true,
        });
    }

    renderContent() {
        if (
            !this.state.dataready ||
            !UserManager.checkUserHasAuth(UserManager.UserAuth.admin)
        ) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
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
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2">Title</strong>
                    </div>
                    <div className="toast-body">
                        <input
                            value={this.state.title}
                            className="form-control"
                            onChange={(event) => {
                                this.setState({
                                    title: event.currentTarget.value,
                                });
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
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2">Cover img</strong>
                    </div>
                    <div className="toast-body cover-img">
                        <CKEditor
                            data={
                                this.state.coverImgUrl == ""
                                    ? ""
                                    : `<figure class="image"><img src=${this.state.coverImgUrl}></figure>`
                            }
                            editor={Editor}
                            config={{
                                extraPlugins: [MyCustomUploadAdapterPlugin],
                                toolbar: ["imageUpload"],
                                allowEditor: false,
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                //console.log({ event, editor, data });
                                this.setState({ cover: data });
                            }}
                        />
                    </div>
                </div>

                {/* content */}
                <div className="blog-content">
                    <CKEditor
                        editor={Editor}
                        config={{
                            extraPlugins: [MyCustomUploadAdapterPlugin],
                            toolbar: {
                                items: [
                                    "heading",
                                    "|",
                                    "fontFamily",
                                    "fontSize",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "removeFormat",
                                    "highlight",
                                    "|",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "|",
                                    "indent",
                                    "outdent",
                                    "|",
                                    "imageUpload",
                                    "htmlEmbed",
                                    "codeBlock",
                                    "blockQuote",
                                    "insertTable",
                                    "mediaEmbed",
                                    "undo",
                                    "redo",
                                    "|",
                                ],
                            },
                            language: "en",
                            fontFamily: {
                                options: [
                                    "default",
                                    "Arial",
                                    "Courier New",
                                    "Georgia",
                                    "Lucida Sans Unicode",
                                    "Tahoma",
                                    "Times New Roman",
                                    "Trebuchet MS",
                                    "Verdana",
                                    "Helvetica Neue",                                    
                                    "Hiragino Sans GB",
                                    "Microsoft Yahei",                                   
                                ],
                                supportAllValues: true,
                            },
                            fontSize: {
                                options: [
                                    9,
                                    10,
                                    11,
                                    12,
                                    "default",
                                    14,
                                    15,
                                    16,
                                    18,
                                    20,
                                    22,
                                    24,
                                    26,
                                    28,
                                    30,
                                ],
                                supportAllValues: true,
                            },
                            image: {
                                toolbar: [
                                    "imageTextAlternative",
                                    "imageStyle:full",
                                    "imageStyle:side",
                                ],
                            },
                            table: {
                                contentToolbar: [
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                ],
                            },
                        }}
                        data={this.state.content}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            //console.log({ event, editor, data });
                            this.setState({ content: data });
                        }}
                    />
                </div>
            </div>
        );
    }

    render() {
        const Content = this.renderContent();

        return (
            <AdminLayout name="Blog" description="BlogEditor">
                {Content}
                <button
                    className="btn btn-primary-rocket btn-ms"
                    type="button"
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    onClick={async () => {
                        console.log("publish");
                        if (this.isPublishing == true) {
                            return;
                        }

                        let div = document.createElement("div");
                        div.innerHTML = this.state.cover;
                        let img = div.querySelector("img");
                        let coverImgUrl = "";
                        if (img) {
                            coverImgUrl = img.src;
                        }

                        //console.log(this.content);
                        // console.log(this.rawText);

                        if (
                            this.state.title == "" ||
                            coverImgUrl == "" ||
                            this.state.content == ""
                        ) {
                            this.props.alert.error("Publish Error");
                            return;
                        }

                        this.isPublishing = true;

                        let response = await axios.post(
                            Global.apiHost + "/api/v1/blog/publishblog",
                            {
                                title: this.state.title,
                                coverImgUrl: coverImgUrl,
                                content: this.state.content,
                                blogId:this.blogId,
                            },
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + UserManager.GetUserToken(),
                                },
                            }
                        );
                        this.isPublishing = false;
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
