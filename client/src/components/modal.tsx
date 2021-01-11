import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';

const PhotoModal: React.FC<Props> = ({ modalImg, setModalImg }) => {
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
            BackdropComponent={Backdrop}
            BackdropProps = {{
                timeout: 500
            }}
        >
            <div>
                <img src={modalImg.urls.small} />
                <h1>IMAGE</h1>
            </div>
        </Modal>
    )
}

interface Props {
    modalImg: any,
    setModalImg: any
}

export default PhotoModal
