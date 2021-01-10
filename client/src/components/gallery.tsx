import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Search from './search'
import InfiniteScroll from 'react-infinite-scroll-component';

const Gallery: React.FC = () => {
    const [images, setImages] = useState<any>([]);
    // const [loading, setLoading] = useState<Boolean>(true);
    const [searchInput, setSearchInput] = useState<String>('')
    const [isSearching, setIsSearching] = useState<Boolean>(false)
    const [searchPage, setSearchPage] = useState<number>(1)

    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    useEffect(() => {
        fetchImages();
    }, [])
    
    const fetchImages = () => {
        // setLoading(true)
        setSearchInput('')
        setIsSearching(false)
        setSearchPage(1)
        axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
            .then((res:any) => setImages([...images, ...res.data]))
        // setLoading(false)
        }
        
    const fetchSearchImages = async () => {
        if(searchInput !== ''){
            // setLoading(true)
            const res = await axios
                .get(`${unsplashAPI}/search/photos?page=${searchPage}&query=${searchInput}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
            const searchRes = res.data.results
            setImages([...images, ...searchRes])
            let newPage = searchPage+1
            setSearchPage(newPage)
            // setLoading(false)
        }
    }
    
    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        setIsSearching(true)
        setImages([])
        fetchSearchImages();
    }
    
    // if(loading) return <CircularProgress size={100}/>
    
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
        <InfiniteScroll 
        dataLength = {images.length}
        next = {isSearching ? fetchSearchImages : fetchImages}
            hasMore = {true}
            loader = {<LinearProgress />} >
            <Container maxWidth="lg">
                <Search handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
                {getImages()}
            </Container>
        </InfiniteScroll>
    )
}

export default Gallery