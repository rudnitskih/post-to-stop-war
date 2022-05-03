import React from 'react';
import { Routes, Route } from "react-router-dom";
import s from './App.module.scss';
import './global.scss';
import {CountrySelector} from "./old/CountrySelector";
import {Messages} from "./Messages";
import {Main} from "./old/Main";
import {Info} from "./old/Info";
import {Footer} from "./Footer";
import {getCountryDisplayName} from "./utils/localeUtils";
import {combineMessages, loadSpreadsheet} from "./utils/dataUtils";
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

export class App extends React.Component {
  state = {
    isReady: false,
    messages: {},
    countries: [],
    gallery: [],
  };

  async componentDidMount() {
    try {
      const [messages, translations] = await Promise.all([
        getMessages(),
        getContent()
      ]);

      setTranslations(translations);

      this.setState({
        isReady: true,
      });
    } catch (error) {
      logError(error);
    }
  }

  render() {
    const {isReady} = this.state;

    return isReady ? (
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

        <Footer/>
      </>
    ) : <></>;
  }

  renderInnerRoutes = () => {
    return (
      <>
        <Route path={AppRoutes.Gallery} element={<Gallery />} />
        <Route path={AppRoutes.Project} element={<ProjectPage />} />
        <Route path={AppRoutes.Join} element={<JoinPage />} />
        <Route index element={<Messages />} />
        <Route path=":language" element={<Messages />} />
        <Route path="/:locale/:language" element={<Messages />} />
        <Route path="*" element={<Messages />} />
      </>
    )
  }
}

export default App;

