/*
 * @Author: your name
 * @Date: 2020-12-09 16:45:19
 * @LastEditTime: 2020-12-09 16:49:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/fileManager/uploadDrop.js
 */

 import React, { useMemo } from "react";
 import { useDropzone } from "react-dropzone";

 const baseStyle = {
     flex: 1,
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     padding: "20px",
     borderWidth: 2,
     borderRadius: 2,
     borderColor: "#eeeeee",
     borderStyle: "dashed",
     backgroundColor: "#fafafa",
     color: "#bdbdbd",
     outline: "none",
     transition: "border .24s ease-in-out",
 };

 const activeStyle = {
     borderColor: "#2196f3",
 };

 const acceptStyle = {
     borderColor: "#00e676",
 };

 const rejectStyle = {
     borderColor: "#ff1744",
 };

export default  function StyledDropzone(props) {
     const {
         getRootProps,
         getInputProps,
         isDragActive,
         isDragAccept,
         isDragReject,
     } = useDropzone();

     const style = useMemo(
         () => ({
             ...baseStyle,
             ...(isDragActive ? activeStyle : {}),
             ...(isDragAccept ? acceptStyle : {}),
             ...(isDragReject ? rejectStyle : {}),
         }),
         [isDragActive, isDragReject, isDragAccept]
     );

     return (
         <div className="container">
             <div {...getRootProps({ style })}>
                 <input {...getInputProps()} />
                 <p>Drag 'n' drop some files here, or click to select files</p>
             </div>
         </div>
     );
 }

