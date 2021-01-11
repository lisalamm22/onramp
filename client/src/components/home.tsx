import { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Gallery  from './gallery';
import Button from '@material-ui/core/Button';
import PhotoModal from './modal';

const Home: FunctionComponent<Props> = ({setAuthProp}) => {
    const [username, setUserame] = useState("");
    const [modalImg, setModalImg] = useState<any>(null)

    useEffect(() => {
        console.log(modalImg)
    }, [modalImg])

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
            <h3>WELCOME BACK, {username.toUpperCase()}</h3>
            <Button onClick={e => logout(e)}>Logout</Button>
            <div>
                <Gallery setModalImg={setModalImg}/>
                {modalImg && <PhotoModal modalImg={modalImg} setModalImg={setModalImg}/>}
            </div>
        </Fragment>
    )
}

interface Props extends RouteComponentProps{
    setAuthProp: (bool:Boolean) => void
}

export default Home