// import axios from 'axios';
// import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { useParams } from 'react-router-dom';
// import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
import '../stylesheets/photo.css';

const Photo: React.FC<Props> = ({open, handleClose, photo}) => {
    // const params = useParams();
    // const photoId = params['id'];
    // const [photoURL, setPhotoURL] = useState<string>('')
    // const [photoTitle, setPhotoTitle] = useState<string>('')
    // const [photoLikes, setPhotoLikes] = useState<number>(0)
    
    // let photo:any;

    // useEffect(() => {
    //     fetchImage();
    // }, [])



    // const unsplashAPI = "https://api.unsplash.com"

    // const fetchImage = async () => {
    //     const photo = await axios
    //         .get(`${unsplashAPI}/photos/${photoId}?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY`)
    //     console.log(photo)
    //     setPhotoURL(photo.data.urls.regular)
    //     setPhotoTitle(photo.data.description || photo.data.alt_description)
    //     setPhotoLikes(photo.data.likes)
    //     console.log(photoURL)
    // }


    return (
        // <Container maxWidth="lg" className ="photo-page">
        <Modal 
            open = {open}
            onClose = {handleClose} 
            // BackdropComponent = {Backdrop} 
            // BackdropProps = {{
            //     timeout: 500,
            // }}  
        >
            <div>
                <img className="photo-pg-img" src={photo.urls.regular}/>
                <h3>{photo.description}</h3>
                <h3>{`${photo.likes} Likes`}</h3>
            </div>
        </Modal>    
        // </Container>
    )
}

interface Props extends RouteComponentProps{
    open: boolean,
    handleClose: () => void,
    // photoId: string
    photo: any
}

export default withRouter(Photo)