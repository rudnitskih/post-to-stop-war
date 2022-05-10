import React, {Component} from 'react';
import s from './JoinPage.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";
import {ReactComponent as AlertIcon} from './alert.svg';
import {ReactComponent as HandIcon} from './hand.svg';
import {ReactComponent as HeartIcon} from './heart.svg';
import {ReactComponent as ShareIcon} from './share.svg';
import {Socials} from "../Socials/Socials";


export class JoinPage extends Component {
  render() {
    return (
      <div className={s.root}>
        <Heading>{t('join.title')}</Heading>

        <div className={s.help}>
          <Heading apperance="H3">{t('join.help.title')}</Heading>

          {
            [
              {title: 'join.help.item_1.title', content: 'join.help.item_1.content', Icon: ShareIcon},
              {title: 'join.help.item_2.title', content: 'join.help.item_2.content', Icon: HeartIcon},
              {title: 'join.help.item_3.title', content: 'join.help.item_3.content', Icon: AlertIcon},
              {title: 'join.help.item_4.title', content: 'join.help.item_4.content', Icon: HandIcon},
            ].map(({title, content, Icon}) => {
              return (
                <div key={title}
                     className={s.helpItem}>
                  <Icon className={s.helpIcon}/>
                  <h5 className={s.helpTitle}>{t(title)}</h5>
                  <p dangerouslySetInnerHTML={{__html: t(content, true)}}/>
                </div>
              );
            })
          }
        </div>

        <Heading apperance="H3">{t('join.ideas.title')}</Heading>

        <p dangerouslySetInnerHTML={{__html: t('join.ideas.part_1', true)}}/>

        <Socials large={true} />
      </div>
    );
  }
}
