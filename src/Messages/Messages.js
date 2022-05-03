import React from 'react';
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
  const {language} = useParams();

  return (
    <div className={s.root}>
      <Heading>{t('main.title')}</Heading>

      <div className={s.content}>
        <LanguageSelector locales={Object.keys(messages)} selectedLocale={language}/>
      </div>
    </div>
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

        {
          locale !== 'uk' && (
            <div className={s.shareMenu}>
              <ShareMenu markdownContent={content} />
            </div>
          )
        }
      </div>
  );
}, {fallback: <div/>});
