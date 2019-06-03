import React, { Component } from "react";
import axios from "axios";
import CopyToClipboard from "./Utils/CopyToClipboard";

// Styles
import "../styles/base.css";
import "../styles/components/upload.css";

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileId: null,
      loaded: 0,
      showConfirmation: false,
      error: null
    };
  }

  onChangeHandler = async event => {
    const file = event.target.files[0];

    await this.setState({
      selectedFile: file
    });
  };

  onClearCurrentFile = () => {
    this.setState({
      fileId: null
    });
  };

  onClickHandler = () => {
    if (!this.state.selectedFile) {
      this.setState({ error: "Please include a file" });
      return "Please include a file";
    } else if (!document.getElementById("key").value.trim()) {
      this.setState({ error: "Please include a secret key" });
      return "Please include a secret key";
    } else {
      this.setState({ error: null });
    }

    const data = new FormData();

    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    data.append("key", document.getElementById("key").value);
    data.append(
      "downloads",
      document.getElementById("downloads").value
        ? document.getElementById("downloads").value
        : 1
    );
    data.append(
      "expiration",
      document.getElementById("expiration").value
        ? document.getElementById("expiration").value
        : 1
    );

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    console.log(this.state);

    // console.log('axios',data);
    axios
      .post("/api/db/upload/", data, config)

      .then(res => {
        console.log("res: ", res);
        this.setState({
          showDownloadForm: false,
          fileId: res.data
        });
      })
      .catch(err => {
        console.log("Upload Failed\n" + err);
      });
  };

  test = () => {
    axios.get("/api/db/test/").then(res => {
      console.log("sent");
    });
  };

  render() {
    return (
      <section component="UploadForm">
        <div id="body">
          <div className="header">
            <h1 className="header-text">
              <span className="brand-dark">Hush</span>
              <span className="brand-white">Hush</span> Pass
            </h1>
            <span className="header-description">Share Files Securely.</span>
          </div>

          <div className="uploadForm-container">
            <div className="uploadForm">
              <div className="form-row center">
                <input
                  type="text"
                  name="key"
                  id="key"
                  placeholder="Your Secret Key"
                  className="row"
                />
              </div>
              <div className="form-row">
                <label className="row">Days until expiration</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  name="expiration"
                  id="expiration"
                  className="row num-input"
                />
              </div>

              <div className="form-row">
                <label className="row">Number of Downloads</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  name="downloads"
                  id="downloads"
                  className="row num-input"
                />
              </div>
              <div className="form-row" id="file-select">
                <label className="row">
                  <font color="#ff0000">{this.state.error}</font>
                </label>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={this.onChangeHandler}
                  className="row"
                />
              </div>
              <div className="row center">
                {this.state.fileId ? (
                  <div>
                    <label for="modal_1" className="button row ">
                      Get file path
                    </label>

                    <label
                      for="modal_1"
                      className="button row"
                      onClick={this.onClearCurrentFile}
                    >
                      Upload another file
                    </label>
                  </div>
                ) : (
                  <label
                    for="modal_1"
                    className="button"
                    id="upload-btn"
                    onClick={this.onClickHandler}
                  >
                    Upload
                  </label>
                )}

                {this.state.fileId && (
                  <div class="modal">
                    <input id="modal_1" type="checkbox" />
                    <label for="modal_1" className="overlay" />
                    <article>
                      <header>
                        <h3>File Uploaded!</h3>
                        <label for="modal_1" className="close">
                          &times;
                        </label>
                      </header>
                      <section className="content">
                        Your file has been uploaded.
                        {
                          <CopyToClipboard
                            className="btn"
                            text={`${window.location.href}download/${
                              this.state.fileId
                            }`}
                          />
                        }
                      </section>
                      <footer>
                        <label for="modal_1" className="button dangerous">
                          Close
                        </label>
                      </footer>
                    </article>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button type="button" className="btn" onClick={this.test}>
            test
          </button>
        </div>
      </section>
    );
  }
}
export default UploadForm;
