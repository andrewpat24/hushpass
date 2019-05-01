import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        let files = event.target.files[0];
        await this.setState({
            selectedFile: files,
            loaded:0
        });
        console.log(this.state.selectedFile);
    }

    onClickHandler = () => {
        // const data = new FormData() 
        // for(var x = 0; x<this.state.selectedFile.length; x++) {
     //         data.append('file', this.state.selectedFile[x])
        // }

        console.log('axios',this.state.selectedFile);
        axios.post("/api/upload/", this.state.selectedFile)
        
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

        axios.get("/api/upload/").then(res=>{
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
                <input type='text' name='key' placeholder='Your Secret Key'/>
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