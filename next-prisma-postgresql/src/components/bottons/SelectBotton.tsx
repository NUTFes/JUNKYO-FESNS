"use client";

import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Areas } from '@/constant/area';

export default function SelectButton() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  // SelectChangeEvent 型を使用
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">エリアを選択してください</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        label="エリア選択"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>新講義棟エリア</MenuItem>
        <MenuItem value={2}>事務棟エリア</MenuItem>
        <MenuItem value={3}>図書館棟エリア</MenuItem>
        <MenuItem value={4}>電気棟エリア</MenuItem>
        <MenuItem value={5}>屋外ステージエリア</MenuItem>
        <MenuItem value={6}>機械建設棟エリア</MenuItem>
      </Select>
    </FormControl>
  );
}
