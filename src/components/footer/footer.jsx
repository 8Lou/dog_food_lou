import React from "react";
import styled from 'styled-components';

const Button = styled.div`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: red;
  color: white;
  border: 2px solid white;
`

/* 1 из способов инлайн стилизации */
/* export const Footer = () => {
    return <div>
        <h1 style={{ color: 'red', marginTop: '100px' }}></h1>

    </div >
} */
/* 2 из способов инлайн стилизации */
export const Footer = () => {

    const listener = (e) => console.log(e.key)

    useEffect(() => {
        // console.log('>>> working footer');
        // document.addEventListener('keydown', listener);
        return () => console.log("UNMOUNT");
    }, []);

    const style = { color: 'red', marginTop: '100px', marginLeft: '100px' }


    // console.log('last message');

    return <div>    footer

        <h1 style={style}>FOOTER</h1>
        {/* <h1 style='color: red'>FOOTER</h1>  deprecated */}
        {/* <Button>from styled</Button> */}

        {/* <div style={{ color: 'red', marginTop: '100px', marginLeft: '100px' }}></div> */}
    </div>
}