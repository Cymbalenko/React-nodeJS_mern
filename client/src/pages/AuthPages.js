import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => { 
    const auth = useContext(AuthContext);
    const {loading, error, request,clearError} = useHttp()
    const message = useMessage()

    const [form,setForm] = useState({
        email:'',
        password:''
    })
    useEffect(() => {
         message(error)
         clearError()
    }, [error,message,clearError])
    const changeHandler = event => {
        setForm({...form,[event.target.name]:event.target.value})
    }

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const registerHandler = async() => {
        try {
            const data = await request('/api/auth/register','POST',{...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async() => {
        try {
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
        } catch (e) {}
    }


    return(
        <div className="row"> 
        <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card blue-grey darken-1">
                <div className="card-content while-text">
                    <span className="card-title">Авторизация</span>
                    <div>
                        <div className="input-field">
                            <input placeholder="Введите email" 
                            id="email" type="text" name="email"
                             onChange={changeHandler} value={form.email}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Введите password"
                             id="password" name="password" type="password"
                              onChange={changeHandler} value={form.password} />
                            <label htmlFor="password">password</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4" style={{marginRight:10}} disabled={loading} onClick={loginHandler}>Войти</button>
                    <button className="btn grey lighten-1 black-text" disabled={loading} onClick={registerHandler}>Регистрация</button>
                </div>
            </div>
        </div>
        </div>
    )
}