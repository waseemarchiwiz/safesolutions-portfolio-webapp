import React from 'react'
import MainHero from '../components/HomeComponents/MainHero'
import Testimonial from '../components/HomeComponents/Testimonial'
import ProjComp from '../components/HomeComponents/ProjComp'

const Home = () => {
  return (
    <div className='dark:bg-gray-800 dark:text-gray-200 '>
      <MainHero />
      <ProjComp />
      <Testimonial />
    </div>
  )
}

export default Home