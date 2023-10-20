import { createContext, useState, useContext, useEffect } from "react";
import { TemplateType } from "../../modules/template/types/TemplateType";



interface DataContext {
    template?: TemplateType[];
}

interface DataContextProps {
    data: DataContext;
    setData: (data: DataContext) => void;
}


const DataContext =  createContext({} as DataContextProps)

interface DataProviderProps {
    children: React.ReactNode;
}

export const DataProvider = ({children}: DataProviderProps) => {

    const [data,setData] = useState<DataContext>({});

    return (
        <DataContext.Provider value={{data,setData}}>
            {children}
        </DataContext.Provider>
    )

};

export const userDataContext = () => {
    const {data,setData} = useContext(DataContext);

    const setTemplate = (template: TemplateType[]) => {
        setData({
            ...data,
            template,
        })
    }

    return {
        template: data?.template || [],
        setTemplate,
    }
}
