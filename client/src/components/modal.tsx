import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import '../stylesheets/modal.css';
import { Button } from '@material-ui/core';

const PhotoModal: React.FC<Props> = ({ modalImg, setModalImg, setEditModalImg}) => {
    const handleClose = (e:any) => {
        console.log(modalImg)
        console.log(e)
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
            <div className="photo-modal">
                <header className="photo-modal-header">
                    <p className="profile">
                        <img src={modalImg.user.profile_image.small} className="profile-pic"/>
                        {`${modalImg.user.name}`}
                    </p> 
                    <p>{modalImg.location ? (modalImg.location.name ? `Location: ${modalImg.location.name}` : '') : ''}</p> 
                </header>
                <Container maxWidth="lg" id="photo-modal-container">
                    <img src={modalImg.urls.regular} className="photo-modal-img"/>
                </Container>

                <nav className="options-nav">
                    <p>{`${modalImg.likes} Likes`}</p> 
                    <p>{`${modalImg.downloads} Downloads`}</p> 
                    <Button onClick={()=>{
                        setEditModalImg(modalImg)
                        setModalImg(null)
                    }}>
                    Edit</Button>
                </nav>

                <p>{modalImg.description ? `Title: ${modalImg.description}` : ''}</p> 
                <p>{modalImg.alt_description ? `${modalImg.alt_description}` : ''}</p> 
            </div>
        </Modal>
    )
}

interface Props {
    modalImg: any,
    setModalImg: any,
    setEditModalImg: any,
}

export default PhotoModal
