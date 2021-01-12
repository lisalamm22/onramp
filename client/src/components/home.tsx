import { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Gallery  from './gallery';
import Button from '@material-ui/core/Button';
import PhotoModal from './modal';
import EditModal from './edit_modal';

const Home: FunctionComponent<Props> = ({setAuthProp}) => {
    const [username, setUserame] = useState("");
    const [likes, setLikes] = useState<string[]>([])
    const [edits, setEdits] = useState<any>([])
    const [modalImg, setModalImg] = useState<any>(null)
    const [editModalImg, setEditModalImg] = useState<any>(null)

    async function getUsername() {
        try {
            const res = await fetch("/user/dash", {
                method: 'GET',
                headers: { token: localStorage.token},
            })
            const parseRes = await res.json()
            setUserame(parseRes.user_name)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function getUserLikes() {
        try{
            const res = await fetch("/user/likes", {
                method: 'GET',
                headers: { token: localStorage.token },
            })
            const parseRes = await res.json()
            const likesArr =parseRes.images.map( (imgObj:any) => {
                return imgObj.image
            })
            setLikes(likesArr)
        } catch (error){
            console.error(error.message)
        }
    }

    async function getUserEdits() {
        try{
            const res = await fetch("/user/edits", {
                method: 'GET',
                headers: { token: localStorage.token },
            })
            const parseRes = await res.json()
            console.log(parseRes)
            setEdits(parseRes)
        } catch (error){
            console.error(error.message)
        }
    }
    
    useEffect( () => {
        getUsername()
        getUserLikes()
        getUserEdits()
    }, [])

    useEffect( () => {
        if(likes.length === 0){
            getUserLikes()
            console.log("got user likes")
        }
    }, [likes])

    useEffect( () => {
        if(edits.length === 0){
            getUserEdits()
            console.log("got user edits")
        }
    }, [edits])
    
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
                <Gallery setModalImg={setModalImg} />
                {modalImg && <PhotoModal 
                    modalImg={modalImg} 
                    setModalImg={setModalImg} 
                    setEditModalImg={setEditModalImg} 
                    likes={likes} 
                    setLikes={setLikes}
                />}
                {editModalImg && <EditModal 
                    editModalImg={editModalImg} 
                    setEditModalImg={setEditModalImg} 
                    likes={likes} 
                    setLikes={setLikes}
                    // edits={edits}
                    // setEdits={setEdits}
                />}
            </div>
        </Fragment>
    )
}

interface Props extends RouteComponentProps{
    setAuthProp: (bool:Boolean) => void
}

export default Home