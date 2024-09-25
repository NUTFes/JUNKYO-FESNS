"use client"; // クライアントコンポーネントとして指定

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Areas } from '@/constant/Area';
import "./LeafletPopup.css";

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
    refreshInterval: 1000,  // 1秒ごとにデータを取得
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};


export default function LeafletMap() {
  const { data, isLoading, isError } = usePostSwr();  // usePostSwrを呼び出し
  
  //useCallback使った方よくね？
  useEffect(() => {
    // Leafletマップの初期化
    const map = L.map('map', {
      crs: L.CRS.Simple, // カスタムイメージの場合はSimple座標を使用
      minZoom: -1,
      maxZoom: 1,
    });
    const DefaultIcon = L.icon({
      iconUrl: icon.src,
      iconRetinaUrl: iconRetina.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // 画像のサイズを定義 (幅, 高さ)
    const imageBounds: L.LatLngBoundsExpression = [[0, 0], [1629, 2403]]; // カスタムイメージのサイズに合わせる

    // 画像タイルを背景に設定
    L.imageOverlay('/images/map.png', imageBounds).addTo(map);

    // マップの表示範囲を画像サイズに合わせる
    map.fitBounds(imageBounds);
    
    // 投稿コンテンツをマーカーとして追加する
    function dropMarkers(){
      if(data && data.length > 0){
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        data.map((post: Post) => {
          switch(post.area_id){
            case 1:
              x = Math.random() * (Areas[0].lng[1] - Areas[0].lng[0]) + Areas[0].lng[0];
              y = Math.random() * (Areas[0].lat[1] - Areas[0].lat[0]) + Areas[0].lat[0];
              break;
            case 2:
              x = Math.random() * (Areas[1].lng[1] - Areas[1].lng[0]) + Areas[1].lng[0];
              y = Math.random() * (Areas[1].lat[1] - Areas[1].lat[0]) + Areas[1].lat[0];
              break;
            case 3:
              x = Math.random() * (Areas[2].lng[1] - Areas[2].lng[0]) + Areas[2].lng[0];
              y = Math.random() * (Areas[2].lat[1] - Areas[2].lat[0]) + Areas[2].lat[0];
              break;
            case 4:
              x = Math.random() * (Areas[3].lng[1] - Areas[3].lng[0]) + Areas[3].lng[0];
              y = Math.random() * (Areas[3].lat[1] - Areas[3].lat[0]) + Areas[3].lat[0];
              break;
            case 5:
              x = Math.random() * (Areas[4].lng[1] - Areas[4].lng[0]) + Areas[4].lng[0];
              y = Math.random() * (Areas[4].lat[1] - Areas[4].lat[0]) + Areas[4].lat[0];
              break;
            case 6:
              x = Math.random() * (Areas[5].lng[1] - Areas[5].lng[0]) + Areas[5].lng[0];
              y = Math.random() * (Areas[5].lat[1] - Areas[5].lat[0]) + Areas[5].lat[0];
              break;
            default:
              break;
          }
          L.popup({autoClose:false, closeOnClick: false}).setLatLng([y, x]).setContent(post.content).openOn(map);
        });
      }
    }
    // マーカーを追加
    dropMarkers();

    return () => {
      // マップのクリーンアップ
      map.remove();
    };
  }, [data, isLoading, isError]);

  return <div id="map" style={{ height: '500px', width: '1000px' }} />;
}
