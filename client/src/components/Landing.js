import React, { Component } from "react";
import UploadForm from "./UploadForm";

class Landing extends Component {
  render() {
    return (
      <section component="Landing">
        <div>
          <h1>HushPass</h1>
          <span>Share Files Securely.</span>
        </div>
        <UploadForm />
      </section>
    );
  }
}
export default Landing;
