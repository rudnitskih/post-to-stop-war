import React from 'react';
import {Header} from "../Header/Header";
import {Partners} from "../Partners";
import {Footer} from "../Footer";
import s from './Page.module.scss';

export function Page({children}) {
  return (
    <>
      <Header/>
      <div className={s.content}>
        {children}
      </div>

      <Partners/>
      <Footer/>
    </>
  );
}
