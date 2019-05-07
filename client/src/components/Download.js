import React from 'react';

const Download = (props) => {

    return (
        <section component="Download">
            <h1>Download Page</h1>
            {props.match.params.fileId && 
                <div> 
                    File Id: {props.match.params.fileId} 
                    <button type="button" className="btn" onClick={()=>{
                        window.location = `/api/db/download/${props.match.params.fileId}`; 
                    }}>Download</button>
                </div>
            }
        </section>
    )
}

// axios.post("/api/db/upload/", data, config)


export default Download; 