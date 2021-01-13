import React, {Fragment} from 'react';
// import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import { Container } from '@material-ui/core';


const EditsPage: React.FC<Props> = ({edits, setEdits}) => {
    // const [editedImgs, setEditedImgs] = useState<any>([])

    // const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    // const fetchEditImg = async (editImgId:string) => {
    //     const res = await axios
    //         .get(`${unsplashAPI}/photos/${editImgId}?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY`)
    //     const fetchedEditImg = await res.data
    //     setEditedImgs([...editedImgs, fetchedEditImg])
    //     console.log("fetch call edit imgs",editedImgs)
    // }

    // useEffect(() => {
    //     if(edits.length){
    //         edits.forEach( (edit:any, idx:number) => {
    //             console.log(edit.image)
    //             fetchEditImg(edit.image)
    //         //     const obj = {
    //         //         image: edit.image,
    //         //         options: edit.options, 
    //         //         imgData: imgData,
    //         //     }
    //         //     setEditedImgs(editedImgs.splice(idx, 1, obj))
    //         })
    //     }
    //     console.log("use effect edited images", editedImgs)
    // }, [edits])
    // console.log("options", JSON.parse(edits[0].options))


    return (
        <Fragment>
            <GridList cellHeight={250} cols={3} spacing={15}>
                {edits.map( (editImg:any, idx:number) => {
                    return (
                        <GridListTile
                            key={idx}
                            style={{ flexGrow : 1 }}
                            cols={ Math.random() + .5 }
                            // cols = {( editImg.imgData.width/5000 )}
                        >
                            <img srcSet={`${editImg.imagelink}?w=161&fit=crop&auto=format 1x, 
                                ${editImg.imagelink}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                style={JSON.parse(editImg.options)}
                                // alt={editImg.description || editImg.alt_description}
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
        </Fragment>
    )
}

interface Props {
    edits: any,
    setEdits: any,
}

export default EditsPage
