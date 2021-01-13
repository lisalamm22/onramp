import React from 'react';
import {useState, useEffect, Fragment} from 'react';
import Search from './search'
import RandomPage from './random_page';
import SearchResultsPage from './search_results_page';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';
import '../stylesheets/gallery.css'
import EditsPage from './edits_page';


const Gallery: React.FC<Props> = ({ setModalImg, edits, setEdits }) => {
    // const [images, setImages] = useState<any>([]);
    // const [searchImages, setSearchImages] = useState<any>([]);
    const [newSearch, setNewSearch] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<any>(null)

    const getSearchImages = () => {
        return( 
            <SearchResultsPage 
                setNewSearch = {setNewSearch}
                searchInput = {searchInput}
                setModalImg ={setModalImg}
            />
        )
    }
    
    useEffect( () => {
        setSearchResults(getSearchImages())
    }, [newSearch])
    // const [loading, setLoading] = useState<Boolean>(true);

    // const unsplashAPI = "https://api.unsplash.com"
    // const accessKey = process.env.UNSPLASH_ACCESS_KEY
    
    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        setNewSearch(true)
        setIsSearching(true)
        getSearchImages()
    }
    
    const getImages = () => {
        return <RandomPage setModalImg={setModalImg}/>
    }
    
    // if(loading) return <CircularProgress size={100}/>
    
    return (
        <Fragment>
            <EditsPage edits={edits} setEdits={setEdits}/>
            <Search handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
            <Button
                onClick={()=>{
                    setIsSearching(false)
                    setSearchInput('')
                }}
            >Home</Button>
            <Button>Edits</Button>
            {isSearching? searchResults : getImages()}
            
        </Fragment>
    )
}

interface Props{
    setModalImg: any,
    edits: any,
    setEdits: any,
}

export default Gallery