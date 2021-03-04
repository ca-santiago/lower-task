import {verifyCredentials} from "../../../../services";


export async function authenticateRequest(req, res, next) {
	const token = sanitizeToken(req.headers['authorization']);
	const refreshT = req.headers['refreshtoken'];
	
	const credentialsOrError = await verifyCredentials(token, refreshT);
	if(credentialsOrError.isSuccess == false) return res.status(401).end();
	
	req.body.accountId = credentialsOrError.getValue().accountId;
	next();
}

function sanitizeToken(token: string): null | string {
	if(token == '' || !token) return null;	
	const payload = token.split(' ')[1]
	return payload ? payload : null;	
}
