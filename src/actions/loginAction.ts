import { defineAction } from "astro:actions";
import { getLoginFormData } from "../utils/getLoginFormData";
import { loginForAccessToken } from "../utils/loginForAccessToken";
import { setSecureToken } from "../utils/setSecureToken";

const loginAction = defineAction({
  accept: "form",
  handler: async (input, { cookies }) => {
    const data = await getLoginFormData(input);
    const jwt = await loginForAccessToken(data, cookies);
    setSecureToken(cookies, jwt);
    console.log("Sucessfull Login!");
  },
});

export { loginAction };
