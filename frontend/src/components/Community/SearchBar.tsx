import React, {PropsWithChildren } from 'react';
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';

function SearchBar(){
    const searchBarStyle = {
        width: "350px",
        height: "40px",
        display: "flex",
        fiexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
        border: "1px solid gray",
        borderRadius: "10px",
        opacity: "0.5",
        margin: " 0 20px 0 0",
        boxShadow: "0.1px 0.2px 0.1px 0.2px"

    }
    return(
        <div style={searchBarStyle}>
            <SearchButton>
                <SearchIcon/>
            </SearchButton>
            <InputContainer placeholder='Search'>
            </InputContainer>

        </div>
    );
}

const InputContainer = styled.input`
width: 300px;
height: 35px;
border: none;
font-size: 22px;
border-radius: 10px;
outline: none;
`
const SearchButton = styled.button`
border: 0;
background-color: transparent;
&:hover{  
   cursor: pointer
  }
`
export default SearchBar