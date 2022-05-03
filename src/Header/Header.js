import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import s from './Header.module.scss';
import logo from './logo.svg';
import {AppRoutes} from "../utils/navigationUtils";
import {t} from "../utils/translate";
import classNames from "classnames";

export function Header() {
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
    return langPart ? `${langPart}/${page}` : page;
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
      <NavLink to={getPageLink(menu[0].path)} className={s.logo}>
        <img src={logo} alt="logo" />
      </NavLink>


      <nav>
        <ul className={s.menu}>
          {
            menu.map(({path, titleKey}) => {
              return (
                <li key={titleKey}>
                  <NavLink to={getPageLink(path)} className={({isActive}) => classNames(s.link, {
                    [s.active]: isActive,
                  })}>
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
            {title: 'Ua', path: ''},
            {title: 'En', path: 'en'},
          ].map(({title, path}) => {
            return (
              <Link key={title} to={getLangLink(path)} className={classNames(s.langItem, {
                [s.active]: path.includes('en') ? langPart === 'en' : langPart !== 'en'
              })}>
                {title}
              </Link>
            )
          })
        }
      </div>

    </header>
  );
}
