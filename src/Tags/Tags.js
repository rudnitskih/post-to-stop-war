import React, {Component} from 'react';
import s from './Tags.module.scss';
import classNames from "classnames";
import {t} from "../utils/translate";

export class Tags extends Component {
  render() {
    const {onChange, tags, selectedTag} = this.props;

    return tags.length > 1 ? (
      <ul className={s.root}>
        {
          tags.map((tag) => {
            return (
              <li key={tag}>
                <button
                  className={classNames(s.tag, {[s.active]: selectedTag === tag})}
                  onClick={() => selectedTag === tag ? onChange(null) : onChange(tag)}
                >
                  {t(tag)}
                </button>
              </li>
            );
          })
        }
      </ul>
    ) : null;
  }
}
