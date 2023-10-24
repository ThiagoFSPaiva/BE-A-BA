import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';

type SearchInputProps = {
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Input
      placeholder='Pesquisar'
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;