import { getCurrentUserAction } from "./auth/getCurrentUserAction";
import { loginAction } from "./auth/loginAction";
import { refreshTokenAction } from "./auth/refreshTokenAction";
import { createNewGuestAction } from "./guest/createNewGuestAction";
import { deleteGuestAction } from "./guest/deleteGuestAction";
import { findGuestByIDAction } from "./guest/findGuestByIDAction";
import { getAllGuestsAction } from "./guest/getAllGuestsAction";

export const server = {
  refreshTokenAction,
  getCurrentUserAction,
  loginAction,
  getAllGuestsAction,
  createNewGuestAction,
  findGuestByIDAction,
  deleteGuestAction,
};
