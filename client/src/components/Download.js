import React,{ Component }  from 'react';
import axios from 'axios';

class Download extends Component{
    onClickHandler = () => {
        const data = new FormData();
        data.append('password',document.getElementById('password').value);
        const config = { headers:{'Content-Type':'multipart/form-data'}};

        // console.log('axios',data);
        axios.post("/api/db/file/"+this.props.match.params.fileId, data, config)

        .then(res => { 
            console.log('res:',res);
            const filename = res.headers["content-disposition"].split('=')[1].replace('"','').replace('"','');
            // console.log('filename:',filename);

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download',filename);
            document.body.appendChild(link);
            link.click();

        })
        .catch(err => { 
            console.log("Download Failed\n"+err);
        })

    }


    test = () => {
        const data = new FormData();
        data.append('password',document.getElementById('password').value);
        // const config = { headers:{'Content-Type':'multipart/form-data'}};
        axios.post("/api/db/test/"+this.props.match.params.fileId, data)
        .then(res => { 
            // console.log('res: ',res);
        })
        .catch(err => { 
            console.log("download Failed\n"+err);
        })

    }

    render = () => {

        return (
            <div>
            <h1>Download Page</h1>
                <div> 
                    File Id: 
                    <input type='text' id='password' name='password' placeholder='password'></input>
                    <button type="button" className="btn" download onClick={this.onClickHandler}>Download</button>
                    <p><button type="button" className="btn" onClick={this.test}>test</button></p>
                </div>
            </div>
        )
    }
}

export default Download; 