import React from 'react';
import {Header} from "../Header/Header";
import {Partners} from "../Partners";
import {Footer} from "../Footer";

export function Page({children}) {
  return (
    <>
      <Header/>

      {children}

      <Partners/>
      <Footer/>
    </>
  );
}
