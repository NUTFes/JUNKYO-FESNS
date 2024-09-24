"use client"; // クライアントコンポーネントとして指定

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
    //useCallback使った方よくね？
  useEffect(() => {
    // Leafletマップの初期化
    const map = L.map('map', {
      crs: L.CRS.Simple, // カスタムイメージの場合はSimple座標を使用
      minZoom: -1,
      maxZoom: 1,
    });

    // 画像のサイズを定義 (幅, 高さ)
    const imageBounds: L.LatLngBoundsExpression = [[0, 0], [500, 500]]; // カスタムイメージのサイズに合わせる

    // 画像タイルを背景に設定
    // L.imageOverlay('next-prisma-postgresql/src/public/map.png', imageBounds).addTo(map);
    L.imageOverlay('http://localhost:3000/images/map.png', imageBounds).addTo(map);
    // L.imageOverlay('/Users/ycn/Workspace/NUTMEG/Hackason/JUNKYO-FESNS/next-prisma-postgresql/src/public/map.png', imageBounds).addTo(map);

    // マップの表示範囲を画像サイズに合わせる
    map.fitBounds(imageBounds);

    // ドラッグ可能なマーカーの追加
    const marker = L.marker([250, 250], { draggable: true }).addTo(map); // 画像の中央にマーカーを配置

    // マーカーがドラッグされたときのイベント
    marker.on('dragend', function (e) {
      const position = marker.getLatLng();
      console.log(`Marker dragged to: ${position.lat}, ${position.lng}`);
    });

    return () => {
      // マップのクリーンアップ
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '500px' }} />;
}
