import React from "react";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Process from "./Process";
import FAQ from "./FAQs";
import CTA from "./CTA";
import ServicesShowcase from "./ServicesHome";

const Home = () => {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      <Process />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  );
};

export default Home;
