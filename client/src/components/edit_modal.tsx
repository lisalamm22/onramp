import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
// import Slider from '@material-ui/core/Slider'
import '../stylesheets/modal.css';
import '../stylesheets/edit_modal.css';
import { Button } from '@material-ui/core';

const DEFAULT_OPTIONS = [
    {
        name: 'BRIGHTNESS',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'CONTRAST',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'SATURATION',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'GRAYSCALE',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%'

    },
    {
        name: 'SEPIA',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%'

    },
    {
        name: 'HUE ROTATE',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: 'deg'

    },
    {
        name: 'BLUR',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20,
        },
        unit: 'px'

    },
]

const EditModal: React.FC<Props> = ({ editModalImg, setEditModalImg, 
    likes, setLikes,
    // edits, setEdits, 
}) => {
    const [options, setOptions] = useState<any>(DEFAULT_OPTIONS)
    const [likeButton, setLikeButton] = useState<any>(<Button onClick={() => {handleLike(editModalImg.id)}}>Like Button</Button>)

    useEffect(() => {
        if(likes.includes(editModalImg.id)){
            setLikeButton(<Button>Cannot Like</Button>)
        }
        // console.log("edits arr", edits)
        // edits.forEach( (edit:any) =>{
        //     if(edit.img === editModalImg.id) {
        //         setOptions(edit.options)
        //     }
        // })
    }, [])

    const handleClose = (e:any) => {
        console.log(editModalImg)
        console.log(e)
        if(e.target.classList.contains('MuiBackdrop-root')){
            setEditModalImg(null)
        }
    }

    const handleChange = (e:any, selectedIdx:number) => {
        setOptions((prevOptions:any) => {
            let newOptions = prevOptions.map((op:any, opIdx:number) => {
                if( opIdx !== selectedIdx ){
                    return op
                } else{
                    return { ...op, value: e.target.value} 
                }
            })
            console.log(newOptions)
            return newOptions
        })
    }

    const getImageEdits = () => {
        const filters = options.map( (op:any) => {
            if(op.range.max === 200){
                return `${op.property}(${op.value/op.range.max*2})`
            }
            else if( op.range.max === 100){
                return `${op.property}(${op.value/op.range.max})`
            }
            else{
                return `${op.property}(${op.value}${op.unit})`
            }
        })
        return { filter: filters.join(" ")}
    }

    async function postLike(image_id:string) {
        try{
            const body = {
                image: image_id,
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

    const handleLike = (image_id:string) => {
        postLike(image_id);
        setLikes([]);
        setLikeButton(<Button>Cannot Like</Button>)
    }

    async function postEdit(image_id:string, imagelink:string, options:any) {
        try{
            const body = {
                image: image_id,
                imagelink: imagelink,
                options: options,
            }
            await fetch('/user/edits', {
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

    const handleSaveEdits = (image_id:string, imagelink:string, options:any) => {
        postEdit(image_id, imagelink, options);
        console.log(getImageEdits())
    }



    return (
        <Modal
            open= {Boolean(editModalImg)}
            onClose={e => handleClose(e)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps = {{
                timeout: 500
            }}
        >
            <div className="photo-modal">
                <p className="edit-photo-title">{`EDIT THIS IMAGE BY ${editModalImg.user.name.toUpperCase()}`}</p>
                <Container maxWidth="lg" id="photo-modal-container">
                    <img src={editModalImg.urls.regular} className="photo-modal-img" style={getImageEdits()}/>
                </Container>
                {likeButton}
                <Button 
                    onClick={() => {handleSaveEdits(editModalImg.id, editModalImg.urls.regular, getImageEdits())}}
                >Save Edits</Button>
                <div className="filters">
                    {options.map((option:any, idx:number) =>{
                        return (
                            <div className="filter-option">
                                <input
                                    type='range' 
                                    value={option.value} 
                                    onChange={e => handleChange(e, idx)}
                                    min={option.range.min}
                                    max={option.range.max}
                                    name={option.name}
                                    className="filter-slider"
                                    
                                ></input>
                                <p className="filter-label">{option.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div> 
        </Modal>
    )
}

interface Props {
    editModalImg: any,
    setEditModalImg: any,
    likes: any,
    setLikes: any,
    // edits: string[],
    // setEdits: any,
}

export default EditModal
