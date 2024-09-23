CREATE TABLE dtb_areas (
    area_id smallint PRIMARY KEY,    -- エリアID
    area_name text NOT NULL,         --エリア名
    area_coordinate text NOT NULL    --座標(x1 y1)または(x+a y+b)
);

CREATE TABLE dtb_posts (
    id integer NOT NULL PRIMARY KEY,                                     -- ID
    content text NOT NULL,                                      -- 投稿テキスト
    area_id smallint REFERENCES dtb_areas (area_id),            -- エリアID(外部キー)
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP   -- 更新はプログラム側で
);