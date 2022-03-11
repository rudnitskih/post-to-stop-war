import React, {Component} from 'react';
import s from './Footer.module.scss';
import {t} from "../utils/translate";

export class Footer extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.inner}>
          {t('footer.description')}
          <a href="https://forms.gle/wKSohwAF4K5ZReWe8" target="_blank" rel="noreferrer">
            {t('footer.link')}
          </a>.
        </div>
      </div>
    );
  }
}
