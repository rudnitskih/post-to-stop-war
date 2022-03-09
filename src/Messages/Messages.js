import React, {Component} from 'react';
import s from './Messages.module.scss';
import {getCountryLanguageDisplayNames, getLocaleDirection, getLocaleForCountry} from "../helpers";
import classNames from "classnames";
import {Content} from "../Content";
import showdown from "showdown";
import {ErrorBoundary} from "../ErrorBoundary";

const markdownConverter = new showdown.Converter();

export class Messages extends Component {
  render() {
    const {selectedCountry, data} = this.props;
    const countryDisplayLanguages = getCountryLanguageDisplayNames(selectedCountry);

    const columnsConfig = [
      {
        country: 'UA',
        displayLanguage: getCountryLanguageDisplayNames('UA')[0],
        visible: data[0].UkrainianMessage
      },
      {
        country: selectedCountry,
        displayLanguage: countryDisplayLanguages[0],
        visible: Boolean(data[0].LocalizedMessage),
      },
      {
        country: selectedCountry,
        displayLanguage: countryDisplayLanguages[1],
        visible: Boolean(data[0].LocalizedMessage_2),
      }
    ];

    const isOneColumn = columnsConfig.filter(({visible}) => visible).length === 1;

    return (
      <Content>
        <ErrorBoundary>
          <div className={s.root}>
            <div className={classNames(s.row, s.header, {
              [s.oneColumn]: isOneColumn,
            })}>
              <div className={s.index}/>

              {
                columnsConfig.filter(({visible}) => visible).map(({country, displayLanguage}) => {
                  return (
                    <div className={s.message}
                         key={`${country}_${displayLanguage}`}>
                      <span className={`fi fi-${country.toLowerCase()}`}/>
                      {` `}
                      {displayLanguage.toUpperCase()}
                    </div>
                  );
                })
              }
            </div>

            {
              data.map(({UkrainianMessage, LocalizedMessage, LocalizedMessage_2}, i) => {
                const localesForCountry = getLocaleForCountry(selectedCountry);


                return (
                  <div
                    key={i}
                    className={classNames(s.row, {
                      [s.oneColumn]: isOneColumn,
                    })}
                  >
                    <div className={s.index}>{i + 1}.</div>

                    {
                      [
                        {
                          visible: columnsConfig[0].visible,
                          content: UkrainianMessage,
                          locale: getLocaleForCountry('UA')[0],
                        },
                        {
                          visible: columnsConfig[1].visible,
                          content: LocalizedMessage,
                          locale: localesForCountry[0],
                        },
                        {
                          visible: columnsConfig[2].visible,
                          content: LocalizedMessage_2,
                          locale: localesForCountry[1],
                        }
                      ]
                        .filter(({visible}) => visible)
                        .map(({content, locale}) => {
                          return (
                            <div
                              key={locale}
                              dir={getLocaleDirection(locale)}
                              className={classNames(s.message, locale)}>
                              <Message content={content}/>
                            </div>
                          );
                        })
                    }
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
