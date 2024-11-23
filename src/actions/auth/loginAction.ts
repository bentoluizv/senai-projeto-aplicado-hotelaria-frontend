import { defineAction } from "astro:actions";
import { loginForAccessToken } from "../../utils/auth/loginForAccessToken";
import { setSecureToken } from "../../utils/auth/setSecureToken";
import { getLoginFormData } from "../../utils/getLoginFormData";

const loginAction = defineAction({
  accept: "form",
  handler: async (input, ctx) => {
    const { cookies, locals } = ctx;
    const data = await getLoginFormData(input);
    const jwt = await loginForAccessToken(data, cookies);
    setSecureToken(cookies, jwt);
    locals.token = jwt;
  },
});

export { loginAction };
