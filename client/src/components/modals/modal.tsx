import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import '../../stylesheets/modal.css';
import { Button } from '@material-ui/core';
import { Edit, CloudDownload } from '@material-ui/icons';
import LikeButton from '../like_button';


const PhotoModal: React.FC<Props> = ({ modalImg, setModalImg, setEditModalImg, likes, setLikes}) => {

    const handleClose = (e:any) => {
        if(e.target.classList.contains('MuiBackdrop-root')){
            setModalImg(null)
        }
    }

    return (
        <Modal
            open= {Boolean(modalImg)}
            onClose={e => handleClose(e)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps = {{
                timeout: 500
            }}
        >
            <Fade in={Boolean(modalImg)}>
            <div className="photo-modal">
                <header className="photo-modal-header">
                    <img src={modalImg.user.profile_image.small} className="profile-pic"/>
                    <div className="photo-modal-header-profile">
                        <p className="profile">{`${modalImg.user.name}`}</p> 
                        <p>{modalImg.location ? (modalImg.location.name ? `${modalImg.location.name}` : '') : ''}</p> 
                    </div>
                </header>
                <Container maxWidth="lg" id="photo-modal-container">
                    <img src={modalImg.urls.regular} className="photo-modal-img"/>
                </Container>
                <div className="photo-modal-section">
                    <nav className="options-nav">
                        <LikeButton image={modalImg} likes={likes} setLikes={setLikes}/>
                        <Button><CloudDownload/>{` ${modalImg.downloads}`}</Button> 
                        <Button onClick={()=>{
                            setEditModalImg(modalImg)
                            setModalImg(null)
                        }}>
                        <Edit/>Edit</Button>
                    </nav>
                    <div className="photo-modal-description">
                        <p className="bold">{modalImg.description ? `${modalImg.description.toUpperCase()}` : ''}</p> 
                        <p>{modalImg.alt_description ? `${modalImg.alt_description.toUpperCase()}` : ''}</p> 
                    </div>
                </div>
            </div>
            </Fade>
        </Modal>
    )
}

interface Props {
    modalImg: any,
    setModalImg: any,
    setEditModalImg: any,
    likes: any,
    setLikes: any,
}

export default PhotoModal
