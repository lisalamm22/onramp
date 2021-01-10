import {FunctionComponent,Fragment, useState} from 'react';
import {RouteComponentProps} from 'react-router';
import Textfield from '@material-ui/core/TextField';
import { Button, InputAdornment } from '@material-ui/core';
import { Person, Email, VpnKey } from '@material-ui/icons';

const Register: FunctionComponent<Props> = ({ setAuthProp }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username: "",
    })

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
        <Fragment>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
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
                {/* <button>Submit</button> */}
            </form>
        </Fragment>
    )
}

interface Props extends RouteComponentProps {
    setAuthProp: (bool: Boolean) => void
}

export default Register;