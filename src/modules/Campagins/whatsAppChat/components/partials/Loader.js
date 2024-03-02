import React from 'react'
import Flex from '@components/common/Flex';
import loader from '../../../../../assets/images/loader.gif'

const Loader = () => {
  return (
   <div style={{
    display:'grid',
    placeItems:'center',
    width: '100%',
    height:"80%",
  }}>
      <img src={loader} alt="no gif" style={{ width: "400px", height: "230px"}}  autoPlay="autoPlay" muted loop="loop"/>
   </div>
  )
}

export default Loader