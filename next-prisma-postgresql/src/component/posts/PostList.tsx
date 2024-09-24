"use client";

import { Box } from "@mui/material";
import useSWR from "swr";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
// import type { SWRConfiguration } from "swr";
import { fetcher } from "@/utils/fetcher";
import Post from "@/app/posts/page";

type Post = {
  id: number;
  content: string;
  user_id: number;
  area_id: number;
  created_at: Date;
};

// ここでSWRを使ってデータを取得している
const usePostSwr = () => {
  const { data, error } = useSWR(`/api/posts`, fetcher, {
    refreshInterval: 1000,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default function PostList() {
  const { data, isLoading, isError } = usePostSwr();

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <Box sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
      <List sx={{ width: "50%" }}>
        {data && data.length > 0 ? (
          data.map((post: Post) => {
            return (
              <>
                <ListItem key={post.id}>
                  <ListItemText primary={post.content} />
                </ListItem>
                <Divider />
              </>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="No Posts" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}