import React,{useState,useContext,useCallback,useEffect} from "react"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { LinksList } from "../components/LinksList"
import { useHttp } from "../hooks/http.hook"

export const LinksPage=()=>{
    const [links,setLinks] = useState([])
    const {loading,request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchLinks = useCallback(async () =>{
        try { 
            const feched = await request('/api/link','GET',null,{
                Authorization: `Bearer ${token}`
            })
            setLinks(feched)
        } catch (e) { }
        },[token,request]
        )
    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])
    
    if(loading){
        return <Loader/>
    }
    return(
        <>
            {!loading && <LinksList links = {links}/>}
        </>
    )
}