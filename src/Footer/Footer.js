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
  {Icon: FacebookIcon, urlKey: 'social.link.facebook', title: 'facebook'},
  {Icon: InstagramIcon, urlKey: 'social.link.instagram', title: 'instagram'},
  {Icon: TwitterIcon, urlKey: 'social.link.twitter', title: 'twitter'},
  {Icon: PinterestIcon, urlKey: 'social.link.pinterest', title: 'pinterest'},
  {Icon: LinkedinIcon, urlKey: 'social.link.linkedin', title: 'linkedin'},
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
                socials.map(({Icon, urlKey, title}) => {
                  return (
                    <li key={title}>
                      <a className={s.social} href={t(urlKey)} title={title}><Icon /></a>
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
