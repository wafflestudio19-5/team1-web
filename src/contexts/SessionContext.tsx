import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { _getAccessToken, _setAccessToken, api } from "../api/api";
import { customizedImageLink, UserInfoResponse } from "../interface/interface";

interface SessionContextProps {
  signin: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  refreshMyProfile: () => Promise<void>;
  userInfo?: UserInfoResponse | null;
}
const defaultValue: SessionContextProps = {
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
  refreshMyProfile: async () => {},
  userInfo: null,
};
const SessionContext = createContext<SessionContextProps>(defaultValue);

export const SessionProvider: FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null | undefined>(
    undefined
  );
  useEffect(() => {
    const doIt = async () => {
      const token = _getAccessToken();
      if (token) {
        try {
          const newUserInfo = await api._getMyProfile();

          newUserInfo.image = customizedImageLink(newUserInfo.image);
          setUserInfo(newUserInfo);
        } catch (e) {
          _setAccessToken(null);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
    };
    doIt().then();
  }, []);
  const signin = useCallback(async (email: string, password: string) => {
    try {
      const token = await api._signin(email, password);
      _setAccessToken(token);
      const userInfo = await api._getMyProfile();
      userInfo.image = customizedImageLink(userInfo.image);
      setUserInfo(userInfo);
    } catch (e) {
      _setAccessToken(null);
      setUserInfo(null);
      throw e;
    }
  }, []);
  const signup = useCallback(
    async (username: string, email: string, password: string) => {
      const { token, userInfo } = await api._signup(username, email, password);
      userInfo.image = customizedImageLink(userInfo.image);
      _setAccessToken(token);
      setUserInfo(userInfo);
    },
    []
  );
  const signout = useCallback(async () => {
    try {
      await api._signout();
    } finally {
      _setAccessToken(null);
      setUserInfo(null);
    }
  }, []);
  const refreshMyProfile = useCallback(async () => {
    try {
      const newUserInfo = await api._getMyProfile();
      newUserInfo.image = customizedImageLink(newUserInfo.image);
      setUserInfo(newUserInfo);
    } catch (e) {
      _setAccessToken(null);
      setUserInfo(null);
      throw e;
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        signin,
        signup,
        signout,
        refreshMyProfile,
        userInfo,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
