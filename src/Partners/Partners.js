import React, {Component} from 'react';
import s from './Partners.module.scss';
import {ReactComponent as FlagComponent} from './flag.svg';
import {t} from "../utils/translate";

export class Partners extends Component {
  render() {
    const supportText = t('partners.support');

    return (
      <div className={s.root}>

        <a className={s.support}
           href={t('partners.support-link')}
           title={supportText}
           target="_blank">
          <FlagComponent/>
          <span className={s.supportText}>{supportText}</span>
        </a>
      </div>
    );
  }
}
