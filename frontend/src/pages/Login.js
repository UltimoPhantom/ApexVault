// Login.js

import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';


function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup, error, isLoading } = useSignup()
	const { login, errorL, isLoadingL } = useLogin()
	// const { login, errorL, isLoading2 } = useLogin()

	const handleSignup = async (e) => {
		e.preventDefault();
		await signup(email, password)


		console.log(email, password)
		setEmail('')
		setPassword('')
		if(error) {
			console.log(error.message);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password)

		console.log(email, password)
		setEmail('')
		setPassword('')

		if(errorL) {
			console.log(errorL);
		}
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
						<button className='buttonStlye' disabled={isLoading}>Sign up</button>
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
						<button className='buttonStlye' disabled={isLoadingL}>Login</button>
					</form>
				</div>
			</div>

		{error && <div className='error'>{error}</div>}
		{errorL && <div className='error'>{errorL}</div>}
		</div>
	);
}

export default Login;
