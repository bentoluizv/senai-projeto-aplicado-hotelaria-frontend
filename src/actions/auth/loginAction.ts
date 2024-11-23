import { defineAction } from "astro:actions";
import { getLoginFormData } from "../../utils/getLoginFormData";
import { loginForAccessToken } from "../../utils/loginForAccessToken";
import { setSecureToken } from "../../utils/setSecureToken";

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
