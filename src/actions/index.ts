import { createNewGuestAction } from "./createNewGuestAction";
import { deleteGuestAction } from "./deleteGuestAction";
import { findGuestByIDAction } from "./findGuestByIDAction";
import { getAllGuestsAction } from "./getAllGuestsAction";
import { getCurrentUserAction } from "./getCurrentUserAction";
import { loginAction } from "./loginAction";
import { refreshTokenAction } from "./refreshTokenAction";

export const server = {
  refreshTokenAction,
  getCurrentUserAction,
  loginAction,
  getAllGuestsAction,
  createNewGuestAction,
  findGuestByIDAction,
  deleteGuestAction,
};
