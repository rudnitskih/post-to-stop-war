import React, {useEffect, useRef, useState} from 'react';
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

  const tags = Array.from(new Set(languageMessages.flatMap(({tags}) => tags)));

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
  }, [language, onLanguageChanged]);

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

                      <div className={s.cardInner}>
                        <span className={s.cardDate}>{date.toLocaleDateString(language)}</span>
                        <Message locale={language}
                                 content={content}/>

                        <div className={s.shareMenu}>
                          <ShareMenu text={content}
                                     poster={poster}/>
                        </div>
                      </div>
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
  {fallback: <p>Couldn't load messages ???? </p> }
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
