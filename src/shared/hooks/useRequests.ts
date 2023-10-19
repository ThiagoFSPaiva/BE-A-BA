import axios from "axios"
import { useState } from "react"


export const useRequests = () => {
    const [loading,setLoading] = useState(false)

    const getRequest = async (url: string) => {
        setLoading(true)

        return await axios.post(url)
        .then(response => {
            setLoading(false)
            return response.data
        }).catch((erro) => {
            setLoading(false)
          alert(erro.response.data.message)
          return undefined
    
        })
    }

    const postRequest = async (url: string,body: any) => {
        setLoading(true)

        return await axios.post(url,body)
            .then(response => {
                setLoading(false)
                return response.data
            }).catch((erro) => {
                setLoading(false)
            alert(erro.response.data.message)
            return undefined
    
        })

    }

    return {
        loading,
        getRequest,
        postRequest
    }

}