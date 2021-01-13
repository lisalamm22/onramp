import React, {useState, useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import '../stylesheets/modal.css';
import { Button } from '@material-ui/core';

const PhotoModal: React.FC<Props> = ({ modalImg, setModalImg, setEditModalImg, likes, setLikes}) => {
    const [likeButton, setLikeButton] = useState<any>(<Button onClick={() => {handleLike(modalImg.id, modalImg.urls.regular)}}>Like Button</Button>)

    useEffect(() => {
        const likedImgs = likes.map((like:any) =>{
            return like.image
        })
        // console.log("likedimgs",likedImgs)
        if(likedImgs.includes(modalImg.id)){
            setLikeButton(<Button>Cannot Like</Button>)
        }
    }, [])
    const handleClose = (e:any) => {
        if(e.target.classList.contains('MuiBackdrop-root')){
            setModalImg(null)
        }
    }

    async function postLike(image_id:string, imagelink:string) {
        try{
            const body = {
                image: image_id,
                imagelink: imagelink
            }
            await fetch('/user/likes', {
                method: 'POST',
                headers: { 
                    token: localStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
        } catch(error){
            console.error(error.message)
        }
    }

    const handleLike = (image_id:string, imagelink:string) => {
        console.log(likes)
        postLike(image_id, imagelink);
        setLikes(null);
        setLikeButton(<Button>Cannot Like</Button>)
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
                        {likeButton}
                        <p>{`${modalImg.likes}`}</p> 
                        <p>{`${modalImg.downloads} Downloads`}</p> 
                        <Button onClick={()=>{
                            setEditModalImg(modalImg)
                            setModalImg(null)
                        }}>
                        Edit</Button>
                    </nav>
                    <div className="photo-modal-description">
                        <p className="bold">{modalImg.description ? `${modalImg.description.toUpperCase()}` : ''}</p> 
                        <p>{modalImg.alt_description ? `${modalImg.alt_description.toUpperCase()}` : ''}</p> 
                    </div>
                </div>
            </div>
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
