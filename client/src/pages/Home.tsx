import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AppDemo from '../components/AppDemo';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  useEffect(() => {
    // scroll to section on hash change
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          // Add small delay to ensure smotth scrolling
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            })
          }, 100)
        }
      }
    }

    // call an initial load
    handleHashChange()

    // Add event listener
    window.addEventListener('hashchange', handleHashChange)

    // cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="font-family overflow-x-hidden">
        <Header />
        <Hero />
        <Features />
        <AppDemo />
        <Testimonials />
        <CallToAction/>
      <Footer /> 
    </div>
  );
};

export default Home;