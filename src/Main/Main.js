import React, {Component} from 'react';
import s from './Main.module.scss';
import logo from './logo.svg';
import post from './post.png';
import {t} from "../utils/translate";
import classNames from "classnames";
import {getSiteLang} from "../utils/urlUtils";

export class Main extends Component {
  render() {
    const {setSiteLang} = this.props;

    return (
      <div className={s.root}>
        <div className={s.inner}>
          <div className={s.header}>
            <div className={s.logo}>
              <img src={logo}
                   alt="Post Stop War"/>
              <span className={s.domain}>in.ua</span>
            </div>


            <div className={s.languageSelector}>
              {
                ['ua', 'en'].map((siteLang) => (
                  <button
                    onClick={() => setSiteLang(siteLang)}
                    className={classNames(s.languageItem, {
                      [s.selected]: getSiteLang() === siteLang,
                    })}>
                    {siteLang}
                  </button>
                ))
              }
            </div>
          </div>

          <div className={s.content}>
            <div className={s.infoColumn}>
              <h1 className={s.heading}>
                {t('main.title.1')}<br/>
                <span className={s.highlight}>{t('main.title.2')}</span><br/>
                {t('main.title.3')}
              </h1>
              <div className={s.descriptionWrapper}>
                <span className={s.aim}>{t('main.aim')}:</span>
                <p className={s.description}>
                  {t('main.description')}
                </p>
              </div>
            </div>

            <div className={s.illustrationColumn}>
              <img src={post} alt="" className={s.postIllustration}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
