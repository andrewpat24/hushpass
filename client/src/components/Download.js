import React from 'react';

const Download = (props) => {
    return (
        <section component="Download">
            <h1>Download Page</h1>
            {props.match.params.fileId && <h3> File Id: {props.match.params.fileId} </h3>}
        </section>
    )
}

export default Download; 