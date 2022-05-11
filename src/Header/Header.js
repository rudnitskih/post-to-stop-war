import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import s from './Header.module.scss';
import logo from './logo.svg';
import {AppRoutes} from "../utils/navigationUtils";
import {t} from "../utils/translate";
import classNames from "classnames";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useLocation().pathname;
  const pathParts = pathname.split('/');
  const firstParameter = pathParts[1];
  let langPart;
  let pagePart;

  if (pathParts.length === 3) {
    langPart = pathParts[1];
    pagePart = pathParts[2];
  } else if (['ua', 'en'].includes(firstParameter)) {
    langPart = firstParameter;
  } else {
    pagePart = firstParameter;
  }

  const getPageLink = (page) => {
    if (page === AppRoutes.Main && langPart?.length === 2 && pagePart?.length === 2) {
      return pathname;
    } else {
      return langPart && langPart !== 'en' ? `${langPart}/${page}` : page;
    }
  }

  const getLangLink = (lang) => {
    return pagePart ? `${lang}/${pagePart}` : lang ? `${lang}/` : lang;
  }

  const menu = [
    {path: AppRoutes.Main, titleKey: 'header.menu.messages'},
    {path: AppRoutes.Gallery, titleKey: 'header.menu.gallery'},
    {path: AppRoutes.Project, titleKey: 'header.menu.project'},
    {path: AppRoutes.Join, titleKey: 'header.menu.join'},
  ];

  return (
    <header className={s.root}>
      <NavLink to={getPageLink(menu[0].path)}
               className={s.logo}>
        <img src={logo}
             alt="logo"/>
      </NavLink>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={classNames(s.hamburgerButton, {[s.active]: isMenuOpen})}>
        <span className={s.hamburgerBox}>
          <span className={s.hamburgerInner}/>
        </span>
      </button>


      <div className={classNames(s.navigationItems, {[s.active]: isMenuOpen})}>
        <nav>
          <ul className={s.menu}>
            {
              menu.map(({path, titleKey}) => {
                return (
                  <li key={titleKey}>
                    <NavLink to={getPageLink(path)}
                             className={({isActive}) => classNames(s.link, {
                               [s.active]: isActive,
                             })}
                             onClick={() => setIsMenuOpen(false)}>
                      {t(titleKey)}
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
        </nav>

        <div className={s.langSelector}>
          {
            [
              {title: 'En', path: ''},
              {title: 'Ua', path: 'ua'},
            ].map(({title, path}) => {
              return (
                <Link key={title}
                      to={getLangLink(path)}
                      className={classNames(s.langItem, {
                        [s.active]: path.includes('ua') ? langPart === 'ua' : langPart !== 'ua'
                      })}
                      onClick={() => setIsMenuOpen(false)}>
                  {title}
                </Link>
              )
            })
          }
        </div>
      </div>

    </header>
  );
}
