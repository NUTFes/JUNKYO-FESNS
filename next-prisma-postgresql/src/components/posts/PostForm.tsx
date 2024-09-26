"use client";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import React from "react";
import "./PostForm.css";
// import { Select, MenuItem, styled } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Areas } from '@/constant/Area';

type Post = {
  content: string;
  area_id: number;
};

// const CustomSelect = styled(Select)({
//   backgroundColor: "#ff7f56",
//   color: "white",
//   borderRadius: "5px",
//   height: "42px",
//   width: "169px",
//   margin: "5px",
// });

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
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="post-title">
        {/* <CustomSelect */}
        <Select
          className = "custom-select"
          {...register("area_id", { required: true })}
          defaultValue={1}
        >
          {Areas.map((area) => {
            return (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>)
          })}
        {/* </CustomSelect> */}
        </Select>
        <div className="box">
          <div className="post-flex">
            <div className="comment-main">
              <input
                id="content"
                className="rectangle"
                placeholder=" フェス、たのしんでる？"
                {...register("content", { required: true })}//inoutタグから情報取得
              />
            </div>
            <div>
              <input className="button" type="image" src="/images/icon_full.svg" disabled={!isValid}></input>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}