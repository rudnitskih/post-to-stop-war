import React, {Component} from 'react';
import s from './Footer.module.scss';
import {t} from "../utils/translate";
import {ReactComponent as FacebookIcon} from './facebook.svg';
import {ReactComponent as InstagramIcon } from './instagram.svg';
import {ReactComponent as LinkedinIcon } from './linkedin.svg';
import logo from './logo.svg';
import {ReactComponent as PinterestIcon } from './pinterest.svg';
import {ReactComponent as TwitterIcon } from './twitter.svg';

const socials = [
  {Icon: FacebookIcon, url: 'TODO', title: 'facebook'},
  {Icon: InstagramIcon, url: 'TODO', title: 'instagram'},
  {Icon: TwitterIcon, url: 'TODO', title: 'twitter'},
  {Icon: PinterestIcon, url: 'TODO', title: 'pinterest'},
  {Icon: LinkedinIcon, url: 'TODO', title: 'linkedin'},
];

export class Footer extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.inner}>
          <div className={s.top}>
            <img src={logo} alt="logo" />
            <p className={s.description}>{t('footer.description')}</p>
            <ul className={s.socials}>
              {
                socials.map(({Icon, url, title}) => {
                  return (
                    <li key={title}>
                      <a className={s.social} href={url} title={title}><Icon /></a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <span className={s.copyright}>
            © post-to-stop-war.in.ua. 2022 All Rights Reserved.
          </span>
        </div>
      </div>
    );
  }
}
