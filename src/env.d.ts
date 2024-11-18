/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  id: string;
  username: string;
  role?: "USER" | "ADMIN";
}

declare namespace App {
  interface Locals {
    user?: User;
  }
}
