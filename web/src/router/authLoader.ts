import {getMe} from "../api/authApi.ts";
import {store} from "../store/store.ts";
import {clearUser, setUser} from "../store/authSlice.ts";

export const authLoader = async () => {
  const user = await getMe();
  if (user === null) {
    store.dispatch(clearUser());
    return null;
  }

  store.dispatch(setUser(user));
  return user;
};