import React, {Component} from 'react';
import s from './ProjectPage.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";

export class ProjectPage extends Component {
  render() {
    return (
      <div>
        <Heading>{t('project.title')}</Heading>
      </div>
    );
  }
}
