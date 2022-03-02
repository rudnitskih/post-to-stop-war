import React, {Component} from 'react';
import s from './Messages.module.scss';
import {getCountryDisplayName} from "../helpers";
import classNames from "classnames";

export class Messages extends Component {
  render() {
    const {selectedCountry, data} = this.props;

    return (
      <div className={s.root}>
        <div className={classNames(s.row, s.header)}>
          <div className={s.index}></div>
          <div className={s.message}>
            <span className="fi fi-ua"/>
            {` `}
            {getCountryDisplayName('UA').toUpperCase()}
          </div>
          <div className={s.message}>
            <span className={`fi fi-${selectedCountry.toLowerCase()}`}/>
            {` `}
            {getCountryDisplayName(selectedCountry).toUpperCase()}
          </div>
        </div>

        {
          data.map(({UkrainianMessage, LocalizedMessage}, i) => {
            return (
              <div className={s.row}
                   key={i}>
                <div className={s.index}>{i + 1}.</div>
                <div className={s.message}>{UkrainianMessage}</div>
                <div className={s.message}>{LocalizedMessage} </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
