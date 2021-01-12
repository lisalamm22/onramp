import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../stylesheets/gallery.css'
import { LinearProgress } from '@material-ui/core';

const RandomPage: React.FC<Props> = ({setModalImg}) => {
    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        fetchImages();
    }, [])

    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const fetchImages = async () => {
        // setSearchInput('')
        // setIsSearching(false)
        // setSearchPage(1)
        const res = await axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
        const fetchedImages = await res.data;
        setImages([...images, ...fetchedImages])
    }

    return (
        <InfiniteScroll
            dataLength = {images.length}
            next = {fetchImages}
            hasMore = {true}
            loader={<LinearProgress/>}
        >
            <GridList cellHeight={250} cols={3} spacing={15} >
                {images.map((image:any,idx:number) => {
                    return (
                        <GridListTile key={idx}
                        style={{ flexGrow: 1 }}
                        cols = {(image.width/5000)}
                        className='gallery-tile'
                        onClick= {() => setModalImg(image)}>
                            <img 
                                srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
                                ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                src={`${image.urls.thumb}`}
                                alt={image.description || image.alt_description}
                                />
                    </GridListTile>
                )})}
            </GridList>
        </InfiniteScroll>
    )
}

interface Props{
    setModalImg: any,
    // images: any,
    // setImages: any
}

export default RandomPage