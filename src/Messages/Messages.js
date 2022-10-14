import React, {useEffect, useRef, useState} from 'react';
import s from './Messages.module.scss';
import {getLocaleDirection} from "../utils/localeUtils";
import classNames from "classnames";
import showdown from "showdown";
import * as Sentry from "@sentry/react";
import {logEvent} from "../utils/anayliticsUtils";
import {ShareMenu} from "../ShareMenu";
import {Heading} from "../Heading/Heading";
import {getTranslations, t} from "../utils/translate";
import {LanguageSelector} from "../LanguageSelector";
import {useParams} from "react-router";
import {getPosterUrl} from "../utils/dataUtils";
import {Tags} from "../Tags";
import {Page} from "../Page";
import {Pagination} from "../Pagination";

const markdownConverter = new showdown.Converter();

const ITEMS_PER_PAGE = 6;
const initialRange = [0, ITEMS_PER_PAGE];

function MessagesPure({messages, onLanguageChanged}) {
  const contentRef = useRef(null);
  let {language, locale} = useParams();
  language = language || (locale === 'ua' ? 'uk' : 'en');

  const [languageMessages, setLanguageMessages] = useState(messages[language] || []);
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeRange, setActiveRange] = useState(initialRange);

  const onPaginationClick = (newRange) => {
    setActiveRange(newRange);

    contentRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  const tags = Object.keys(getTranslations()).filter((key) => key.startsWith('main.tags'));

  const filteredMessages = languageMessages
    .filter(({tags}) => !selectedTag || tags.includes(selectedTag));

  useEffect(() => {
    if (messages[language]) {
      setLanguageMessages(messages[language]);
    }
  }, [language, messages]);

  useEffect(() => {
    setSelectedTag(null);
    onLanguageChanged(language);
  }, [language]);

  useEffect(() => {
    setActiveRange(initialRange);
  }, [languageMessages, selectedTag]);

  return (
    <Page>
      <div className={s.headingWrapper}>
        <Heading>{t('main.title')}</Heading>
      </div>

      <div className={s.root}>
        <div className={s.content}
             ref={contentRef}>
          <LanguageSelector
            locales={Object.keys(messages)}
          />

          <Tags tags={tags}
                selectedTag={selectedTag}
                onChange={setSelectedTag}/>

          <div className={s.cards}>
            {
              filteredMessages
                .slice(activeRange[0], activeRange[1])
                .map(({date, poster, content}, i) => {
                  return (
                    <div className={s.card}
                         key={i}>
                      <div className={s.poster}>
                        <img src={getPosterUrl(poster)}
                             alt={poster.filename}/>
                      </div>

                      <CardInner locale={language} poster={poster} date={date} content={content}/>
                    </div>
                  );
                })
            }
          </div>

          <Pagination
            itemsCount={filteredMessages.length}
            itemsPerPage={ITEMS_PER_PAGE}
            activeRange={activeRange}
            onChange={onPaginationClick}
          />
        </div>
      </div>
    </Page>
  );
}

export const Messages = Sentry.withErrorBoundary(
  MessagesPure,
  {fallback: <p>Couldn't load messages 😢 </p> }
)

const CardInner = Sentry.withErrorBoundary(({date, content, locale, poster}) => {
  const htmlContent = markdownConverter.makeHtml(content);
  const textContent = htmlToPlainText(htmlContent);

  return (
    <div className={s.cardInner}>
      <span className={s.cardDate}>{date.toLocaleDateString(locale)}</span>
      <div
        onCopy={() => logEvent('COPY_MESSAGE', {locale})}
        className={classNames(s.message, locale)}
      >
        <span dangerouslySetInnerHTML={{__html: htmlContent}} dir={getLocaleDirection(locale)}/>
      </div>

      <div className={s.shareMenu}>
        <ShareMenu text={textContent}
                   poster={poster}/>
      </div>
    </div>
  );
}, {fallback: <div/>});

function htmlToPlainText(html) {
  // replace <p> to new line
  html = html.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '\n')

  return new DOMParser()
    .parseFromString(html, "text/html")
    .documentElement.textContent;
}
