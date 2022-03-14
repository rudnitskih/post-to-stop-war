import React, {Component} from 'react';
import { ReactComponent as CopyIcon } from './copy.svg';
import copy from 'copy-to-clipboard';
import s from './ShareMenu.module.scss';

export class ShareMenu extends Component {
  onCopyClicked = () => {
    copy(`${this.props.markdownContent} #StandWithUkraine`);
  }

  render() {
    return (
      <div>
        <button onClick={this.onCopyClicked}><CopyIcon /></button>
      </div>
    );
  }
}
