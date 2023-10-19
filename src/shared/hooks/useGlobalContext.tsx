import { createContext, useState, useContext } from "react";

interface GlobalData {
    accessToken?: string;
}

interface GlobalContextProps {
    globalData: GlobalData;
    setGlobalData: (GlobalData: GlobalData) => void;
    
}
const GlobalContext =  createContext({} as GlobalContextProps)


interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [globalData, setGlobalData] = useState<GlobalData>({});

    return (
        <GlobalContext.Provider value={{globalData,setGlobalData}}>
            {children}
        </GlobalContext.Provider>
    )

}

 export const useGlobalContext = () => {
    const {globalData, setGlobalData} = useContext(GlobalContext);

    const setAccessToken  = (accessToken: string) => {
        setGlobalData({
            ...globalData,
            accessToken: accessToken,
        })
    }

    return {
        accessToken: globalData.accessToken,
        setAccessToken
    }
 }