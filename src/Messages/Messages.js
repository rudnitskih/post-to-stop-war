import React, {useState} from 'react';
import s from './Messages.module.scss';
import {getLocaleDirection} from "../utils/localeUtils";
import classNames from "classnames";
import showdown from "showdown";
import * as Sentry from "@sentry/react";
import {logEvent} from "../utils/anayliticsUtils";
import {ShareMenu} from "./ShareMenu";
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";
import {LanguageSelector} from "../LanguageSelector";
import {useParams} from "react-router";

const markdownConverter = new showdown.Converter();

function MessagesPure({messages}) {
  let {language, locale} = useParams();
  language ??= locale || 'en';

  const languageMessages = messages[language];
  const tags = Array.from(new Set(messages[language].flatMap(({tags}) => tags)));

  const [selectedTag, setSelectedTag] = useState(null);


  return (
    <>
      <Heading>{t('main.title')}</Heading>

      <div className={s.root}>
        <div className={s.content}>
          <LanguageSelector
            locales={Object.keys(messages)}
            selectedLocale={language}
          />

          <ul className={s.tags}>
            {
              tags.map((tag) => {
                return (
                  <li key={tag}>
                    <button
                      className={classNames(s.tag, {[s.active]: selectedTag === tag})}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {t(tag)}
                    </button>
                  </li>
                );
              })
            }
          </ul>

          <div className={s.cards}>
            {
              languageMessages.map(({date, poster, content}, i) => {
                return (
                  <div className={s.card}
                       key={i}>
                    <div className={s.poster}>
                      <img src={poster} alt=""/>
                    </div>

                    <div className={s.cardInner}>
                      <span className={s.cardDate}>{date.toLocaleDateString(language)}</span>
                      <Message locale={language}
                               content={content}/>

                      <div className={s.shareMenu}>
                        <ShareMenu markdownContent={content}
                                   poster={poster}/>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export const Messages = Sentry.withErrorBoundary(
  MessagesPure,
  {fallback: <p>Couldn't load messages 😢 </p> }
)

const Message = Sentry.withErrorBoundary(({content, locale}) => {
  const htmlContent = markdownConverter.makeHtml(content);

  return (
      <div
        onCopy={() => logEvent('COPY_MESSAGE', {locale})}
        className={classNames(s.message, locale)}
      >
        <span dangerouslySetInnerHTML={{__html: htmlContent}} dir={getLocaleDirection(locale)}/>
      </div>
  );
}, {fallback: <div/>});
