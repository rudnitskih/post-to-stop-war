import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import './global.scss';
import {Messages} from "./Messages";
import {prepareGallery, prepareMessages, prepareTranslations} from "./utils/dataUtils";
import {Gallery} from "./Gallery";
import {logError} from "./utils/errorHandlingUtils";
import {getInitialData, getMessages} from "./utils/backend";
import {setTranslations} from "./utils/translate";
import {AppRoutes} from "./utils/navigationUtils";
import {ProjectPage} from "./ProjectPage";
import {JoinPage} from "./JoinPage";
import {codeLocaleToEnglish, getMessagesLanguage} from "./utils/localeUtils";

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
      const initApp = async function() {
        // set initial data
        const {rawMessages, translations, language} = await getInitialData();

        setTranslations(prepareTranslations(translations));
        setMessages(prepareMessages(rawMessages));

        // load secondary data
        const GALLERY_SOURCE_LANGUAGE = codeLocaleToEnglish.uk;

        const messagesRequest = window.app.isStaticData
          ? Promise.resolve(rawMessages)
          : getMessages(language);

        let [fullRawMessages, gallery] = await Promise.all([
          messagesRequest,
          GALLERY_SOURCE_LANGUAGE === language ? messagesRequest : getMessages(GALLERY_SOURCE_LANGUAGE),
        ]);

        setGallery(prepareGallery(gallery));
        setMessages(prepareMessages(fullRawMessages));
      }

      initApp().catch(logError);
  }, []);

  const onLanguageChanged = async (language) => {
    if (!messages[language]) {
      const messagesForLanguage = await getMessages(getMessagesLanguage(language));

      setMessages({
        ...messages,
        ...prepareMessages(messagesForLanguage),
      });
    }
  }

  const renderInnerRoutes = () => {
    return (
      <>
        <Route index
               element={renderMessages()}/>
        <Route path=":language"
               element={renderMessages()}/>
        <Route path="*"
               element={renderMessages()}/>

        <Route path={AppRoutes.Gallery}
               element={<Gallery items={gallery}/>}/>
        <Route path={AppRoutes.Project} element={<ProjectPage />} />
        <Route path={AppRoutes.Join} element={<JoinPage />} />
      </>
    )
  }

  const renderMessages = () => {
    return <Messages messages={messages} onLanguageChanged={onLanguageChanged} />;
  }

  return messages ? (
    <Routes>
      <Route path="/">
        {renderInnerRoutes()}
      </Route>
      <Route path="/:locale">
        {renderInnerRoutes()}
      </Route>
    </Routes>
  ) : <></>;
}

export default App;

