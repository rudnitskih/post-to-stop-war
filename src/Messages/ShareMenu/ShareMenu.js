import React, {Component} from 'react';
import {ReactComponent as CopyIcon} from './copy.svg';
import {ReactComponent as TwitterIcon} from './twitter.svg';
import {ReactComponent as FacebookIcon} from './facebook.svg';
import {ReactComponent as ShareAOSIcon} from './share-aos.svg';
import {ReactComponent as ShareIOSIcon} from './share-ios.svg';

import copy from 'copy-to-clipboard';
import s from './ShareMenu.module.scss';
import classNames from "classnames";

export class ShareMenu extends Component {

  get text() {
    return `${this.props.markdownContent} #StandWithUkraine`;
  }

  onCopyClicked = () => {
    copy(this.text);
  };

  onNativeShare = async () => {
    try {
      await navigator.share({
        title: 'Post To Stop War',
        text: this.text,
      })
    } catch(e) {
      if (!e.toString().includes('AbortError')) {
        throw e;
      }
    }
  }

  onFacebookShareClick = () => {
    window?.FB.ui({
      method: 'share',
      hashtag: '#StandWithUkraine',
      quote: this.props.markdownContent,
      href: document.location.href.includes('localhost') ? 'https://post-to-stop-war.in.ua/' : document.location.href,
    });
  }

  get isShareApiAvailable() {
    return Boolean(window.navigator.share);
  }

  get isAndroid() {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
  }

  render() {
    return (
      <div className={s.root}>
        <button className={classNames(s.button, s.copy)}
                onClick={this.onCopyClicked}>
          <CopyIcon/>
          Copy
        </button>

        <div className={s.divider}/>

        <span className={s.shareLabel}>Share:</span>

        {
          this.isShareApiAvailable && (
            <button className={classNames(s.button, s.nativeShare)} onClick={this.onNativeShare}>
              {
                this.isAndroid ? <ShareAOSIcon /> : <ShareIOSIcon/>
              }
            </button>
          )
        }

        <a
          className={classNames(s.button, s.twitter)}
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.text)}`}
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <TwitterIcon/>
        </a>

        <button className={classNames(s.button, s.facebook)}
                onClick={this.onFacebookShareClick}>
          <FacebookIcon/>
        </button>
      </div>
    );
  }
}