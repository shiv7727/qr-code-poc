import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import styles from './UserRegistrationQR.module.css'; // Import CSS module

const UserRegistrationQR = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		gender: '',
		state: '',
	});
	const [showQR, setshowQR] = useState(false);
	const [qrValue, setQrValue] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// URL encode the query parameters
		setshowQR(true);
		const queryParams = new URLSearchParams(userData).toString();
		const registrationUrl = `http://192.168.1.8/register?${queryParams}`;
		setQrValue(registrationUrl);
		console.log(registrationUrl);
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor='name'>Name:</label>
						<input
							type='text'
							id='name'
							name='name'
							value={userData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='email'
							name='email'
							value={userData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='email'>Gender:</label>
						<div className={styles.radioGroup}>
							<label htmlFor='Male'>Male</label>
							<input
								type='radio'
								name='gender'
								value='male'
								id='male'
								onChange={handleChange}
							/>
							<label htmlFor='Female'>Female</label>
							<input
								type='radio'
								name='gender'
								value='Female'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='state'>State: </label>
						<select
							name='state'
							id='state'
							onChange={handleChange}
							value={userData.state}
						>
							<option value='delhi'>Delhi</option>
							<option value='up'>U.P</option>
							<option value='haryana'>Haryana</option>
							<option value='punjab'>Punjab</option>
						</select>
					</div>
					<button type='submit'>Register</button>
				</form>{' '}
			</div>
			<div className={styles.qrContainer}>
				{showQR && (
					<div>
						<h2>Generated QR Code</h2>
						{/* <QRCode value={JSON.stringify(userData)} /> */}
						<QRCode
							value={qrValue}
							size={256}
							level='H'
							bgColor='#FFFFFF'
							fgColor='#000000'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserRegistrationQR;
