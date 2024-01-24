// Login.js

import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import { useState } from 'react';

function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const { signup, error, isLoading } = useSignup()
	// const { login, error2, isLoading2 } = useLogin()

	const handleSignup = async (e) => {
		// e.preventDefault();
		// await signup(email, password)


		// console.log(email, password)
		// setEmail('')
		// setPassword('')
		// if(error) {
		// 	console.log(error);
		// 	alert(error)		
		// }
		
	};

	const handleLogin = async (e) => {
		// e.preventDefault();
		// await login(email, password)

		// console.log(email, password)
		// setEmail('')
		// setPassword('')

		// if(error2) {
		// 	console.log(error2);
		// 	alert(error2)		
		// }
	};


	return (
		<div className='bbody'>

			<div className="mmain">
				<input type="checkbox" id="chk" aria-hidden="true" />

				<div className="signup">
					<form onSubmit={handleSignup}>
						<label className='labelStyle' htmlFor="chk" aria-hidden="true">Sign up</label>
						<input className='inputStyle' type="email" name="email" placeholder="Email" value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input className='inputStyle' type="password" name="pswd" placeholder="Password" value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button className='buttonStlye' disabled={false}>Sign up</button>
					</form>
				</div>



				<div className="login">
					<form onSubmit={handleLogin}>
						<label className='labelStyle' htmlFor="chk" aria-hidden="true">Login</label>
						<input className='inputStyle' type="email" name="email" placeholder="Email" value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input className='inputStyle' type="password" name="pswd" placeholder="Password" value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button className='buttonStlye' disabled={false}>Login</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
