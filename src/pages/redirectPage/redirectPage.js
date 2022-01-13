import React from "react";

class RedirectPage extends React.Component {
    componentDidMount() {
      window.location.href="index.html"
    }
  
    render() {
      return (
        <div>redirect to index.html</div>
      );
    }
  }
  
  export default RedirectPage;