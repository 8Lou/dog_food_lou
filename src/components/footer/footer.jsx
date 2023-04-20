import React from "react";

/* 1 из способов инлайн стилизации */
/* export const Footer = () => {
    return <div>
        <h1 style={{ color: 'red', marginTop: '100px' }}></h1>

    </div >
} */
/* 2 из способов инлайн стилизации */
export const Footer = () => {
    const style = { color: 'red', marginTop: '100px' }
    return <div>
        {/* инлайн стилизация */}
        <h1 style={style}>FOOTER</h1>

    </div >
}