import { LinearProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../stylesheets/gallery.css';

const SearchResultsPage: React.FC<Props> = ({setModalImg, 
    // searchImages, setSearchImages,
    newSearch, setNewSearch, 
    searchInput, setSearchInput, 
    isSearching, setIsSearching, 
    // searchPage, setSearchPage
}) => {
    const [searchImages, setSearchImages] = useState<any>([])
    const [searchPage, setSearchPage] = useState<number>(1)

    useEffect(() => {
        // if(!isSearching || newSearch){
            setSearchImages([])
            setSearchPage(1)
            // }
        }, [searchInput])
        
    useEffect( () => {
        if(searchImages.length === 0){
            fetchSearchImages();  
        }
    },[searchImages])
        
        const unsplashAPI = "https://api.unsplash.com"
        // const accessKey = process.env.UNSPLASH_ACCESS_KEY
        
    const fetchSearchImages = async () => {
        setNewSearch(false)
        if(searchInput !== ''){
            const res = await axios
                .get(`${unsplashAPI}/search/photos?page=${searchPage}&query=${searchInput}&client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY&per_page=20 `)
            const searchRes = res.data.results
            console.log("fetch results", searchRes)
            setSearchImages([...searchImages, ...searchRes])
            let newPage = searchPage+1
            setSearchPage(newPage)
            console.log("newPage", newPage)
            console.log(searchImages)
        }
    }
    
    // const handleSearchInput = (e:any) => {
    //     setSearchInput(e.target.value);
    // }
    
    // const handleSearch = (e:any) => {
    //     e.preventDefault();
    //     setNewSearch(true)
    //     setSearchImages([])
    // }

    return (
        <InfiniteScroll
            dataLength = {searchImages.length}
            next = { fetchSearchImages }
            hasMore = { true }
            loader = { <LinearProgress/> }
        >
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
        </InfiniteScroll>
    )
}

interface Props {
    // searchImages: any,
    // setSearchImages: any
    newSearch: boolean,
    setNewSearch: any,
    searchInput: any,
    setSearchInput: any,
    isSearching: boolean,
    setIsSearching: any,
    // searchPage: number,
    // setSearchPage: any,
    setModalImg: any,
}

export default SearchResultsPage
