import React, { useState } from 'react'
import TextInput from './TextInput'
import PrimaryButton from './PrimaryButton'
import { useQueryState } from 'nuqs'
import { Search, X } from 'lucide-react'
import { Inertia } from '@inertiajs/inertia';

const SearchInput = ({placeholder,route_path}) => {

  const [searchQuery, setSearchQuery] = useQueryState('query')

  const handleSearch = (e) => {
    e.preventDefault();
    Inertia.get(route(route_path), { query: searchQuery });
  };


  return (
    <div className="flex w-1/2">
        <TextInput 
          placeholder={placeholder} 
          className="!rounded-r-none !w-full" 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <PrimaryButton 
          onClick = {()=>{}}
          className="bg-white !border-gray-300 !rounded-none !hover:text-white"
        >
          <X size={15} className="text-gray-500 " />
        </PrimaryButton> */}
        <PrimaryButton 
          onClick={handleSearch}
          className="bg-white !border-gray-300 !rounded-l-none"
        >
          <Search size={15} className="text-gray-500" />
        </PrimaryButton>
    </div>
  )
}

export default SearchInput