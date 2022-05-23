import React, {Component} from 'react';
import s from './Pagination.module.scss';
import classNames from "classnames";

export const ITEMS_PER_PAGE = 6;

export class Pagination extends Component {

  get pagesCount() {
    return Math.ceil(this.props.itemsCount / ITEMS_PER_PAGE);
  }

  get activePage() {
    return Math.floor(this.props.activeRange[0] / ITEMS_PER_PAGE);
  }

  onClick = (i) => {
    const {activePage, onChange, contentRef} = this.props;
    const startRange = i * ITEMS_PER_PAGE;

    if (i !== activePage) {
      onChange([startRange, startRange + ITEMS_PER_PAGE]);

      contentRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth'
      // });
    }
  };

  render() {
    return this.pagesCount > 1 ? (
      <ul className={s.root}>
        {
          new Array(this.pagesCount).fill('').map((_, i) => {
            return (
              <li className={s.item}>
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
