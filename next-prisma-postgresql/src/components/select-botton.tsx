import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

export default function SelectButton() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  // SelectChangeEvent 型を使用
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">選択してください</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        label="選択してください"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
        <MenuItem value={30}>Option 3</MenuItem>
      </Select>
    </FormControl>
  );
}
