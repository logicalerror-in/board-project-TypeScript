import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {Link, Outlet, useNavigate} from "react-router";
import {logout} from "./api/authApi.ts";
import {clearUser} from "./store/authSlice.ts";

export const App = () => {
  const user = useAppSelector(
    (state) => state.auth.user,
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/posts">
            게시글
          </Link>

          {user === null ? (
            <Link to="/login">
              로그인
            </Link>
          ) : (
            <>
              <span>
                {user.id}
              </span>

              <button
                type="button"
                onClick={() => {
                  void handleLogout();
                }}
              >
                로그아웃
              </button>
            </>
          )}
        </nav>
      </header>

      <Outlet />
    </>
  );
};