import React from 'react';
import {useState, useEffect, Fragment} from 'react';
import Search from './search'
import RandomPage from './image_pages/random_page';
import SearchResultsPage from './image_pages/search_results_page';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Container } from '@material-ui/core';
import '../stylesheets/gallery.css'
import LikesPage from './image_pages/likes_page';
import EditsPage from './image_pages/edits_page';


const Gallery: React.FC<Props> = ({ setModalImg, edits, setEdits, likes, setLikes }) => {
    const [newSearch, setNewSearch] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<any>(null)
    const [component, setComponent] = useState<any>('')

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

    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value);
    }
    
    const handleSearch = (e:any) => {
        e.preventDefault();
        setNewSearch(true)
        setIsSearching(true)
        getSearchImages()
    }

    const getComponent = (comp:string) => {
        if(comp === 'Edits'){
            return <EditsPage edits={edits} setEdits={setEdits}/>
        }
        else if(comp === 'Likes'){
            return <LikesPage likes={likes} setLikes={setLikes}/>
        }
        else {
            return <RandomPage setModalImg={setModalImg}/>
        }
    }

    // if(loading) return <CircularProgress size={100}/>
    
    return (
        <Fragment>
            <Container maxWidth = "lg">
                <Search handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
                <nav>
                    <Button
                        // id="active-btn"
                        onClick={()=>{
                            setIsSearching(false)
                            setSearchInput('')
                            setComponent('Random')
                        }}
                        >Home</Button>
                    <Button
                        onClick={()=> {
                            setIsSearching(false)
                            setSearchInput('')
                            setComponent('Edits')
                        }}
                        >Edits</Button>
                    <Button
                        onClick={() => {
                            setIsSearching(false)
                            setSearchInput('')
                            setComponent('Likes')
                        }}
                        >Likes</Button>

                    <Button>Search</Button>
                </nav>
                {isSearching? searchResults : getComponent(component)}
            </Container>
        </Fragment>
    )
}

interface Props{
    setModalImg: any,
    edits: any,
    setEdits: any,
    likes: any,
    setLikes: any,
}

export default Gallery