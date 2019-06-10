import React, { Component } from "react";
import axios from "axios";
import CopyToClipboard from "./Utils/CopyToClipboard";

// Styles
import "../styles/base.css";
import "../styles/components/upload.css";

import Dropzone from "react-dropzone";
import Confirmation from "./Confirmation";
import Introduction from "./Introduction";

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

  async onDropZone(acceptedFiles) {
    await this.setState({
      selectedFile: acceptedFiles[0]
    });
    await console.log("file set:", this.state);
  }

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

    // data.append(
    //   "file",
    //   this.state.selectedFile[0],
    //   this.state.selectedFile[0].name
    // );
    data.append("file", this.state.selectedFile);
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

  render() {
    return (
      <section component="UploadForm">
        <div id="body">
          <div className="header">
            <h1 className="header-text">
              <span className="brand-dark">Hush</span>
              <span className="brand-white">Hush</span>
            </h1>
            <span className="header-description">Share Files Securely.</span>
          </div>
          <ul className="flex-container">
            <li className="flex-item">
              <div className="uploadForm-container">
                <div className="uploadForm ">
                  <div className="form-row ">
                    <Dropzone
                      onDrop={acceptedFiles => this.onDropZone(acceptedFiles)}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!this.state.selectedFile ? (
                              <div className="dropzone ">
                                <p className="file-icon ">
                                  <i className="far fa-file center" />
                                </p>
                                <p className="center">
                                  Drag and drop a file here, or
                                </p>
                                <p className="center">
                                  <span className="underline">click here</span>
                                </p>
                                <p className="center">to select a file</p>
                              </div>
                            ) : (
                              <p className="dropzone center">
                                File Set: {this.state.selectedFile.name}
                              </p>
                            )}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                  <div className="form-row  center">
                    <input
                      type="text"
                      name="key"
                      id="key"
                      placeholder="Your Secret Key"
                      className="row key"
                    />
                  </div>
                  <div className="form-row center">
                    <input
                      placeholder="Days until expiration"
                      type="number"
                      min="1"
                      max="7"
                      name="expiration"
                      id="expiration"
                      className="row num-input expiration"
                    />
                  </div>

                  <div className="form-row center">
                    <input
                      placeholder="Number of Downloads"
                      type="number"
                      min="1"
                      max="100"
                      name="downloads"
                      id="downloads"
                      className="row num-input downloads"
                    />
                  </div>
                  <div className="form-row center" id="file-select">
                    <label className="row">
                      <font color="#ff0000">{this.state.error}</font>
                    </label>
                  </div>
                  <div className="row center">
                    {this.state.fileId ? (
                      <div>
                        <label
                          for="modal_1"
                          className="button row"
                          id="getFilePathBtn"
                        >
                          <div>Get file path</div>
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
                            <h3>Upload Complete</h3>
                            <label for="modal_1" className="close">
                              &times;
                            </label>
                          </header>
                          <section className="content">
                            <div className="row flex three demo">
                              <div className="half">
                                Your file has been uploaded!
                                {
                                  <CopyToClipboard
                                    className="btn"
                                    text={`${window.location.href}download/${
                                      this.state.fileId
                                    }`}
                                  />
                                }
                              </div>
                              <div>
                                <div className="row form-row">
                                  Your file's been encrypted and stored in our
                                  database. Only you and the people you share
                                  your password with are capable of seeing your
                                  file.
                                </div>
                                <div className="row">
                                  Keep track of your password! The recipient
                                  will need it to download the file.
                                </div>
                              </div>
                            </div>
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
            </li>
            <li className="flex-item ">{Introduction}</li>
          </ul>
        </div>
      </section>
    );
  }
}
export default UploadForm;
