import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ShowData = () => {
	const { search } = useLocation();
	const [showJson, setShowJson] = useState(false);
	const [userObject, setUserObject] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		const user = new URLSearchParams(search);
		const encryptedData = user.get('data');

		if (encryptedData) {
			try {
				const secretKey = 'your-secret-key';
				const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
				const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
				setUserObject(JSON.parse(decryptedData));
			} catch (e) {
				setError('Failed to decrypt the data.');
			}
		} else {
			setError('No data found.');
		}
	}, [search]);

	const handlePrint = () => {
		window.print();
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<button
					style={styles.toggleButton}
					onClick={() => setShowJson(!showJson)}
				>
					{showJson ? 'Show Data' : 'Show Form Details'}
				</button>
				<button style={styles.printButton} onClick={handlePrint}>
					Print
				</button>
			</div>
			{error ? (
				<p style={styles.error}>{error}</p>
			) : showJson ? (
				<div style={styles.jsonContainer}>
					<pre>{JSON.stringify(userObject, null, 2)}</pre>
				</div>
			) : (
				<div style={styles.card}>
					<h1 style={styles.title}>User Profile</h1>
					<div style={styles.details}>
						<h2 style={styles.name}>{userObject.name}</h2>
						<p style={styles.email}>
							<strong>Email:</strong> {userObject.email}
						</p>
						<p style={styles.gender}>
							<strong>Gender:</strong> {userObject.gender}
						</p>
						<p style={styles.state}>
							<strong>State:</strong> {userObject.state}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: '95vh',
		backgroundColor: '#f0f2f5',
		padding: '20px',
		boxSizing: 'border-box',
		overflowY: 'hidden',
	},
	header: {
		marginBottom: '20px',
	},
	toggleButton: {
		backgroundColor: '#007bff',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		padding: '12px 24px',
		fontSize: '18px',
		cursor: 'pointer',
		marginRight: '10px',
		outline: 'none',
		transition: 'background-color 0.3s',
	},
	printButton: {
		backgroundColor: '#28a745',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		padding: '12px 24px',
		fontSize: '18px',
		cursor: 'pointer',
		outline: 'none',
		transition: 'background-color 0.3s',
	},
	error: {
		color: 'red',
		fontSize: '18px',
		margin: '20px 0',
	},
	jsonContainer: {
		marginBottom: '20px',
		padding: '10px',
		backgroundColor: '#fff',
		borderRadius: '4px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
		maxWidth: '600px',
		width: '100%',
		overflowX: 'auto',
	},
	card: {
		backgroundColor: '#fff',
		padding: '20px',
		borderRadius: '8px',
		boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
		maxWidth: '400px',
		width: '100%',
		textAlign: 'left',
		boxSizing: 'border-box',
		overflow: 'hidden',
	},
	title: {
		fontSize: '26px',
		marginBottom: '20px',
		color: '#333',
	},
	details: {
		marginBottom: '20px',
	},
	name: {
		fontSize: '22px',
		margin: '0 0 10px',
		color: '#444',
	},
	email: {
		fontSize: '18px',
		margin: '5px 0',
		color: '#555',
	},
	gender: {
		fontSize: '18px',
		margin: '5px 0',
		color: '#555',
	},
	state: {
		fontSize: '18px',
		margin: '5px 0',
		color: '#555',
	},
};

export default ShowData;
