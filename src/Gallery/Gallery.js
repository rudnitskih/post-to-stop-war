import React, {Component} from 'react';
import Masonry from 'react-masonry-css';
import s from './Gallery.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";
import {ShareMenu} from "../ShareMenu";
import {Tags} from "../Tags";
import {Page} from "../Page";

export class Gallery extends Component {
  state = {
    visibleCounter: 0,
    selectedTag: null,
  };

  rootRef = React.createRef();
  loadedCounter = 0;
  masonryCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  get visibleItems() {
    const {selectedTag, visibleCounter} = this.state;

    return this.props.items
      .filter(({tags}) => !selectedTag || tags.includes(selectedTag))
      .slice(0, visibleCounter)
  }

  onTagChanged = (selectedTag) => {
    this.loadedCounter = 0;
    this.setState({selectedTag, visibleCounter: 4});
  }

  componentDidMount() {
    this.setState({visibleCounter: 4});

    this.rootRef.current.addEventListener('load', this.handleItemLoaded, true);

    window.addEventListener('scroll', this.handleWindowScroll);
  }

  handleItemLoaded = () => {
    this.loadedCounter++;

    if (this.loadedCounter === this.state.visibleCounter) {
      this.loadMoreItemsIfNeeded();
    }
  };

  handleWindowScroll = debounce(() => {
    this.loadMoreItemsIfNeeded();
  }, 200);

  componentWillUnmount() {
    this.rootRef.current.removeEventListener('load', this.handleItemLoaded, true);
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  loadMoreItemsIfNeeded() {
    if (this.loadedCounter < this.state.visibleCounter) {
      return;
    }

    const bottomScroll = window.scrollY + window.innerHeight;
    const minColumnBottom = Math.min(
      ...[...this.rootRef.current
        .querySelectorAll(`.${s.masonryGridColumn} .${s.item}:last-child`)
      ].map((lastImgInColumn) => getTopOffset(lastImgInColumn) + lastImgInColumn.getBoundingClientRect().height)
    );

    if (minColumnBottom < bottomScroll) {
      this.setState({visibleCounter: this.state.visibleCounter + 4});
    }
  }

  render() {
    const tags = Array.from(new Set(this.props.items.flatMap(({tags}) => tags)));

    return (
      <Page>
        <div className={s.headingWrapper}>
          <Heading>{t('gallery.title')}</Heading>
        </div>

        <div className={s.root} ref={this.rootRef}>
          <div className={s.content}>
            <Tags tags={tags} selectedTag={this.state.selectedTag} onChange={this.onTagChanged}/>

            <Masonry
              breakpointCols={this.masonryCols}
              className={s.masonryGrid}
              columnClassName={s.masonryGridColumn}>
              {this.visibleItems.map((item) => {
                const {id, thumbnails, filename} = item;
                const poster = thumbnails?.large?.url;

                return (
                  <div className={s.item} key={id}>
                    <img src={poster} alt={filename} className={s.itemImg} />

                    <div className={s.shareMenu}>
                      <ShareMenu poster={item} posterName={filename}/>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          </div>
        </div>
      </Page>
    );
  }
}

// ref: https://stackoverflow.com/a/442474
function getTopOffset(el) {
  let topOffset = 0;
  while (el && !isNaN(el.offsetTop)) {
    topOffset += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return topOffset;
}

// ref: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}
