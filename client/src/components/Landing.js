import React from 'react';
// Components
import UploadForm from './UploadForm';
// Styles
import '../styles/components/landing.css'

const Landing = () => (
	<section componentName="Landing" >

		<div class="header">
			<h1>HushPass</h1>
			<span>Share Files Securely.</span>
		</div>

		<UploadForm /> 

		console.log('axios',this.state.selectedFile);
    	axios.post("/api/db/upload/", this.state.selectedFile)
      	
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
