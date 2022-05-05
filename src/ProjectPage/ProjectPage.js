import React, {Component} from 'react';
import s from './ProjectPage.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";

export class ProjectPage extends Component {
  render() {
    return (
      <div className={s.root}>
        <Heading>{t('project.title')}</Heading>

        <div className={s.content}>
          {[
            {title: 'project.item_1.title', content: 'project.item_1.content'},
            {title: 'project.item_2.title', content: 'project.item_2.content'},
            {title: 'project.item_3.title', content: 'project.item_3.content'},
            {title: 'project.item_4.title', content: 'project.item_4.content'},
            {title: 'project.item_5.title', content: 'project.item_5.content'},
          ].map(({title, content}) => {
            return (
              <div className={s.item}>
                <h4 key={title}
                    className={s.itemTitle}>{t(title)}</h4>
                <p className={s.itemContent}
                   dangerouslySetInnerHTML={{__html: t(content, true)}}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
