import React, {Component} from 'react';
import s from './Heading.module.scss';

export class Heading extends Component {
  render() {
    switch (this.props.apperance) {
      case "H3":
        return <h3 className={s.h3}>{this.props.children}</h3>
      default:
        return <h1 className={s.h1}>{this.props.children}</h1>

    }
  }
}
