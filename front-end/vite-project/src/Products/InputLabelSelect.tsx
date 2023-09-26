import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface InputLabelSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
  options: string[];
}

const inputLabelSelectStyles = {
  width: '100%', 
  padding: 0,
};

const InputLabelSelect: React.FC<InputLabelSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        inputProps={{
          id,
          style: inputLabelSelectStyles,
        }}
        style={inputLabelSelectStyles}
      >
        <MenuItem value="">Select Size</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default InputLabelSelect;
