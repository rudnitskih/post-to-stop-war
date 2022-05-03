import React, {Component} from 'react';
import s from './JoinPage.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";

export class JoinPage extends Component {
  render() {
    return (
      <div>
        <Heading>{t('join.title')}</Heading>
      </div>
    );
  }
}
