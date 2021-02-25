import { verifyCredentials } from "../../../../services";

export async function authenticateRequest (req, res, next) {

    const tokenOrNull = analizeToken(
        req.headers["authorization"] ||
        req.headers["token"]
    );
    const refreshOrNull = req.headers["refreshtoken"];

    if(!tokenOrNull || !refreshOrNull)
        return res.status(401).end();

    const result = await verifyCredentials(tokenOrNull, refreshOrNull);
    if(result.isSuccess === false)
        return res.status(401).end();

    const { token, refreshToken, accountId } = result.getValue();
    req.body.token = token;
    req.body.refreshToken = refreshToken;
    req.body.accountId = accountId;
    next();
}

export function analizeToken(maybe: any): string | null {
  if (typeof maybe !== "string") return null;
  const payload: string[] = maybe.split(" ");

  return !!payload[1] === false ? null : payload[1];
}
