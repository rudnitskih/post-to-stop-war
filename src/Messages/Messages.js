import React, {Component} from 'react';
import s from './Messages.module.scss';
import {getCountryLanguage} from "../helpers";
import classNames from "classnames";
import {Content} from "../Content";

export class Messages extends Component {
  render() {
    const {selectedCountry, data} = this.props;
    const isMultipleColumns = data[0].UkrainianMessage;

    return (
      <Content>
        <div className={s.root}>
          <div className={classNames(s.row, s.header)}>
            <div className={s.index}></div>

            {isMultipleColumns && (
              <div className={s.message}>
                <span className="fi fi-ua"/>
                {` `}
                {getCountryLanguage('uk').toUpperCase()}
              </div>
            )}
            <div className={s.message}>
              <span className={`fi fi-${selectedCountry.toLowerCase()}`}/>
              {` `}
              {getCountryLanguage(selectedCountry).toUpperCase()}
            </div>
          </div>

          {
            data.map(({UkrainianMessage, LocalizedMessage}, i) => {
              return (
                <div className={s.row}
                     key={i}>
                  <div className={s.index}>{i + 1}.</div>
                  {isMultipleColumns && <div className={classNames(s.message, s.messageLocal)}>{UkrainianMessage}</div>}
                  <div className={s.message}>{LocalizedMessage} </div>
                </div>
              );
            })
          }
        </div>
      </Content>
    );
  }
}
