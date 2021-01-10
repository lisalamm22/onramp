import React from 'react';
import Textfield from '@material-ui/core/TextField';

const Search: React.FC<Props> = ({ handleSearch, handleSearchInput }) => {
    return (
        <form onSubmit={handleSearch}>
            <Textfield fullWidth label='SEARCH' 
                onChange={handleSearchInput}/>
        </form>
    )
}

interface Props {
    handleSearch: (e:any) => void,
    handleSearchInput: (e:any) => void
}

export default Search
