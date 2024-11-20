import { actions } from "astro:actions";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { redirect, cookies, url, callAction } = context;

  const protectedPaths = [
    "/",
    "/hospedes",
    "/hospedes/cadastro",
    "/acomodacoes",
    "/acomodacoes/cadastro",
    "/reservas",
    "/reservas/cadastro",
  ];

  if (protectedPaths.includes(url.pathname)) {
    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      return redirect("/login");
    }

    const token: Token = tokenCookie.json();
    const { _, error } = await callAction(actions.refreshToken, token);

    if (error) {
      return redirect("/login");
    }
  }

  return next();
});
