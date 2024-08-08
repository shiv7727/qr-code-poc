import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';
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
		setshowQR(true);

		// Encrypt user data
		const secretKey = 'your-secret-key';
		const encryptedData = CryptoJS.AES.encrypt(
			JSON.stringify(userData),
			secretKey,
		).toString();

		const queryParams = new URLSearchParams({ data: encryptedData }).toString();
		const registrationUrl = `http://192.168.1.8/register?${queryParams}`;
		setQrValue(registrationUrl);
		console.log(registrationUrl);
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<>
			<div className={styles.container}>
				{!showQR && (
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
								<label htmlFor='gender'>Gender:</label>
								<div className={styles.radioGroup}>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										name='gender'
										value='male'
										id='male'
										onChange={handleChange}
									/>
									<label htmlFor='female'>Female</label>
									<input
										type='radio'
										name='gender'
										value='female'
										id='female'
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
						</form>
					</div>
				)}
			</div>

			<div className={styles.qrContainer}>
				{showQR && (
					<div
						style={{
							width: '80vw',
							height: '80vh',
						}}
					>
						<QRCode
							className=''
							value={qrValue}
							size={500}
							level='H'
							bgColor='#FFFFFF'
							fgColor='#000000'
							style={{ width: '100%' }}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default UserRegistrationQR;
