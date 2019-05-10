import React, { Component } from 'react'; 
import axios from 'axios';

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
			loaded: 0
        }
    }

    onChangeHandler = async (event)=>{
		console.log('onChangeHandler');
  		let files = event.target.files[0];
  		await this.setState({
     		selectedFile: files,
     		loaded:0
  		});
  		console.log(this.state.selectedFile);
    }
    
    onClickHandler = () => {
		console.log('axios',this.state.selectedFile);
    	axios.post("/api/upload/", this.state.selectedFile)
      	
      	.then( (res) => {
        	console.log(res);
      	})
      	.catch((err) => { 
        	console.log("Upload Failed\n"+err);
          })
    }

    render () {
        return (
            <form >
                <input type='text' name='key' placeholder='Your Secret Key'/>
                <input type='file' name='file' className="form-control" onChange={this.onChangeHandler}/>
                <button type="button" className="btn" onClick={this.onClickHandler}>Upload</button>
            </form>
        )
    }
}
export default UploadForm;