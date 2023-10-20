import { createContext, useState, useContext, useEffect } from "react";
import { getAuthorizationToken, setAuthorizationToken } from "../functions/connection/auth";
import { UserType } from "../../modules/login/types/UserType";



interface GlobalData {
    user?: UserType;
}

interface GlobalContextProps {
    globalData: GlobalData;
    setGlobalData: (data: GlobalData) => void;
}


const GlobalContext =  createContext({} as GlobalContextProps)

interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [globalData,setGlobalData] = useState({});

    return (
        <GlobalContext.Provider value={{globalData,setGlobalData}}>
            {children}
        </GlobalContext.Provider>
    )

};

export const userGlobalContext = () => {
    const {globalData,setGlobalData} = useContext(GlobalContext);

    const setUser = (user: UserType) => {
        setGlobalData({
            ...globalData,
            user,
        })
    }

    return {
        user: globalData?.user,
        setUser,
    }
}
