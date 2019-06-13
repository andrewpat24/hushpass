import React, { Component } from "react";
import axios from "axios";

import Introduction from "./Introduction";

// Styles
import "../styles/base.css";
import "../styles/components/download.css";

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {},
      pw: ""
    };
  }

  onClickHandler = () => {
    const data = new FormData();
    data.append("password", document.getElementById("password").value);
    const config = {
      responseType: "arraybuffer",
      headers: { "Content-Type": "multipart/form-data", accept: "" }
    };

    axios
      .post("/api/db/file/" + this.props.match.params.fileId, data, config)
      .then(res => {
        this.setState({ pw: "" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = this.state.document.fileName;
        link.type = this.state.document.fileType;
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        console.error("Error:", err);

        this.setState({ pw: "Bad Password" });
      });
  };

  componentDidMount() {
    window.addEventListener("load", async () => {
      const doc = await (await fetch(
        "/api/db/" + this.props.match.params.fileId
      )).json();
      this.setState({ document: doc });
    });
  }

  render = () => {
    const successTemplate = (
      <div>
        <h1 className="center header-description header-text">
          Your File Is Ready
        </h1>
        <ul className="flex-container">
          <li className="flex-item">
            <div>
              <div className="note ">
                <p className="center">{this.state.document.fileName}</p>
                <p>Type: {this.state.document.fileType}</p>
                <p>Id: {this.props.match.params.fileId}</p>
                <p>Expires: {this.state.document.expirationDate}</p>
              </div>
              <p className="center">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Secret Key"
                  className="secret"
                />
              </p>

              <p id="pw-error" className="alert alert-danger center">
                <font color="red">{this.state.pw}</font>
              </p>
              <p className="center">
                <button
                  type="button"
                  className="btn"
                  download
                  onClick={this.onClickHandler}
                >
                  Download
                </button>
              </p>
            </div>
          </li>
          <li className="flex-item">{Introduction}</li>
        </ul>
      </div>
    );

    const failTemplate = (
      <div>
        <div>
          File Not Found
          <br />
          Id: {this.props.match.params.fileId}
          <br />
        </div>
      </div>
    );

    return this.state.document.fileName ? successTemplate : failTemplate;
  };
}

export default Download;
