"use client"; // クライアントコンポーネントとして指定

import { useEffect } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";


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
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // 画像のサイズを定義 (幅, 高さ)
    const imageBounds: L.LatLngBoundsExpression = [[0, 0], [1629, 2403]]; // カスタムイメージのサイズに合わせる

    // 画像タイルを背景に設定
    L.imageOverlay('/images/map.png', imageBounds).addTo(map);

    // マップの表示範囲を画像サイズに合わせる
    map.fitBounds(imageBounds);
    
    function postText(){
      // console.log(data);
      if (isLoading) return "Loading";
      if (isError) return "Error";
      console.log(data);
      if (data && data.length > 0) return data[0].content;
      return "No Posts";
    }

    let marker;
    function onMapClick(e: LeafletMouseEvent) {
      marker = L.marker(e.latlng).addTo(map);
      marker.bindPopup(postText(),{autoClose:false}).openPopup();
    }
    map.on('click', onMapClick);

    return () => {
      // マップのクリーンアップ
      map.remove();
    };
  }, [data, isLoading, isError]);

  return <div id="map" style={{ height: '500px', width: '1000px' }} />;
}