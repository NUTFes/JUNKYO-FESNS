"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Card, CardContent, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
// import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Areas } from '@/constant/area';

type Post = {
  content: string;
  area_id: number;
};

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Post>();

  const [selectedValue, setSelectedValue] = useState<string>('');

  // SelectChangeEvent 型を使用
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = async (data: Post) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      window.alert("投稿しました");
    } else {
      window.alert("投稿に失敗しました");
    }
    reset();
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              id="content"
              label="本文"
              variant="outlined"
              {...register("content", { required: true })}
              // {...register("area_id", { required: true })}
            />
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
                {Areas.map((area) => {
                  return (
                    <MenuItem value={area.id}>
                      {area.name}
                    </MenuItem>)
                })}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Contained
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}