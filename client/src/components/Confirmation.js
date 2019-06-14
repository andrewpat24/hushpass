import React from 'react';
import { Link } from 'react-router-dom'

const Confirmation = (props) => {

    return (
        <section component="Confirmation">
            <h1>Confirmation</h1>
            <Link to={`/download/${props.fileId}`}>Click here to visit the download page</Link>
        </section>
    )
}

export default Confirmation; 