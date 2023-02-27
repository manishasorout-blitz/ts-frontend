import React, { createContext, PropsWithChildren } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
}
export const Authcontext = createContext<AuthContextProps>({
  isAuthenticated: false,
});

export const AuthProvider: React.FC = (props: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const { children } = props;

  return (
    <Authcontext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
