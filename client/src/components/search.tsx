import React from 'react';
import Textfield from '@material-ui/core/TextField';

const Search: React.FC<Props> = ({ handleSearch, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Textfield fullWidth label='SEARCH' 
                onChange={handleSearch}/>
        </form>
    )
}

interface Props {
    handleSearch: (e:any) => void,
    handleSubmit: (e:any) => void
}

export default Search
