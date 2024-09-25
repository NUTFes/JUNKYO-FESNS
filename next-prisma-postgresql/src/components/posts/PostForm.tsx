"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Card, CardContent, Select, MenuItem } from "@mui/material";
// import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Areas } from '@/constant/Area';

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
            />
            <Select
              {...register("area_id", { required: true })}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {Areas.map((area) => {
                return (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>)
              })}
            </Select>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Contained
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}