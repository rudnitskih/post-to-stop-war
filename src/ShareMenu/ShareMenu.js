import React, {Component} from 'react';
import { saveAs } from 'file-saver';
import {ReactComponent as CopyIcon} from './copy.svg';
import {ReactComponent as TwitterIcon} from './twitter.svg';
import {ReactComponent as FacebookIcon} from './facebook.svg';
import {ReactComponent as ShareAOSIcon} from './share-aos.svg';
import {ReactComponent as ShareIOSIcon} from './share-ios.svg';
import {ReactComponent as DownloadIcon} from './download.svg';

import copy from 'copy-to-clipboard';
import s from './ShareMenu.module.scss';
import classNames from "classnames";
import {getPosterUrl} from "../utils/dataUtils";

export class ShareMenu extends Component {
  get hashtag() {
    return '#StandWithUkraine';
  }
  get textWithHashtag() {
    return this.props.text ? `${this.props.text} ${this.hashtag}` : undefined;
  }

  onCopyClicked = () => {
    copy(this.textWithHashtag);
  };

  onNativeShare = async () => {
    try {
      const {poster} = this.props;
      let file;

      if (poster) {
        const {filename, type} = poster;
        const image = await fetch(getPosterUrl(poster));
        const blob = await image.blob();
        file = new File([blob], filename, { type });
      }

      await navigator.share({
        files: file ? [file] : undefined,
        title: 'Post To Stop War',
        text: this.textWithHashtag,
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
      hashtag: this.hashtag,
      media: [getPosterUrl(this.props.poster)],
      quote: this.props.text,
    });
  }

  get isShareApiAvailable() {
    return Boolean(window.navigator.share);
  }

  get isAndroid() {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
  }

  get isGalleryShare() {
    return !this.props.text && this.props.poster;
  }

  download = () => {
    saveAs(getPosterUrl(this.props.poster), this.props.poster.filename);
  }

  render() {
    return (
      <div className={classNames(s.root, {[s.isGalleryShare]: this.isGalleryShare})}>

        {
          this.props.text && (
            <a
              className={classNames(s.button)}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.textWithHashtag)}`}
              target="_blank"
              rel="noreferrer"
              title="Twitter"
            >
              <TwitterIcon/>
            </a>
          )
        }

        <button className={classNames(s.button)}
                onClick={this.onFacebookShareClick}>
          <FacebookIcon/>
        </button>

        {
          this.isShareApiAvailable && (
            <button className={classNames(s.button, s.nativeShare)}
                    onClick={this.onNativeShare}>
              {
                this.isAndroid ? <ShareAOSIcon/> : <ShareIOSIcon/>
              }
            </button>
          )
        }

        {
          this.props.text && (
            <button className={classNames(s.button, s.copy)}
                    onClick={this.onCopyClicked}>
              <CopyIcon/>
              Copy
            </button>
          )
        }

        {
          this.isGalleryShare && (
            <button className={classNames(s.button, s.download)} onClick={this.download}>
              <DownloadIcon />

            </button>
          )
        }
      </div>
    );
  }
}
