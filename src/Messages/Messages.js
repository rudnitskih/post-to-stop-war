import React, {Component} from 'react';
import s from './Messages.module.scss';
import {getCountryLanguageDisplayName, getLocaleDirection, getLocaleForCountry} from "../helpers";
import classNames from "classnames";
import {Content} from "../Content";
import showdown from "showdown";
import {ErrorBoundary} from "../ErrorBoundary";

const markdownConverter = new showdown.Converter();

export class Messages extends Component {
  render() {
    const {selectedCountry, data} = this.props;
    const isMultipleColumns = data[0].UkrainianMessage;

    return (
      <Content>
        <ErrorBoundary>
          <div className={classNames(s.root, {[s.ge]: selectedCountry === 'GE'})}>
            <div className={classNames(s.row, s.header)}>
              <div className={s.index}></div>

              {isMultipleColumns && (
                <div className={s.message}>
                  <span className="fi fi-ua"/>
                  {` `}
                  {getCountryLanguageDisplayName('UA').toUpperCase()}
                </div>
              )}
              <div className={s.message}>
                <span className={`fi fi-${selectedCountry.toLowerCase()}`}/>
                {` `}
                {getCountryLanguageDisplayName(selectedCountry).toUpperCase()}
              </div>
            </div>

            {
              data.map(({UkrainianMessage, LocalizedMessage}, i) => {
                return (
                  <div className={s.row}
                       key={i}>
                    <div className={s.index}>{i + 1}.</div>
                    {isMultipleColumns && (
                      <div className={classNames(s.message, s.messageLocal)}>
                        <Message content={UkrainianMessage}/>
                      </div>
                    )}
                    <div
                      dir={getLocaleDirection(getLocaleForCountry(selectedCountry))}
                      className={classNames(s.message, s.messageLocalized)}>
                      <Message content={LocalizedMessage}/>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </ErrorBoundary>
      </Content>
    );
  }
}

const Message = ({content}) => {
  return <div className={s.messageContent} dangerouslySetInnerHTML={{__html: markdownConverter.makeHtml(content)}}/>;
};
