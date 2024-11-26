import React from 'react'
import MainHero from '../components/HomeComponents/MainHero'
import Testimonial from '../components/HomeComponents/Testimonial'
import ProjComp from '../components/HomeComponents/ProjComp'
import WhyChoose from '../components/HomeComponents/WhyChoose'
import About from '../components/HomeComponents/AboutComp'
import ServicesComponent from '../components/HomeComponents/ServicesComponent'
 

const Home = () => {
  return (
    <div className='dark:bg-gray-800 dark:text-gray-200 '>
      <MainHero />
      <ProjComp />
      <WhyChoose />
      <About />
      <ServicesComponent />
      {/* <Testimonial /> */}
    </div>
  )
}

export default Home