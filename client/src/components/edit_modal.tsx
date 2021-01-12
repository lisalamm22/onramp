import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
// import Slider from '@material-ui/core/Slider'
import '../stylesheets/modal.css';
import '../stylesheets/edit_modal.css';

const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%'

    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%'

    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%'

    },
    {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: 'deg'

    },
    // {
    //     name: 'Blur',
    //     property: 'blur',
    //     value: 0,
    //     range: {
    //         min: 0,
    //         max: 20,
    //     },
    //     unit: 'px'

    // },
]

const EditModal: React.FC<Props> = ({ editModalImg, setEditModalImg }) => {
    const [options, setOptions] = useState<any>(DEFAULT_OPTIONS)

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

    console.log(getImageEdits())

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
                <h1>Edit</h1>
                <Container maxWidth="lg" id="photo-modal-container">
                    <img src={editModalImg.urls.regular} className="photo-modal-img" style={getImageEdits()}/>
                </Container>
                <div className="filters">
                    {/* <Slider value = {0} /> */}
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
    setEditModalImg: any
}

export default EditModal
