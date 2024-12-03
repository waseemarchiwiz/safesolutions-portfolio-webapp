import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrolltoTop = () => {
   
    const {pathname} = useLocation()

    useEffect(()=>{

        // window.scrollTo({top: 0, behavior: "smooth" });
        window.scrollTo(0, 0);

    },[pathname])

  return (
    <div></div>
  )

}

export default ScrolltoTop