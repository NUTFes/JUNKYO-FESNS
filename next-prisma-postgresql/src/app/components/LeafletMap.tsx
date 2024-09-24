"use client"; // クライアントコンポーネントとして指定

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default function LeafletMap() {
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
    L.imageOverlay('http://localhost:3000/images/map.png', imageBounds).addTo(map);

    // マップの表示範囲を画像サイズに合わせる
    map.fitBounds(imageBounds);

    // ドラッグ可能なマーカーの追加
    const marker = L.marker([250, 250], { draggable: true }).addTo(map); // 画像の中央にマーカーを配置

    // マーカーがドラッグされたときのイベント
    marker.on('dragend', function () {
      const position = marker.getLatLng();
      console.log(`Marker dragged to: ${position.lat}, ${position.lng}`);
    });

    return () => {
      // マップのクリーンアップ
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '1000px' }} />;
}
