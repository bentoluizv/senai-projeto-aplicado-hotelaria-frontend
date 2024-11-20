import type { APIContext, APIRoute } from "astro";
import { getLoginFormData } from "../../utils/getLoginFormData";
import { loginForAccessToken } from "../../utils/loginForAccessToken";
import { setSecureToken } from "../../utils/setSecureToken";

export const POST: APIRoute = async (context: APIContext) => {
  const { request, cookies, redirect } = context;

  try {
    const data = await getLoginFormData(request);
    const jwt = await loginForAccessToken(data, cookies);
    setSecureToken(cookies, jwt);
    console.log("Sucessfull Login!");

    return redirect("/", 302);
  } catch (e) {
    console.error("Oops, there was a problem in you login attempt!!", e);

    return redirect("/login");
  }
};
