import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import Confirmation from "./Confirmation";

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

    data.append(
      "file",
      this.state.selectedFile[0],
      this.state.selectedFile[0].name
    );
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

  test = () => {
    axios.get("/api/db/test/").then(res => {
      console.log("sent");
    });
  };

  render() {
    return (
      <section component="UploadForm">
        {!this.state.fileId ? (
          <div id="body">
            <div>
              <span> Share Files Securely. </span>
            </div>
            <br />
            <br />
            <form>
              <Dropzone
                onDrop={acceptedFiles => this.onDropZone(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!this.state.selectedFile ? (
                        <p className="dropzone">
                          Drag and drop a file here, or click here to select a
                          file
                        </p>
                      ) : (
                        <p className="dropzone">
                          File Set: {this.state.selectedFile.name}
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
              <input
                type="text"
                name="key"
                id="key"
                placeholder="Your Secret Key"
              />
              <br />
              <br />
              <label>
                <input
                  placeholder="Days until expiration"
                  type="number"
                  min="1"
                  max="7"
                  name="expiration"
                  id="expiration"
                />
              </label>
              <br />
              <br />
              <label>
                <input
                  placeholder="Number of Downloads"
                  type="number"
                  min="1"
                  max="100"
                  name="downloads"
                  id="downloads"
                />
              </label>
              <br />
              <br />
              {/* <input
                type="file"
                name="file"
                className="form-control"
                onChange={this.onChangeHandler}
              />
              <br />
              <br /> */}
              <label>
                <font color="#ff0000"> {this.state.error} </font> <br />
                <button
                  type="button"
                  className="btn"
                  name="upload"
                  onClick={this.onClickHandler}
                >
                  Upload
                </button>
              </label>
              <br />
            </form>
            <br />
            <button type="button" className="btn" onClick={this.test}>
              test
            </button>
          </div>
        ) : (
          <Confirmation fileId={this.state.fileId} />
        )}
      </section>
    );
  }
}
export default UploadForm;
