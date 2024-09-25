import PostForm from "@/components/posts/PostForm";
import PostList from "@/components/posts/PostList";
// import SelectButton from '@/components/bottons/SelectBotton';
import { Box } from "@mui/material";
import { Suspense } from "react";
import dynamic from 'next/dynamic';
// import SelectButtonSample from '@/components/bottons/Select-sample';

// LeafletMapはクライアントサイドのみでレンダリングされるように設定
const LeafletMap = dynamic(() => import('../components/map/LeafletMap'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});


export default async function Post() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div>
          <LeafletMap />
        </div>
        <div className="">
          {/* <SelectButton /> */}
          {/* <SelectButtonSample /> */}
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