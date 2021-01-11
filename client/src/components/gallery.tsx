import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
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
    const [searchImages, setSearchImages] = useState<any>([]);
    // const [loading, setLoading] = useState<Boolean>(true);
    const [searchInput, setSearchInput] = useState<String>('')
    const [isSearching, setIsSearching] = useState<Boolean>(false)
    const [searchPage, setSearchPage] = useState<number>(1)

    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    useEffect(() => {
        fetchImages();
    }, [])

    useEffect(() => {
        if(!isSearching){
            fetchSearchImages();
        }
    }, [searchImages])
    
    const fetchImages = async () => {
        // setLoading(true)
        setSearchInput('')
        setIsSearching(false)
        setSearchPage(1)
        const res = await axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
            // .then((res:any) => setImages([...images, ...res.data]))
        const fetchedImages = await res.data;
        setImages([...images, ...fetchedImages])
        // setLoading(false)
        console.log('fetch images')
        console.log(images)
    }
        
    const fetchSearchImages = async () => {
        if(searchInput !== ''){
            // setLoading(true)
            const res = await axios
                .get(`${unsplashAPI}/search/photos?page=${searchPage}&query=${searchInput}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
            const searchRes = res.data.results
            setSearchImages([...searchImages, ...searchRes])
            let newPage = searchPage+1
            setSearchPage(newPage)
            console.log('fetch search results')
            console.log(searchRes)
            // setLoading(false)
            setIsSearching(true)
        }
    }
    
    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        setSearchImages([])
        // console.log('search')
        // console.log(searchImages) //still appending
        // fetchSearchImages();
    }
    
    // if(loading) return <CircularProgress size={100}/>
    
    const getImages = () => {
        return (
            <GridList cellHeight={250} cols={3} >
                {images.map((image:any,idx:number) => {
                    return <GridListTile key={idx}
                    style={{ flexGrow: 1 }}
                    cols = {(image.width/5000)}>
                        {/* <Link to={`/photos/${image.id}`}> */}
                        <img 
                            srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
                            ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            // src={`${image.urls.thumb}`}
                            alt={image.description || image.alt_description}
                        />
                        {/* </Link> */}
                    </GridListTile>
                })}
            </GridList>
        )
    }
    const getSearchImages = () => {
        return (
            <GridList cellHeight={250} cols={3} >
                {searchImages.map((image:any, idx:number) => {
                    return <GridListTile key={idx}
                    style={{ flexGrow: 1 }}
                    cols = {(image.width/5000)}>
                        {/* <Link to={`/photos/${image.id}`}> */}
                        <img 
                            srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
                            ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            // src={`${image.urls.thumb}`}
                            alt={image.description || image.alt_description}
                        />
                        {/* </Link> */}
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
                {isSearching ? getSearchImages() : getImages()}
            </Container>
        </InfiniteScroll>
    )
}

export default Gallery