import React from "react"
import { Route ,Routes, Navigate} from 'react-router-dom'
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPages"
import { AuthPage } from "./pages/AuthPages"

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="/links" exact={true} element={<LinksPage/>}/>
                <Route path="/create" exact={true} element={<CreatePage/>}/> 
                <Route path="/detail/:id" element={<DetailPage/>}/> 
                <Route path="*" element={<CreatePage/>}/> 
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/" exact={true} element={<AuthPage/>}/>  
            <Route path="*" element={<CreatePage/>}/> 
        </Routes>
    )
}