import { actions } from "astro:actions";
import { defineMiddleware, sequence } from "astro:middleware";

const protectedPaths = [
  "/",
  "/hospedes",
  "/hospedes/cadastro",
  "/acomodacoes",
  "/acomodacoes/cadastro",
  "/reservas",
  "/reservas/cadastro",
];

const checkTokenMiddleware = defineMiddleware(async (context, next) => {
  const { redirect, cookies, url, callAction } = context;

  if (protectedPaths.includes(url.pathname)) {
    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      return redirect("/login");
    }

    const token: Token = tokenCookie.json();
    const { data, error } = await callAction(actions.refreshTokenAction, token);

    if (error) {
      return redirect("/login");
    }
  }

  return next();
});

const getUserMiddleware = defineMiddleware(async (context, next) => {
  const { redirect, cookies, url, callAction, locals } = context;

  if (protectedPaths.includes(url.pathname)) {
    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      return redirect("/login");
    }

    const token: Token = tokenCookie.json();
    const { data, error } = await callAction(
      actions.getCurrentUserAction,
      token
    );

    if (error) {
      return redirect("/login");
    }

    // locals.user = data;
  }

  return next();
});

export const onRequest = sequence(checkTokenMiddleware, getUserMiddleware);
