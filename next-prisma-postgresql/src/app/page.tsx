import PostForm from "@/component/posts/PostForm";
import PostList from "@/component/posts/PostList";
import { Box } from "@mui/material";
import { Suspense } from "react";
import dynamic from 'next/dynamic';

// LeafletMapはクライアントサイドのみでレンダリングされるように設定
const LeafletMap = dynamic(() => import('./components/LeafletMap'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

/// 
export default async function Post() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1>カスタムイメージにマーカーを設置</h1>
          <LeafletMap />
        </div>
        <Box>
          <Suspense fallback={<div>Loading...</div>}>
            <PostForm />
            <PostList />
          </Suspense>
        </Box>
      </main>
    </div>
  );
}