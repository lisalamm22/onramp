import React, {Fragment, useState, useEffect } from 'react';
// import UnsplashImage from './unsplash_image'
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const Unsplash: React.FC = () => {
    const [images, setImages] = useState<any>([])

    useEffect(() => {
        const unsplashAPI = "https://api.unsplash.com"
        // const accessKey = process.env.UNSPLASH_ACCESS_KEY
        axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
            .then((res:any) => setImages([...images, ...res.data]))
            .then((res:any) => console.log(res))
        console.log(images)
    }, [])
    return (
        <Fragment>
            {/* {images.map( (image:any) => {
                return <UnsplashImage key={image.id} image={image}/>
            })} */}
            <GridList cellHeight={160} cols={4} >
                {images.map((image:any) => {
                    return <GridListTile key={image.id}>
                        <img 
                            srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
                                ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
                        />
                    </GridListTile>
                })}
            </GridList>
        </Fragment>
    )
}

export default Unsplash