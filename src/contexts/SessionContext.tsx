import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { _getAccessToken, _setAccessToken, api } from "../api/api";

interface SessionContextProps {
  isAuthorized: boolean | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  userId: number | null;
}
const defaultValue: SessionContextProps = {
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
  isAuthorized: null,
  userId: null,
};
const SessionContext = createContext<SessionContextProps>(defaultValue);

export const SessionProvider: FC = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const doIt = async () => {
      try {
        const token = _getAccessToken();
        if (token) setUserId((await api.getMyProfile()).id);
      } catch (e) {
        console.log(e);
      }
    };
    doIt().then();
  }, []);
  const signin = useCallback(async (email: string, password: string) => {
    try {
      const { token, userInfo } = await api._signin(email, password);
      _setAccessToken(token);
      setUserId(userInfo.id);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const signup = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const { token, userInfo } = await api._signup(
          username,
          email,
          password
        );
        _setAccessToken(token);
        setUserId(userInfo.id);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );
  const signout = useCallback(async () => {
    _setAccessToken(null);
    setUserId(null);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isAuthorized: userId === null ? null : !!userId,
        userId,
        signin,
        signup,
        signout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
