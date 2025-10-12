import React from "react";
import Hero from "./Hero";
import About from "./About";
import ServicesShowcase from "./ServicesHome";
import Testimonials from "./Testimonials";
import FAQ from "./FAQs";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <ServicesShowcase />
      <FAQ />
      <Testimonials />
    </>
  );
};

export default Home;
