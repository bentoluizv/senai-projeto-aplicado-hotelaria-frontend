/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  id: string;
  username: string;
  role?: "user" | "admin";
}

interface Token {
  access_token: string;
  token_type: string;
}

interface TokenWithExp extends Token {
  exp: number;
}

declare namespace App {
  interface Locals {
    user?: User;
    token?: Token;
  }
}
