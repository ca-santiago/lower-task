import fetch from "node-fetch";
import { Result } from "../../shared/core/Result";

const authURL = process.env.AUTH_SERVICE_URL;
const baseURL = `${authURL}/api/v1`;

export interface VerifiedTokens {
  token: string, refreshToken: string,
  accountId: string,
}

export async function verifyCredentials(
  token: string,
  refreshToken: string
): Promise<Result<VerifiedTokens>> {

  const bodyPayload = {
    token,
    refreshToken
  };
  try {
    const res = await fetch(`${baseURL}/verifyCredentials`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(bodyPayload)
    });

    if(res.status === 401 || res.status === 400)
      return Result.fail(['Unauthenticated']);

    const payload = await res.json();
    const { token, refreshToken, acccountId } = payload; 

    return Result.ok({ token, refreshToken, accountId: acccountId });
  } catch (err) {
    return Result.fail(['Unauthenticated']);
  }
}
