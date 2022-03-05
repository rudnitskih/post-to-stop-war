import React, {Component} from 'react';
import s from './Main.module.scss';
import logo from './logo.svg';
import post from './post.png';

export class Main extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.inner}>
          <div className={s.logo}>
            <img src={logo} alt="Post Stop War" />
            <span className={s.domain}>in.ua</span>
          </div>

          <div className={s.content}>
            <div className={s.infoColumn}>
              <h1 className={s.heading}>
                Зроби ПОСТ —<br/>
                <span className={s.highlight}>ЗУПИНИ ВІЙНУ</span><br/>
                в УКРАЇНІ
              </h1>
              <div className={s.descriptionWrapper}>
                <span className={s.aim}>Мета:</span>
                <p className={s.description}>
                  Цей ресурс створений, щоб легко і швидко передавати закордон найважливіші месиджі про війну. Всі вони вже перекладені мовами цих країн. Можете також використовувати картинки з нашої галереї постерів. Сподіваємося, наш ресурс стане вам надійним помічником! Постимо, репостимо, поширюємо, щоб зупинити війну!
                </p>
              </div>
            </div>

            <div className={s.illustrationColumn}>
              <img src={post} alt="" className={s.postIllustration}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
