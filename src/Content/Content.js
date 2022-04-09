import React, {Component} from 'react';
import s from './Content.module.scss';
import classNames from "classnames";

export class Content extends Component {
  render() {
    return (
      <div className={classNames(s.root, this.props.className)} ref={this.props.rootRef}>
        {this.props.children}
      </div>
    );
  }
}
