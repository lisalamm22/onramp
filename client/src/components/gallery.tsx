import React from 'react';
import {useState, useEffect} from 'react';
// import axios from 'axios';
// import Container from '@material-ui/core/Container'
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
import Search from './search'
// import InfiniteScroll from 'react-infinite-scroll-component';
import '../stylesheets/gallery.css'
import RandomPage from './random_page';
import SearchResultsPage from './search_results_page';
import { Button } from '@material-ui/core';


const Gallery: React.FC<Props> = ({ setModalImg }) => {
    // const [images, setImages] = useState<any>([]);
    // const [searchImages, setSearchImages] = useState<any>([]);
    const [newSearch, setNewSearch] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    // const [searchPage, setSearchPage] = useState<number>(1)
    const [searchResults, setSearchResults] = useState<any>(null)

    const getSearchImages = () => {
        console.log("isSearching")
        console.log(isSearching)
        console.log("newSearch")
        console.log(newSearch)
        console.log('searchInput')
        console.log(searchInput)
        return( 
            <SearchResultsPage 
                // searchImages = {searchImages}
                // setSearchImages = {setSearchImages}
                newSearch = {newSearch}
                setNewSearch = {setNewSearch}
                searchInput = {searchInput}
                setSearchInput = {setSearchInput}
                isSearching = {isSearching}
                setIsSearching = {setIsSearching}
                // searchPage = {searchPage}
                // setSearchPage = {setSearchPage}
                setModalImg ={setModalImg}
            />
        )
    }
    
    useEffect( () => {
        console.log("using effect")
        setSearchResults(getSearchImages())
    }, [newSearch])
    // const [loading, setLoading] = useState<Boolean>(true);

    // const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY

    // useEffect(() => {
    //     fetchImages();
    // }, [])

    // useEffect(() => {
    //     if(!isSearching || newSearch){
    //         fetchSearchImages();
    //         setNewSearch(false)
    //     }
    // }, [searchImages])
    
    // const fetchImages = async () => {
    //     setSearchInput('')
    //     setIsSearching(false)
    //     setSearchPage(1)
    //     const res = await axios
    //         .get(`${unsplashAPI}/photos/random?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&count=10 `)
    //     const fetchedImages = await res.data;
    //     setImages([...images, ...fetchedImages])
    // }
        
    // const fetchSearchImages = async () => {
    //     if(searchInput !== ''){
    //         const res = await axios
    //             .get(`${unsplashAPI}/search/photos?page=${searchPage}&query=${searchInput}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
    //         const searchRes = res.data.results
    //         setSearchImages([...searchImages, ...searchRes])
    //         let newPage = searchPage+1
    //         setSearchPage(newPage)
    //         setIsSearching(true)
    //     }
    // }
    
    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        // setSearchImages([])
        setNewSearch(true)
        setIsSearching(true)
        getSearchImages()
    }
    
    // const getImages = () => {
    //     return (
    //         <GridList cellHeight={250} cols={3} spacing={15} >
    //             {images.map((image:any,idx:number) => {
    //                 return (
    //                     <GridListTile key={idx}
    //                     style={{ flexGrow: 1 }}
    //                     cols = {(image.width/5000)}
    //                     className='gallery-tile'
    //                     onClick= {() => setModalImg(image)}>
    //                         <img 
    //                             srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
    //                             ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
    //                             src={`${image.urls.thumb}`}
    //                             alt={image.description || image.alt_description}
    //                             />
    //                 </GridListTile>
    //             )})}
    //         </GridList>
    //     )
    // }
    const getImages = () => {
        // setSearchInput('')
        // setIsSearching(false)
        // setSearchPage(1)
        return <RandomPage setModalImg={setModalImg}/>
    }


    // const getSearchImages = () => {
    //     return (
    //     <InfiniteScroll
    //         dataLength = {searchImages.length}
    //         next = { fetchSearchImages }
    //         hasMore = { true }
    //         loader = { <LinearProgress/> }
    //     >
    //         <GridList cellHeight={250} cols={3} spacing={15} >
    //             {searchImages.map((image:any,idx:number) => {
    //                 return (
    //                     <GridListTile key={idx}
    //                     style={{ flexGrow: 1 }}
    //                     cols = {(image.width/5000)}
    //                     className='gallery-tile'
    //                     onClick= {() => setModalImg(image)}>
    //                         <img 
    //                             srcSet={`${image.urls.thumb}?w=161&fit=crop&auto=format 1x, 
    //                             ${image.urls.thumb}?w=161&fit=crop&auto=format&dpr=2 2x`}
    //                             src={`${image.urls.thumb}`}
    //                             alt={image.description || image.alt_description}
    //                             />
    //                 </GridListTile>
    //             )})}
    //         </GridList>
    //         </InfiniteScroll>
    //     )
    // }
    
    // if(loading) return <CircularProgress size={100}/>
    
    return (
        // <InfiniteScroll 
        // dataLength = {images.length}
        // next = {isSearching ? fetchSearchImages : fetchImages}
        //     hasMore = {true}
        //     loader = {<LinearProgress />} >
        //     <Container maxWidth="lg">
        //         <Search handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
        //         {isSearching ? getSearchImages() : getImages()}
        //     </Container>
        // </InfiniteScroll>
        <div>
            <Search handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
            <Button
                onClick={()=>{
                    setIsSearching(false)
                }}
            >Home</Button>
            {isSearching? searchResults : getImages()}
            
        </div>
    )
}

interface Props{
    setModalImg: any,
}

export default Gallery