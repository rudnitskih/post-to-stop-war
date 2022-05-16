import React, {Component} from 'react';
import s from './Socials.module.scss';
import {t} from "../utils/translate";
import {ReactComponent as FacebookIcon} from "../Footer/facebook.svg";
import {ReactComponent as InstagramIcon} from "./instagram.svg";
import {ReactComponent as TwitterIcon} from "./twitter.svg";
import {ReactComponent as PinterestIcon} from "./pinterest.svg";
import {ReactComponent as LinkedinIcon} from "./linkedin.svg";
import classNames from "classnames";

export class Socials extends Component {
  render() {
    return (
      <ul className={classNames(s.root, {
        [s.large]: this.props.large,
      })}>
        {
          [
            {Icon: FacebookIcon, urlKey: 'social.link.facebook', title: 'facebook'},
            {Icon: InstagramIcon, urlKey: 'social.link.instagram', title: 'instagram'},
            {Icon: TwitterIcon, urlKey: 'social.link.twitter', title: 'twitter'},
            {Icon: PinterestIcon, urlKey: 'social.link.pinterest', title: 'pinterest'},
            {Icon: LinkedinIcon, urlKey: 'social.link.linkedin', title: 'linkedin'},
          ].filter(({urlKey}) => t(urlKey)).map(({Icon, urlKey, title}) => {
            return (
              <li key={title}>
                <a className={s.social}
                   href={t(urlKey)}
                   title={title}><Icon/></a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
