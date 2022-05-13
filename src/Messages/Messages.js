import React, {useEffect, useState} from 'react';
import s from './Messages.module.scss';
import {getLocaleDirection} from "../utils/localeUtils";
import classNames from "classnames";
import showdown from "showdown";
import * as Sentry from "@sentry/react";
import {logEvent} from "../utils/anayliticsUtils";
import {ShareMenu} from "../ShareMenu";
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";
import {LanguageSelector} from "../LanguageSelector";
import {useParams} from "react-router";
import {getPosterUrl} from "../utils/dataUtils";
import {Tags} from "../Tags";
import {Page} from "../Page";

const markdownConverter = new showdown.Converter();

function MessagesPure({messages}) {
  let {language, locale} = useParams();
  language = language || (locale === 'ua' ? 'uk' : 'en');

  const languageMessages = messages[language] || [];
  const tags = Array.from(new Set(languageMessages.flatMap(({tags}) => tags)));

  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    setSelectedTag(null);
  }, [language])

  return (
    <Page>
      <div className={s.headingWrapper}>
        <Heading>{t('main.title')}</Heading>
      </div>

      <div className={s.root}>
        <div className={s.content}>
          <LanguageSelector
            locales={Object.keys(messages)}
          />

          <Tags tags={tags} selectedTag={selectedTag} onChange={setSelectedTag} />

          <div className={s.cards}>
            {
              languageMessages
                .filter(({tags}) => !selectedTag || tags.includes(selectedTag))
                .map(({date, poster, content}, i) => {
                  return (
                    <div className={s.card}
                         key={i}>
                      <div className={s.poster}>
                        <img src={getPosterUrl(poster)}
                             alt={poster.filename}/>
                      </div>

                      <div className={s.cardInner}>
                        <span className={s.cardDate}>{date.toLocaleDateString(language)}</span>
                        <Message locale={language}
                                 content={content}/>

                        <div className={s.shareMenu}>
                          <ShareMenu text={content} poster={poster}/>
                        </div>
                      </div>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    </Page>
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
