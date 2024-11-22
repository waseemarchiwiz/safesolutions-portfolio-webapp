import React from 'react'
import MainHero from '../components/HomeComponents/MainHero'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div className='dark:bg-gray-800 dark:text-gray-200 '>
      <MainHero />
      <Testimonial />
    </div>
  )
}

export default Home