import React, {Component} from 'react';
import s from './Pagination.module.scss';
import classNames from "classnames";

export class Pagination extends Component {

  get pagesCount() {
    const {itemsCount, itemsPerPage} = this.props;

    return Math.ceil(itemsCount / itemsPerPage);
  }

  get activePage() {
    const {activeRange, itemsPerPage} = this.props;

    return Math.floor(activeRange[0] / itemsPerPage);
  }

  onClick = (i) => {
    const {itemsPerPage, activePage, onChange} = this.props;
    const startRange = i * itemsPerPage;

    if (i !== activePage) {
      onChange([startRange, startRange + itemsPerPage]);
    }
  };

  render() {
    return this.pagesCount > 1 ? (
      <ul className={s.root}>
        {
          new Array(this.pagesCount).fill('').map((_, i) => {
            return (
              <li key={i}>
                <button onClick={() => this.onClick(i)} className={classNames(s.button, {
                  [s.isActive]: this.activePage === i,
                })}>{i + 1}</button>
              </li>
            );
          })
        }
      </ul>
    ) : null;
  }
}
