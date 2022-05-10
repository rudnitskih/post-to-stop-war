import React from 'react';
import {Route, Routes} from "react-router-dom";
import './global.scss';
import {Messages} from "./Messages";
import {Footer} from "./Footer";
import {prepareMessages} from "./utils/dataUtils";
import {Gallery} from "./Gallery";
import {logError} from "./utils/errorHandlingUtils";
import {getContent, getGallery, getMessages} from "./utils/backend";
import {setTranslations} from "./utils/translate";
import {AppRoutes} from "./utils/navigationUtils";
import {ProjectPage} from "./ProjectPage";
import {JoinPage} from "./JoinPage";
import {Header} from "./Header/Header";
import {Partners} from "./Partners";

export class App extends React.Component {
  state = {};

  async componentDidMount() {
    try {
      let [messages, translations, gallery] = await Promise.all([
        getMessages(),
        getContent(),
        getGallery(),
      ]);

      setTranslations(translations);

      this.setState({
        messages: prepareMessages(messages),
        gallery,
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

        <Route path={AppRoutes.Gallery} element={<Gallery items={this.state.gallery}/>} />
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

