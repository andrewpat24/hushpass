import React from 'react';
// Components
import UploadForm from './UploadForm';

const Landing = () => (
	<section componentName="Landing" >

		<div style={{
			textAlign: 'center'
			}}>
			<h1>HushPass</h1>
			<span>Share Files Securely.</span>
		</div>
		<UploadForm /> 

	</section>
);
export default Landing; 