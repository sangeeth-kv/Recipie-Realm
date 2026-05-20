import { Search } from 'lucide-react'
import React, { useState } from 'react'


interface SearchBarProps {
  placeholder: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({placeholder,setSearch}:SearchBarProps) {

  const [value,setValue]=useState("")

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=e.target.value;
      setValue(value)
      setSearch(value)
  }
  
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-slate-900 placeholder-slate-500 transition-all duration-300"
              value={value}
              onChange={handleChange }
            />
          </div>
        </div>
      </div>
  )
}

export default SearchBar