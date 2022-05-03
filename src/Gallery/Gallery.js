import React, {Component} from 'react';
import Masonry from 'react-masonry-css';
import s from './Gallery.module.scss';
import {Content} from "../old/Content";

export class Gallery extends Component {
  state = {
    visibleCounter: 0,
  };

  rootRef = React.createRef();
  loadedCounter = 0;
  masonryCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

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
        .querySelectorAll(`.${s.masonryGridColumn} img:last-child`)
      ].map((lastImgInColumn) => getTopOffset(lastImgInColumn) + lastImgInColumn.getBoundingClientRect().height)
    );

    if (minColumnBottom < bottomScroll) {
      this.setState({visibleCounter: this.state.visibleCounter + 4});
    }
  }

  render() {
    return (
      <Content rootRef={this.rootRef}>
        <Masonry
          breakpointCols={this.masonryCols}
          className={s.masonryGrid}
          columnClassName={s.masonryGridColumn}>
          {this.props.driveIds.slice(0, this.state.visibleCounter).map((driveId) => {
            return <img
              src={`https://drive.google.com/uc?export=view&id=${driveId}`}
              key={driveId}
              alt=""
            />;
          })}
        </Masonry>
      </Content>
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
