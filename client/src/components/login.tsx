import {FunctionComponent, Fragment, useState} from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { Email, VpnKey } from '@material-ui/icons';
import { Link } from 'react-router-dom'

// function Login() {
const Login: FunctionComponent<Props> = ({setAuthProp}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const { email, password } = inputs

    const onChange = (e:any) => {
        setInputs({ ...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const body = { email, password }
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await res.json();
            localStorage.setItem("token", parseRes.token);
            setAuthProp(true)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <Textfield 
                    type="email"
                    name="email"
                    label="EMAIL"
                    placeholder="EMAIL"
                    value = {email}
                    onChange = {e=>onChange(e)}
                    InputProps = {{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        )
                    }}/>
                <Textfield 
                    type="password"
                    name="password"
                    label="PASSWORD"
                    placeholder="PASSWORD"
                    value = {password}
                    onChange = {e=>onChange(e)}
                    InputProps = {{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKey/>
                            </InputAdornment>
                        )
                    }}/>
                <Button onClick={onSubmit}>Login</Button>
            </form>
            <Button><Link to="/register">Sign Up</Link></Button>
        </Fragment>
    )
}

interface Props extends RouteComponentProps {
    setAuthProp: (bool:Boolean) => void
}

export default Login