import React, {Component} from 'react';
import s from './Partners.module.scss';
import {ReactComponent as FlagComponent} from './flag.svg';
import {t} from "../utils/translate";
import {Heading} from "../Heading/Heading";
import perfectPrLogo from "./perfect_pr.svg";
import stroomLogo from "./stroom.png";
import ucuLogo from "./ucu.svg";
import vzaemodiaLogo from "./vzaemodia.png";


export class Partners extends Component {
  render() {
    const supportText = t('partners.support');

    return (
      <div className={s.root}>

        <Heading>{t('partners.title')}</Heading>

        <div className={s.list}>
          {
            [
              {url: 'partners.ucu.url', logo: ucuLogo},
              {url: 'partners.vzaemodia.url', logo: vzaemodiaLogo},
              {url: 'partners.perfect.url', logo: perfectPrLogo},
              {url: 'partners.stroom.url', logo: stroomLogo},
            ].filter(({url}) => t(url).includes('//')).map(({url, logo}) => (
              <a className={s.listItem} key={url} target="_blank" rel="noreferrer" href={t(url)}>
                <img src={logo} alt="" className={s.logo} />
              </a>
            ))
          }

        </div>

        <a className={s.support}
           href={t('partners.support-link')}
           title={supportText}
           rel="noreferrer"
           target="_blank">
          <FlagComponent/>
          <span className={s.supportText}>{supportText}</span>
        </a>
      </div>
    );
  }
}
