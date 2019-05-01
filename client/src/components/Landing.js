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

	</section>
);
export default Landing; 