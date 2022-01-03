import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { _getAccessToken, _setAccessToken, api } from "../api/api";
import { UserInfoResponse } from "../interface/interface";

interface SessionContextProps {
  signin: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  userInfo: UserInfoResponse | null;
}
const defaultValue: SessionContextProps = {
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
  userInfo: null,
};
const SessionContext = createContext<SessionContextProps>(defaultValue);

export const SessionProvider: FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  useEffect(() => {
    const doIt = async () => {
      try {
        const token = _getAccessToken();
        if (token) {
          const newUserInfo = await api.getMyProfile();
          setUserInfo(newUserInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };
    doIt().then();
  }, []);
  const signin = useCallback(async (email: string, password: string) => {
    const token = await api._signin(email, password);
    console.log(token);
    _setAccessToken(token);
    const userInfo = await api.getMyProfile();
    setUserInfo(userInfo);
  }, []);
  const signup = useCallback(
    async (username: string, email: string, password: string) => {
      const { token, userInfo } = await api._signup(username, email, password);
      _setAccessToken(token);
      setUserInfo(userInfo);
    },
    []
  );
  const signout = useCallback(async () => {
    _setAccessToken(null);
    setUserInfo(null);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        signin,
        signup,
        signout,
        userInfo,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
