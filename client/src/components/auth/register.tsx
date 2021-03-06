import {FunctionComponent, useState, useEffect} from 'react';
import axios from 'axios';
import {RouteComponentProps} from 'react-router';
import Textfield from '@material-ui/core/TextField';
import { Button, Container, InputAdornment } from '@material-ui/core';
import { Person, Email, VpnKey } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import '../../stylesheets/login.css'

const Register: FunctionComponent<Props> = ({ setAuthProp }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [bgImg, setBGImg] = useState<any>(null)

    useEffect(() => {
        fetchBGImage();
    }, [])

    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const fetchBGImage = async () => {
        const res = await axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=1 `)
        const fetchedImage = await res.data[0];
        setBGImg(fetchedImage)
    }

    const { email, password, username } = inputs

    const onChange = (e:any) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const body = { email, password, name: username}
            const res = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await res.json();
            localStorage.setItem("token", parseRes.token)
            setAuthProp(true)
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <Container className="signup-page">
            <div className="user-form-container">
                <h1>PHOTOGAL</h1>
                <form onSubmit={onSubmit} className="user-form">
                    <Textfield 
                        type="email" 
                        name="email" 
                        label="EMAIL" 
                        placeholder="EMAIL" 
                        value={email} 
                        onChange={e=>onChange(e)}
                        InputProps = {{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        )}}/>
                    <Textfield type="password" 
                        name="password" 
                        label="PASSWORD" 
                        placeholder="PASSWORD" 
                        value={password}
                        onChange={e=>onChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKey/>
                                </InputAdornment>
                            )
                        }}/>
                    <Textfield 
                        type="text" 
                        name="username" 
                        label="USERNAME" 
                        placeholder="USERNAME" 
                        value={username}
                        onChange={e=>onChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person/>
                                </InputAdornment>
                            )
                        }}/>
                    <Button onClick={onSubmit}>Submit</Button>
                </form>
                <Button><Link to="/login">Sign In</Link></Button> 
            </div> 
            {bgImg ?
                <div className="user-form-img">
                <img 
                    src={bgImg.urls.regular} 
                    alt={bgImg.description || bgImg.alt_description}
                    
                /> </div> 
                : null}
        </Container>
    )
}

interface Props extends RouteComponentProps {
    setAuthProp: (bool: Boolean) => void
}

export default Register;