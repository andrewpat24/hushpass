import React,{ Component }  from 'react';
import axios from 'axios';

class Download extends Component{
    constructor(props) {
        super(props);
        this.state = {document:{}}
    }

    test = () => {
        const data = new FormData();
        
        data.append('password',document.getElementById('password').value);
        const config = {responseType: 'arraybuffer', headers:{'Content-Type':'multipart/form-data'}};

        // window.location = `/api/db/download/${this.props.match.params.fileId}`;

        fetch("/api/db/test/"+this.props.match.params.fileId, data, config)
        
        .then((res) => { 
            console.log('res:',res);
            // const filename = res.headers["content-disposition"].split('=')[1].replace('"','').replace('"','');
            
            console.log('filename:',this.state.document.fileName);


            // const url = window.URL.createObjectURL(new Blob([res.blob()]));
            // const link = document.createElement('a');
            // link.href = url;
            // alert(url);
            // link.setAttribute('download',this.state.document.fileName);
            // document.body.appendChild(link);
            // link.click();

        })
        .catch(err => { 
            console.log("Download Failed\n"+err);
        })

    }


    onClickHandler = () => {

        const data = new FormData();
        
        data.append('password',document.getElementById('password').value);
        const config = {responseType: 'arraybuffer', headers:{'Content-Type':'multipart/form-data', 'accept':''}};
        
        console.log('getting file');
        axios.post("/api/db/file/"+this.props.match.params.fileId, data, config)
        // fetch("/api/db/file/"+this.props.match.params.fileId, {password:document.getElementById('password').value})
        .then( res => {
            // filename = res.headers["Content-Disposition"].split('=')[1].replace('"','').replace('"','');;
            console.log(res);
            return res.blob();
        })
        .then( blob =>{
            console.log(blob);
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = this.state.document.fileName;
            a.type = this.state.document.fileType;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        })
        .catch( err =>{
            console.error('Error:',err);
        })

    }

    componentDidMount(){ window.addEventListener('load', async ()=>{
        console.log('did mount');
        const doc = await(await fetch("/api/db/"+this.props.match.params.fileId)).json();
        this.setState({document: doc});
        // console.log(doc);
        console.log( this.state.document );
    })}

    render = () => {

        return (
            <div>
            <h1>Download Page</h1>
                <div> 
                    File<br/>
                    Id:   {this.props.match.params.fileId}<br/>
                    Name: {this.state.document.fileName}<br/>
                    Type: {this.state.document.fileType}<br/>
                    Expiration: {this.state.document.expirationDate}<br/>

                    <input type='text' id='password' name='password' placeholder='password'></input>
                    <button type="button" className="btn" download onClick={this.onClickHandler}>Download</button>
                    <p><button type="button" className="btn" onClick={this.test}>test</button></p>
                </div>
            </div>
        )
    }
}

export default Download; 