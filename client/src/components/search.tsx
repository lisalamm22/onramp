import React from 'react';
import Textfield from '@material-ui/core/TextField';
import { ImageSearch } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';

const SearchBar: React.FC<Props> = ({ handleSearch, handleSearchInput }) => {
    return (
        <form onSubmit={handleSearch}>
            <Textfield fullWidth 
                // label="SEARCH"
                placeholder="SEARCH FOR ANYTHING"
                InputProps = {{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ImageSearch/>
                        </InputAdornment>
                    )
                }}
                onChange={handleSearchInput}/>
        </form>
    )
}

interface Props {
    handleSearch: (e:any) => void,
    handleSearchInput: (e:any) => void
}

export default SearchBar
