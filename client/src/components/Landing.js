import React, { Component } from 'react';
// import { connect } from 'react-redux';
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
        console.log('onChangeHandler');
        // const file = new Blob([event.target.files[0]],{type:event.target.files[0]})
        const file = event.target.files[0];
        
        await this.setState({
            selectedFile: file
        
        });
        console.log(this.state.selectedFile);
        console.log(this.state.selectedFile.length);
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('file',this.state.selectedFile);
        data.append('key','key');

        const config = { headers:{'Content-Type':'multipart/form-data'}};

        console.log('axios',data);
        axios.post("/api/db/upload/", data, {})
        // axios.post("/api/db/upload/", foo:'bar')
        
        
        .then(res => { // then print response status
            // toast.success('upload success')
            console.log('res');
        })
        .catch(err => { // then print response status
            // toast.error('upload fail')
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