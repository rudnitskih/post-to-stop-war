import React, {Component} from 'react';
import Masonry from 'react-masonry-css';
import s from './Gallery.module.scss';
import {Heading} from "../Heading/Heading";
import {t} from "../utils/translate";
import {ShareMenu} from "../ShareMenu";
import {Tags} from "../Tags";
import {Page} from "../Page";
import {Pagination} from "../Pagination";

const ITEMS_PER_PAGE = 12;
const initialRange = [0, ITEMS_PER_PAGE];

export class Gallery extends Component {
  state = {
    selectedTag: null,
    activeRange: initialRange,
  };

  masonryCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  get filteredItems() {
    const {selectedTag} = this.state;

    return this.props.items
      .filter(({tags}) => !selectedTag || tags.includes(selectedTag));
  }

  onTagChanged = (selectedTag) => {
    this.setState({selectedTag, activeRange: initialRange});
  };

  setActiveRange = (activeRange) => {
    this.setState({activeRange});
    window.scrollTo({
      top: 0,
    });
  };

  render() {
    const {activeRange} = this.state;
    const tags = Array.from(new Set(this.props.items.flatMap(({tags}) => tags)));

    return (
      <Page>
        <div className={s.headingWrapper}>
          <Heading>{t('gallery.title')}</Heading>
        </div>

        <div className={s.root}>
          <div className={s.content}>
            <Tags tags={tags}
                  selectedTag={this.state.selectedTag}
                  onChange={this.onTagChanged}/>

            <Masonry
              breakpointCols={this.masonryCols}
              className={s.masonryGrid}
              columnClassName={s.masonryGridColumn}>
              {this.filteredItems
                .slice(activeRange[0], activeRange[1])
                .map((item) => {
                  const {id, thumbnails, filename} = item;
                  const poster = thumbnails?.large?.url;

                  return (
                    <div className={s.item}
                         key={id}>
                      <img src={poster}
                           alt={filename}
                           className={s.itemImg}/>

                      <div className={s.shareMenu}>
                        <ShareMenu poster={item}
                                   posterName={filename}/>
                      </div>
                    </div>
                  );
                })}
            </Masonry>

            <Pagination
              itemsCount={this.filteredItems.length}
              itemsPerPage={ITEMS_PER_PAGE}
              activeRange={activeRange}
              onChange={this.setActiveRange}
            />

            <div className={s.footer}>
              <Heading apperance="H4">
                <div dangerouslySetInnerHTML={{__html: t('gallery.for-creators', true)}}/>
              </Heading>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
