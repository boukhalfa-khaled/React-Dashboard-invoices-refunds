import React, { createContext, ReactNode, useState } from "react";

const AuthContext = createContext<{ auth: any; setAuth: React.Dispatch<React.SetStateAction<any>> }>({
    auth: {},
    setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<any>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

