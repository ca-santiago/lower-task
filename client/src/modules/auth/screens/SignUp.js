import React, {useState} from "react";
import {connect} from "react-redux";
import {authActions} from "../actions";
import {AuthContext} from "../helpers";
import {Link} from "react-router-dom";

import "./styles/styles.css";

function SignUpScreen(props) {
	const {signin} = props;

	const [err, setErr] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");

	function _signin(e) {
		e.preventDefault();

		if (!pass || !email) {
			console.log(pass, email);
			setErr("!Ups! Parece que faltó un dato.<br /> Verifique por favor.");
			return;
		}
		setErr("");
		signin({email, pass});
	}

	return (
		<React.Fragment>
			<div className='Container'>
				<h2 className='Title'>Crea tu cuenta</h2>
				<form onSubmit={_signin} className='Form'>
					{err && <p>{err}</p>}
					<label>Llena los campos con tus datos.</label>
					<input type='email' placeholder='Email' onChange={data => setEmail(data.target.value)} className='Input' />
					<input type='text' placeholder='Username' onChange={data => setName(data.target.value)} className='Input' />
					<input type='password' placeholder='Password' onChange={e => setPass(e.target.value)} className='Input' />
					<input type='submit' value='Guardar' className='Button' />
				</form>
			</div>
			<label className='ChangeLogIn'>
				¿Ya tienes cuenta? <br />
				<Link to="/" className='link'>Entonces ven por acá</Link>
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

const mappedScreen = connect(mapState, actionCreators, null, {context: AuthContext})(SignUpScreen);
export {mappedScreen as SignUpScreen};
