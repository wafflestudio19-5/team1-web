import { createContext, FC, useContext, useEffect, useState } from "react";
import { dummyApi, getCurrentUser } from "../api/dummyApi";

interface SessionContextProps {
  isAuthorized: boolean | null;
}
const defaultValue = { isAuthorized: null };
const SessionContext = createContext<SessionContextProps>(defaultValue);

export const SessionProvider: FC = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);
  useEffect(() => {
    setAuthorized(!!getCurrentUser());
  }, []);
  return (
    <SessionContext.Provider value={{ isAuthorized: isAuthorized }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
