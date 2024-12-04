import React from 'react'
import MainHero from '../components/HomeComponents/MainHero'
import Testimonial from '../components/HomeComponents/Testimonial'
import ProjComp from '../components/HomeComponents/ProjComp'
import WhyChoose from '../components/HomeComponents/WhyChoose'
import About from '../components/HomeComponents/AboutComp'
import ServicesComponent from '../components/HomeComponents/ServicesComponent'
import ProjectsComponent from '../components/HomeComponents/ProjectsComponent'
import FaqComponents from '../components/HomeComponents/FaqComponents'
import WorkingArea from '../components/HomeComponents/WorkingArea'
 

const Home = () => {
  return (
    <div className='dark:bg-gray-800 dark:text-gray-200 '>
      <MainHero /> 
      <WhyChoose />
      <About />
      <WorkingArea />
      <ServicesComponent />
      {/* <ProjComp /> */}
      <ProjectsComponent />
      <Testimonial />
      <FaqComponents />
      
    </div>
  )
}

export default Home