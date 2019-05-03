import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedFile:null,
            loaded:0
        }
    }

    onChangeHandler= async (event)=>{
        // console.log('onChangeHandler');

        const file = event.target.files[0];
        
        await this.setState({
            selectedFile: file
        
        });
        // console.log(this.state.selectedFile);
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append("file",this.state.selectedFile, 'file-name');
        data.append('key',document.getElementById('key').value);

        const config = { headers:{'Content-Type':'multipart/form-data'}};

        // console.log('axios',data);
        axios.post("/api/db/upload/", data, config)
        
        .then(res => { 
            console.log('res: ',res);
        })
        .catch(err => { 
            console.log("Upload Failed\n"+err);
        })
    }

    test = () =>{

        axios.get("/api/db/upload/").then(res=>{
            console.log('sent');
        });
    }

    
    render() {
    return (
        <div id='super'>
        <div style={{
            textAlign: 'center'
            }}>
            <h1>HushPass</h1>
            <span>Share Files Securely.</span>
        </div>

        <div id='body'>
            <form >
                <input type='text' name='key' id='key' placeholder='Your Secret Key'/>
                <input type='file' name='file' className="form-control" onChange={this.onChangeHandler}/>
                <button type="button" className="btn" onClick={this.onClickHandler}>Upload</button>
            </form>
        </div>
        <button type="button" className="btn" onClick={this.test}>test</button>

        </div>
        );
    }

}
export default Landing; 