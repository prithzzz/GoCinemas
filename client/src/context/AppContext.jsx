import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({ children })=>{

    const [shows, setShows] = useState([])

    const fetchShows = async () => {
        try{
            const { data } = await axios.get('/api/show/all')
            if(data.success){
                setShows(data.shows)
            }
            else{
                toast.error(error)
            }
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchShows()
    }, [])

    const value = {axios, shows}

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)