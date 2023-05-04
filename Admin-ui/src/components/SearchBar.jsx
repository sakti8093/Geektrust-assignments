import React from 'react'

export const SearchBar = ({handleSearch}) => {
  return (
    <div className='search' >
        <input onChange={(e)=>handleSearch(e)} placeholder='search here by role,name and email' />
    </div>
  )
}
