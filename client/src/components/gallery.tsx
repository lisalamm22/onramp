import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Search from './search'
import InfiniteScroll from 'react-infinite-scroll-component';
import '../stylesheets/gallery.css'
// import Photo from './photo';


const Gallery: React.FC<Props> = ({ setModalImg}) => {
    const [images, setImages] = useState<any>([]);
    const [searchImages, setSearchImages] = useState<any>([]);
    // const [loading, setLoading] = useState<Boolean>(true);
    const [newSearch, setNewSearch] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<String>('')
    const [isSearching, setIsSearching] = useState<Boolean>(false)
    const [searchPage, setSearchPage] = useState<number>(1)
    // const history = useHistory();

    const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    useEffect(() => {
        fetchImages();
    }, [])

    useEffect(() => {
        if(!isSearching || newSearch){
            fetchSearchImages();
            setNewSearch(false)
        }
    }, [searchImages])
    
    const fetchImages = async () => {
        setSearchInput('')
        setIsSearching(false)
        setSearchPage(1)
        const res = await axios
            .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
        const fetchedImages = await res.data;
        setImages([...images, ...fetchedImages])
    }
        
    const fetchSearchImages = async () => {
        if(searchInput !== ''){
            const res = await axios
                .get(`${unsplashAPI}/search/photos?page=${searchPage}&query=${searchInput}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
            const searchRes = res.data.results
            setSearchImages([...searchImages, ...searchRes])
            let newPage = searchPage+1
            setSearchPage(newPage)
            setIsSearching(true)
        }
    }
    
    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        setNewSearch(true)
        setSearchImages([])
    }
    
    const getImages = () => {
        return (
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
        )
    }
    const getSearchImages = () => {
        return (
            <GridList cellHeight={250} cols={3} spacing={15} >
                {searchImages.map((image:any,idx:number) => {
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
        )
    }
    
    // if(loading) return <CircularProgress size={100}/>
    
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

interface Props{
    setModalImg: any,
    // likes: any,
    // setLikes: () => void
}

export default Gallery