import React from "react";

import { palette } from '../../styles/palette';


export default function BestChip(){
    const BestChipStyle = {
        color: palette.yellow_4,
        backgroundColor: palette.yellow_2,
        borderRadius: '10px',
        border: "none",
        textAlign: "center",
        width: "60px",
        height: "25px",
        margin: "12px 0 0 10px"

    }
    return(
        <div style={BestChipStyle}>
            Best
        </div>
    )
}