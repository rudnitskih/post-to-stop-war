import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import './global.scss';
import {Messages} from "./Messages";
import {prepareGallery, prepareMessages} from "./utils/dataUtils";
import {Gallery} from "./Gallery";
import {logError} from "./utils/errorHandlingUtils";
import {getContent, getGallery, getMessages} from "./utils/backend";
import {setTranslations} from "./utils/translate";
import {AppRoutes} from "./utils/navigationUtils";
import {ProjectPage} from "./ProjectPage";
import {JoinPage} from "./JoinPage";
import {useLocation} from "react-router";


const App = () => {
  const [gallery, setGallery] = useState(null);
  const [messages, setMessages] = useState(window.app.messages);
  const [,,maybeLanguage] = useLocation().pathname.split('/');

  useEffect(async () => {
    try {
      let [rawMessages, translations, gallery] = await Promise.all([
        getMessages(maybeLanguage?.length === 2 ? maybeLanguage : undefined),
        getContent(),
        getGallery(),
      ]);

      setTranslations(translations);
      setGallery(prepareGallery(gallery));
      setMessages(prepareMessages(rawMessages));
    } catch (error) {
      logError(error);
    }
  }, []);

  const onLanguageChanged = async (language) => {
    if (!messages[language]) {
      const messagesForLanguage = await getMessages(language);

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
    return <Messages messages={messages} onLanguageChanged={onLanguageChanged}/>;
  }

  return window.app.messages ? (
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

