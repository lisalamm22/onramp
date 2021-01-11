import { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Unsplash  from './gallery';
import Button from '@material-ui/core/Button';

const Home: FunctionComponent<Props> = ({setAuthProp}) => {
    const [username, setUserame] = useState("")

    async function getUsername() {
        try {
            const res = await fetch("/user/dash", {
                method: 'GET',
                headers: { token: localStorage.token}
            })
            const parseRes = await res.json()
            setUserame(parseRes.user_name)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getUsername()
    }, [])
    
    const logout = (e:any) => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuthProp(false)
    }

    return(
        <Fragment>
            <h1>Welcome back, {username}</h1>
            <Button onClick={e => logout(e)}>Logout</Button>
            <div>
                <Unsplash />
            </div>
        </Fragment>
    )
}

interface Props extends RouteComponentProps{
    setAuthProp: (bool:Boolean) => void
}

export default Home