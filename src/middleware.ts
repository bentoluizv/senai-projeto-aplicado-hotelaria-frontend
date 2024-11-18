import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect, cookies } = context;

  const token = cookies.get("token")?.value;

  const publicRoutes = ["/login"];
  const url = new URL(request.url);

  if (publicRoutes.includes(url.pathname)) {
    return next();
  }

  const verification = await verifyToken(token);

  if (!verification.isValid) {
    if (token) {
      context.cookies.delete("token", { path: "/" });
    }
    return redirect("/login");
  }

  context.locals.user = verification.user;

  return next();
});
