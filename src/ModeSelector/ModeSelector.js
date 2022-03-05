import React, {Component} from 'react';
import s from './ModeSelector.module.scss';
import classNames from "classnames";

export const ViewMode = {
  MESSAGES: 'MESSAGES',
  GALLERY: 'GALLERY',
};

export class ModeSelector extends Component {
  onChange = (e) => {
    const {value} = e.target;
    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <div className={s.root}>
        {
          [
            {
              id: ViewMode.MESSAGES,
              text: 'Месиджі',
            },
            {
              id: ViewMode.GALLERY,
              text: 'Візуал',
            }
          ].map(({id, text}) => {
            const checked = this.props.value === id;

            return (
              <label
                className={classNames(s.tab, {[s.checked]: checked})}
                key={id}>
                <input
                  className={s.input}
                  type="radio"
                  name="ModeSelector"
                  value={id}
                  checked={checked}
                  onChange={this.onChange}
                />
                {text}
              </label>
            );
          })
        }
      </div>
    );
  }
}
