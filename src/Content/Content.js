import React, {Component} from 'react';
import s from './Content.module.scss';

export class Content extends Component {
  render() {
    return (
      <div className={s.root}>
        {this.props.children}
      </div>
    );
  }
}
