import {FunctionComponent, Fragment, useState} from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '@material-ui/core/Button';
import { InputAdornment, Textfield } from '@material-ui/core';
import { Email, VpnKey } from '@material-ui/icons';

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
            console.log(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <h1>Sign In</h1>
            <form action="">
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
            </form>
            <Button onClick={()=>setAuthProp(true)}>Login</Button>
        </Fragment>
    )
}

interface Props extends RouteComponentProps {
    setAuthProp: (bool:Boolean) => void
}

export default Login