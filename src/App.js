import React from 'react';
import { Routes, Route } from "react-router-dom";
import s from './App.module.scss';
import './global.scss';
import {Messages} from "./Messages";
import {Main} from "./old/Main";
import {Info} from "./old/Info";
import {Footer} from "./Footer";
import {getCountryDisplayName} from "./utils/localeUtils";
import {combineMessages, loadSpreadsheet, prepareMessages} from "./utils/dataUtils";
import {Gallery} from "./Gallery";
import {ModeSelector, ViewMode} from "./old/ModeSelector";
import {logError} from "./utils/errorHandlingUtils";
import {getSelectedCountry, getSiteLang, setSelectedCountry, setSiteLang} from "./utils/urlUtils";
import {logEvent} from "./utils/anayliticsUtils";
import {getContent, getMessages} from "./utils/backend";
import {setTranslations} from "./utils/translate";
import {AppRoutes} from "./utils/navigationUtils";
import {ProjectPage} from "./ProjectPage";
import {JoinPage} from "./JoinPage";
import {Header} from "./Header/Header";
import {Partners} from "./Partners";

export class App extends React.Component {
  state = {
    messages: null,
    selectedTag: null,
  };

  async componentDidMount() {
    try {
      let [messages, translations] = await Promise.all([
        getMessages(),
        getContent()
      ]);

      setTranslations(translations);
      messages = prepareMessages(messages);

      this.setState({
        messages,
      });
    } catch (error) {
      logError(error);
    }
  }

  render() {
    const {messages} = this.state;

    return messages ? (
      <>
        <Header />

        <Routes>
          <Route path="/">
            {this.renderInnerRoutes()}
          </Route>
          <Route path="/:locale">
            {this.renderInnerRoutes()}
          </Route>
        </Routes>

        <Partners />
        <Footer/>
      </>
    ) : <></>;
  }

  renderInnerRoutes = () => {

    return (
      <>
        <Route index element={this.renderMessages()} />
        <Route path=":language" element={this.renderMessages()} />
        <Route path="*" element={this.renderMessages()} />

        <Route path={AppRoutes.Gallery} element={<Gallery />} />
        <Route path={AppRoutes.Project} element={<ProjectPage />} />
        <Route path={AppRoutes.Join} element={<JoinPage />} />
      </>
    )
  }

  renderMessages = () => {
    const {messages} = this.state;

    return <Messages messages={messages} />;
  }
}

export default App;

