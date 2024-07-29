import React from 'react';
import QR from './components/QR';

const App = () => {
	return (
		<div style={{ width: '100%' }}>
			<div style={{ textAlign: 'center' }}>
				<h1>QR Code Generator</h1>
			</div>
			<QR url='https://mail.google.com/' />
		</div>
	);
};

export default App;
