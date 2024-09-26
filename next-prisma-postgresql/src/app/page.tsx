"use client"; // クライアントコンポーネントとして指定

import PostForm from "@/components/posts/PostForm";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import './ImageSwitch.css';

// LeafletMapはクライアントサイドのみでレンダリングされるように設定
const LeafletMap = dynamic(() => import('../components/map/LeafletMap'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});


export default function Post() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };
  
  return (
    <div>
      {!isStarted ? (
        <div className="title-content">
          <Image
            src="/images/title_mobile.png"
            alt="Default Image"
            fill
            className="responsiveImage"
            onClick={handleStart}
          />
        </div>
      ) : (
        <div
          id="map"
          style={{
            // width: '100%',
            // height: '1000px',
            width: '100vw',
            height: '100vh',
            whiteSpace: 'nowrap' // 横スクロール可能にするため
          }}
        >
          <LeafletMap />
          <PostForm />
        </div>
      )}
    </div>
  );
}