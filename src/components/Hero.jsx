import React from "react";
import { logo } from "../assets";
const Hero = () => {
  return (
    <header className='flex flex-col w-full items-center'>
      <nav className='w-full flex flex-row justify-between items-center pt-3 pb-10'>
        <img src={logo} alt='logo' className='w-28 object-contain' />
        <a href='https://github.com/mostafa0658M' className='black_btn'>
          Github
        </a>
      </nav>
      <h1 className='head_text'>
        Summarize Articles and Youtube Videos with{" "}
        <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
