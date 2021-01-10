import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Search from './search'
import InfiniteScroll from 'react-infinite-scroll-component';

const Gallery: React.FC = () => {
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [search, setSearch] = useState<String>('');
    
    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    useEffect(() => {
        fetchImages();
    }, [])
    
    const fetchImages = () => {
        setLoading(true)
        axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
            .then((res:any) => setImages([...images, ...res.data]))
            .then((res:any) => console.log(res))
        console.log(images)
        setLoading(false)
    }
    
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
    
    const handleSearchInput = (e:any) => {
        setSearch(e.target.value);
    }
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(search !== ''){
            setLoading(true)
            const res = await axios
                .get(`${unsplashAPI}/search/photos?page=1&query=${search}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
            const searchRes = res.data.results
            setImages(searchRes)
            setLoading(false)
        }
    }

    if(loading) return <CircularProgress size={100}/>
    
    return (
        <InfiniteScroll 
            dataLength = {images.length}
            next = {fetchImages}
            hasMore = {true}
            loader = {<LinearProgress />} >
            <Container maxWidth="lg">
                <Search handleSearch={handleSearchInput} handleSubmit={handleSubmit}/>
                {getImages()}
            </Container>
        </InfiniteScroll>
    )
}

export default Gallery