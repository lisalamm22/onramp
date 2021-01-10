import React, { useState, useEffect } from 'react';
// import UnsplashImage from './unsplash_image'
import axios from 'axios';
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';

const Unsplash: React.FC = () => {
    const [images, setImages] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        setLoading(true)
        const unsplashAPI = "https://api.unsplash.com"
        // const accessKey = process.env.UNSPLASH_ACCESS_KEY
        axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
            .then((res:any) => setImages([...images, ...res.data]))
            .then((res:any) => console.log(res))
        console.log(images)
        setLoading(false)
    }, [])

    if(loading) return <CircularProgress size={100}/>

    const getImages = () => {
        return (
            <GridList cellHeight={250} cols={3} >
                {images.map((image:any) => {
                    return <GridListTile key={image.id}
                                style={{ flexGrow: 1 }}
                                cols = {(image.width/5000)}>
                        <img 
                            srcSet={`${image.urls.regular}?w=161&fit=crop&auto=format 1x, 
                                ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            alt={image.description || image.alt_description}
                        />
                    </GridListTile>
                })}
            </GridList>
        )
    }
    return (
        <Container maxWidth="lg">
            {getImages()}
        </Container>
    )
}

export default Unsplash