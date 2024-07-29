import React from 'react';
import QRCode from 'react-qr-code';

const QR = ({ url }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
			<QRCode
				value={url}
				size={256}
				level='H'
				bgColor='#FFFFFF'
				fgColor='#000000'
			/>
		</div>
	);
};

export default QR;
