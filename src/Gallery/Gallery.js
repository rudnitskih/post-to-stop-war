import React, {Component} from 'react';
import Masonry from 'react-masonry-css'
import s from './Gallery.module.scss';
import {Content} from "../Content";

export class Gallery extends Component {
  masonryCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

  render() {
    return (
      <Content>
        <Masonry
          breakpointCols={this.masonryCols}
          className={s.masonryGrid}
          columnClassName={s.masonryGridColumn}>
          {this.props.driveIds.map((driveId) => {
            return <img src={`https://drive.google.com/uc?export=view&id=${driveId}`} key={driveId} />
          })}
        </Masonry>

      </Content>
    );
  }
}
