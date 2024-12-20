import { createNewAccommodationAction } from "./accommodation/createNewAccommodationAction";
import { deleteAccommodationAction } from "./accommodation/deleteAccommodationAction";
import { findAccommodationByIDAction } from "./accommodation/findAccommodationByULIDAction";
import { getAllAccommodationsAction } from "./accommodation/getAllAcommodationsAction";
import { updateAccommodationAction } from "./accommodation/updateAccommodationAction";
import { createNewAmenitieAction } from "./amenities/createNewAmenitieAction";
import { deleteAmenitieAction } from "./amenities/deleteAmenitieAction";
import { findAmenitieByIdAction } from "./amenities/findAmenitieByIDAction";
import { listAllAmenitiesAction } from "./amenities/listAllAmenitiesAction";
import { getCurrentUserAction } from "./auth/getCurrentUserAction";
import { loginAction } from "./auth/loginAction";
import { refreshTokenAction } from "./auth/refreshTokenAction";
import { changeBookingStatusAction } from "./booking/changeBookingStatusAction";
import { createNewBookingAction } from "./booking/createNewBookingAction";
import { findBookingByIDAction } from "./booking/FindBookingByIDAction";
import { listAllBookingsAction } from "./booking/listAllBookingsAction";
import { createNewGuestAction } from "./guest/createNewGuestAction";
import { deleteGuestAction } from "./guest/deleteGuestAction";
import { findGuestByIDAction } from "./guest/findGuestByIDAction";
import { getAllGuestsAction } from "./guest/getAllGuestsAction";
import { updateGuestAction } from "./guest/updateGuestAction";

export const server = {
  refreshTokenAction,
  getCurrentUserAction,
  loginAction,
  getAllGuestsAction,
  createNewGuestAction,
  findGuestByIDAction,
  deleteGuestAction,
  updateGuestAction,
  createNewAccommodationAction,
  deleteAccommodationAction,
  findAccommodationByIDAction,
  getAllAccommodationsAction,
  updateAccommodationAction,
  createNewAmenitieAction,
  deleteAmenitieAction,
  listAllAmenitiesAction,
  findAmenitieByIdAction,
  changeBookingStatusAction,
  createNewBookingAction,
  findBookingByIDAction,
  listAllBookingsAction,
};
