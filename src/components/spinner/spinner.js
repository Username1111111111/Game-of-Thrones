import React from 'react';
import './spinner';

const Spinner = () => {
	const style = {
		width: '50px',
		height: '50px'
	};

	return (
		<div className="d-flex justify-content-center">
			<div className="spinner-border text-primary m-4" style={style} role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;