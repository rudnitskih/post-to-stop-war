import React, {Component} from 'react';
import s from './Content.module.scss';

export class Content extends Component {
  render() {
    return (
      <div className={s.root} ref={this.props.rootRef}>
        {this.props.children}
      </div>
    );
  }
}
