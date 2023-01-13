import React, {Component} from 'react';
import s from './Footer.module.scss';
import {t} from "../utils/translate";
import logo from '../Socials/logo.svg';
import {Socials} from "../Socials/Socials";

export class Footer extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.inner}>
          <div className={s.top}>
            <img src={logo} alt="logo" />
            <p className={s.description}>{t('footer.description')}</p>

            <Socials />
          </div>
          <span className={s.copyright}>
            © post-to-stop-war.in.ua. 2023 All Rights Reserved.
          </span>
        </div>
      </div>
    );
  }
}
