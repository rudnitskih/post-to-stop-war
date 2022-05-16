import React, {Component} from 'react';
import s from './Heading.module.scss';

export class Heading extends Component {
  render() {
    const {apperance, children} = this.props;

    switch (apperance) {
      case "H3":
        return <h3 className={s.h3}>{children}</h3>
      case "H4":
        return <h4 className={s.h4}>{children}</h4>
      default:
        return <h1 className={s.h1}>{children}</h1>

    }
  }
}
