"use client";
import React from 'react';
// import { useState } from 'react';
// // import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
// import { SelectChangeEvent } from '@mui/material';
import "./button-sample.css";

export default function SelectButtonSample() {
    // const [selectedValue, setSelectedValue] = useState<string>('');

    // // SelectChangeEvent 型を使用
    // const handleChange = (event: SelectChangeEvent<string>) => {
    //     setSelectedValue(event.target.value);
    // };

    return (

        <select className="selectbox" name="select-ravel" id="area">
            <option value="new-recture">新講義棟エリア</option>
            <option value="office">事務棟エリア</option>
            <option value="library">図書館棟エリア</option>
            <option value="electric">電気棟エリア</option>
            <option value="outside">屋外ステージエリア</option>
            <option value="machine">機械棟建設エリア</option>
        </select>

    );
}
