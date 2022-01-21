import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { useSessionContext } from "../../contexts/SessionContext";
import { toast } from "react-toastify";
import dummyProfile from "../../icons/dummyProfile.svg";

type NavBarProps = {
  noLeftBarPage: Array<string>;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const NavBar: React.FC<NavBarProps> = () => {
  const { signout, userInfo } = useSessionContext();
  const navigate = useNavigate();
  const onSignoutButton = useCallback(() => {
    const doIt = async () => {
      try {
        await signout();
      } catch (e) {
        console.error(e);
      }
      toast.info("signed out");
    };
    doIt().then();
  }, [signout]);
  const query = useQuery();
  const initialSearch = useMemo(() => query.get("q"), [query]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    []
  );
  const onSearchEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const params = new URLSearchParams({ q: search });
        navigate("/questions?" + params.toString());
      }
    },
    [navigate, search]
  );

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              className={styles.logoImage}
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt={"logo"}
            />
            <label>
              waffle <strong>overflow</strong>
            </label>
          </Link>
        </div>
        <ul className={styles.menuList}>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
        <input
          className={styles.searchBox}
          onChange={onSearchChange}
          onKeyPress={onSearchEnter}
          value={search}
        />
        {!userInfo ? (
          <div className={styles.buttonList}>
            <Link
              className={`${styles.navBarButton} ${styles.loginButton}`}
              to="/login"
            >
              Log in
            </Link>
            <Link
              className={`${styles.navBarButton} ${styles.signupButton}`}
              to="/register"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className={styles.buttonList}>
            <Link
              to={"/mypage?tab=profile"}
              className={styles.profileContainer}
            >
              <img
                className={styles.profile}
                alt={"profile"}
                src={userInfo.image || dummyProfile}
              />
            </Link>
            <button
              className={`${styles.navBarButton} ${styles.signoutButton}`}
              onClick={onSignoutButton}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
