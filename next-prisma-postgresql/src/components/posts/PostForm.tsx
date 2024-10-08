"use client";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import "./PostForm.css";
import { Select, MenuItem, styled } from "@mui/material";
import { Areas } from '@/constant/Area';

type Post = {
  content: string;
  area_id: number;
};

const CustomSelect = styled(Select)({
  backgroundColor: "#ff7f56",
  color: "white",
  borderRadius: "10px",
  height: "42px",
  width: "169px",
  marginLeft: "5%",
  fontWeight: "bold",
});

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Post>();
  
  // 投稿成功, 失敗メッセージの表示を管理するstate
  const [isVisibleSuccessMessage, setIsVisibleSuccessMessage] = React.useState(false);
  const [isVisibleFaildMessage, setIsVisibleFaildMessage] = React.useState(false);
  
  const onSubmit = async (data: Post) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      // window.alert("投稿しました");
      setIsVisibleSuccessMessage(true);
    } else {
      // window.alert("投稿に失敗しました");
      setIsVisibleFaildMessage(true);
    }
    reset();
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleSuccessMessage(false);
      setIsVisibleFaildMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  } , [isVisibleSuccessMessage, isVisibleFaildMessage]);
  
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="post-title">
        <CustomSelect
          {...register("area_id", { required: true, valueAsNumber: true })}
          defaultValue={1}
          color="primary"
        >
          {Areas.map((area) => {
            return (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>)
          })}
        </CustomSelect>
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
      {isVisibleSuccessMessage && <div className={`fade-text ${isVisibleSuccessMessage ? 'fade-out' : 'fade-in'}`}>コメントしたよ!</div>}
      {isVisibleFaildMessage && <div className={`fade-text ${isVisibleFaildMessage ? 'fade-out' : 'fade-in'}`}>投稿に失敗しました</div>}
    </Box>
  );
}