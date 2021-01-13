import { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Gallery  from './gallery';
import PhotoModal from './modal';
import EditModal from './edit_modal';
import Navbar from './navbar';

const Home: FunctionComponent<Props> = ({setAuthProp}) => {
    const [username, setUserame] = useState("");
    const [likes, setLikes] = useState<any>([])
    const [edits, setEdits] = useState<any>([])
    const [modalImg, setModalImg] = useState<string|null>(null)
    const [editModalImg, setEditModalImg] = useState<string|null>(null)

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
            const likesArr =parseRes.images
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
            console.log("parseRes",parseRes)
            setEdits(parseRes.edits)
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
        if(!likes){
            getUserLikes()
            console.log("got user likes")
        }
    }, [likes])
    
    return(
        <Fragment>
            <Navbar username={username} setAuthProp={setAuthProp}></Navbar>
            <div>
                <Gallery 
                    setModalImg={setModalImg}
                    edits={edits}
                    setEdits={setEdits}
                    likes={likes}
                    setLikes={setLikes}
                />
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
                />}
            </div>
        </Fragment>
    )
}

interface Props extends RouteComponentProps{
    setAuthProp: (bool:Boolean) => void
}

export default Home