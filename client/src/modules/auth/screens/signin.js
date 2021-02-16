import React, {useState} from "react";
import {connect} from "react-redux";
import {authActions} from "../actions";
import {AuthContext} from "../helpers";
import {Link} from "react-router-dom";

import "./styles/styles.css";

function SignInScreen(props) {
	const {signin} = props;

	const [err, setErr] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	function _signin(e) {
		e.preventDefault();

		if (!pass || !email) {
			console.log(pass, email);
			setErr("Correo y contraseña requeridos");
			return;
		}
		setErr("");
		signin({email, pass});
	}

	return (
		<React.Fragment>
			<div className='Container'>
				<h1 className='TitleApp'>AnotherNotes🛀</h1>
				<form onSubmit={_signin} className='Form'>
					{err && <p>{err}</p>}
					<label>Inicia sesión con tu correo y contraseña</label>
					<input type='email' placeholder='Email' onChange={data => setEmail(data.target.value)} className='Input' />
					<input type='password' placeholder='Password' onChange={e => setPass(e.target.value)} className='Input' />
					<input type='submit' value='Ingresar' className='Button' />
				</form>
			</div>
			<label className='ChangeLogIn'>
				¿No tienes cuenta? <br />
				<Link to="./SignUp" className='link'>¡Empieza a organizarte!</Link>
			</label>
		</React.Fragment>
	);
}

function mapState(state) {
	return state;
}

const actionCreators = {
	signin: authActions.SignIn,
	signout: authActions.SignOut,
};

const mappedScreen = connect(mapState, actionCreators, null, {context: AuthContext})(SignInScreen);
export {mappedScreen as SignInScreen};
