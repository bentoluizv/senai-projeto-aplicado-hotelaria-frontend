/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  ulid: string;
  email: string;
  role?: "user" | "admin";
}

interface Token {
  access_token: string;
  token_type: string;
}

declare namespace App {
  interface Locals {
    user?: User;
    token?: Token;
  }
}
