import React,{useCallback, useState, useContext, useEffect} from "react"
import {useParams} from "react-router-dom"
import { Loader } from "../components/Loader"
import { LinkCard } from "../components/LinkCard"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const DetailPage=()=>{
    const {token} = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [link,setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async ()=>{
        try {
           const fetched = await request(`/api/link/${linkId}`,'GET',null,{
               Authorization: `Bearer ${token}`
           })
           setLink(fetched)
        } catch (e) {}
    },[token,linkId,request])

    useEffect(() => {
        getLink() 
    }, [getLink]);

    if(loading){
        return <Loader/>
    }

    return(
        <div style={{display:'flex',justifyContent:'center', paddingTop:'2rem'}}> 
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}