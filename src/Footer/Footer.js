import React, {Component} from 'react';
import s from './Footer.module.scss';

export class Footer extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.inner}>
          Команда проєкту: студенти і випускники УКУ із залученням бійців креативного фронту та іноземних експертів з комунікацій. <a href="https://forms.gle/wKSohwAF4K5ZReWe8" target="_blank">Залишити відгук</a>.
        </div>
      </div>
    );
  }
}
