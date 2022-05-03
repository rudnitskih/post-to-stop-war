import React, {Component} from 'react';
import s from './Heading.module.scss';

export class Heading extends Component {
  render() {
    return (
      <h1 className={s.root}>{this.props.children}</h1>
    );
  }
}
