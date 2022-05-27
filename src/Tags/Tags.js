import React, {Component} from 'react';
import s from './Tags.module.scss';
import classNames from "classnames";
import {t} from "../utils/translate";
import {logEvent} from "../utils/anayliticsUtils";

export class Tags extends Component {
  render() {
    const {onChange, tags, selectedTag} = this.props;

    const onClick = (tag) => {
      const newTag = selectedTag === tag ? null : tag;

      onChange(newTag);
      logEvent('CLICK_TAG', {
        value: newTag || 'UNSELECT',
      })
    }

    return tags.length > 1 ? (
      <ul className={s.root}>
        {
          tags.map((tag) => {
            return (
              <li key={tag}>
                <button
                  className={classNames(s.tag, {[s.active]: selectedTag === tag})}
                  onClick={() => onClick(tag)}
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
