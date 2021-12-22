import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AccessToken, _getCurrentUser, _setCurrentUser } from "../api/dummyApi";

interface SessionContextProps {
  isAuthorized: boolean | null;
  setToken: (token: AccessToken | null) => void;
}
const defaultValue = { isAuthorized: null, setToken: () => {} };
const SessionContext = createContext<SessionContextProps>(defaultValue);

export const SessionProvider: FC = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);
  useEffect(() => {
    setAuthorized(!!_getCurrentUser());
  }, []);
  const setToken = useCallback((token: AccessToken | null) => {
    _setCurrentUser(token);
    setAuthorized(!!token);
  }, []);

  return (
    <SessionContext.Provider value={{ isAuthorized: isAuthorized, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
