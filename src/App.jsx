import React from 'react';
import QR from './components/QR';
// import UserRegistrationQR from './components/UserRegistrationQR';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import UserRegistrationQR from './components/encrypted/UserRegistrationQR';
import ShowData from './components/encrypted/ShowData';
// import ShowData from './components/ShowData';

const router = createBrowserRouter([
	{
		path: '/',
		element: <UserRegistrationQR />,
	},
	{
		path: '/register',
		element: <ShowData />,
	},
]);

const App = () => {
	return (
		<div style={{ width: '100%' }}>
			<div>
				<RouterProvider router={router} />
			</div>
		</div>
	);
};

export default App;
