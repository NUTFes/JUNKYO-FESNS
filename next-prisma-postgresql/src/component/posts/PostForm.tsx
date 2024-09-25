"use client";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import React from "react";
import "./sample.css";

type Post = {
  content: string;
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
      //sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >

      {/* <TextField
              id="content"
              label="コメント"
              variant="outlined"

              {...register("content", { required: true })}
            /> */}
      <div className="post-flex">
        <div className="box">
          <div className="comment-main">
            <input
              id="content"
              className="rectangle"
              placeholder=" フェス、たのしんでる？"
              {...register("content", { required: true })}//inoutタグから情報取得
            />
          </div>
        </div>
        <div>
          <input className="button" type="image" src="/images/icon_full.svg"></input>
        </div>

      </div>
      {/* <Button variant="contained" type="submit" disabled={!isValid}> */}
      {/* Contained */}
      {/* </Button> */}





    </Box>
  );
}