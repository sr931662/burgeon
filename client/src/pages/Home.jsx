import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero/Hero';
import CountersSection from '../components/CountersSection/CountersSection';
import MarqueeStrip from '../components/MarqueeStrip/MarqueeStrip';
import AboutSection from '../components/AboutSection/AboutSection';
// Import other components as you create them
import ServicesSection from '../components/ServicesSection/ServicesSection';
// import ProductsList from '../components/ProductsList/ProductsList';
// import ProcessSection from '../components/ProcessSection/ProcessSection';
// import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
// import CTABand from '../components/CTABand/CTABand';

const Home = () => {
  const fadersRef = useRef([]);

  useEffect(() => {
    // Page load reveal
    setTimeout(() => document.body.classList.add('loaded'), 50);

    // Intersection Observer for fade-up animations
    const faders = fadersRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('fade-up-active');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
    );

    faders.forEach(el => {
      if (el) io.observe(el);
    });

    return () => {
      faders.forEach(el => {
        if (el) io.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <CountersSection />
      <MarqueeStrip />
      <AboutSection />
      
      {/* Other sections will be added here as components */}
      <ServicesSection />
      {/* <ProductsList /> */}
      {/* <ProcessSection /> */}
      {/* <ProjectsSection /> */}
      {/* <CTABand /> */}
    </>
  );
};

export default Home;