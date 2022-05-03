import React, {Component} from 'react';
import s from './Info.module.scss';
import {Content} from "../Content";
import nbuLogo from './nbu-logo.png';
import novaUkraineLogo from './nova-ukraine-logo.png';
import redcrossLogo from './redcross-logo.png';
import safeLifeLogo from './safelife-logo.png';
import standWithUkraineLogo from './stand-with-ukraine-logo.png';
import stopputinLogo from './stopputin-logo.png';
import classNames from "classnames";
import {logEvent} from "../../utils/anayliticsUtils";


const supportWays = [
  {
    logoMarkup: <span className={classNames(s.logo, s.flag)}>🇺🇦</span>,
    title: 'КоордиНація',
    description: 'This page is for quick and easy information search in Ukraine during the war. You can help as a foreigner there as well.',
    cta: 'Join',
    ctaLink: 'https://viyna.net/',
  },
  {
    image: nbuLogo,
    imageStyles: {
      width: 187,
    },
    title: 'The National Bank Of Ukraine',
    description: 'The National Bank of Ukraine has decided to open a special fundraising account to support the Armed Forces of Ukraine.',
    cta: 'Donate',
    ctaLink: 'https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi',
  },
  {
    image: redcrossLogo,
    imageStyles: {
      width: 172,
    },
    title: 'The Red Cross Ukraine Emergency Appeal',
    description: 'All funds will be used to help those in need, affected by armed conflict, blood collection, mobilization of volunteers and resources, and emergency activities.',
    cta: 'Donate',
    ctaLink: 'https://donate.redcrossredcrescent.org/ua/donate/~my-donation',
  },
  {
    image: safeLifeLogo,
    imageStyles: {
      width: 118,
    },
    title: 'Save Life Foundation',
    description: 'Save Life is a charitable foundation providing aid to the Armed Forces, military training deps, veteran associations, and independent media.',
    cta: 'Donate',
    ctaLink: 'https://savelife.in.ua/en/donate/',
  },
  {
    image: novaUkraineLogo,
    imageStyles: {
      width: 119,
    },
    title: 'Nova Ukraine Humanitarian Aid',
    description: 'The goal of this fundraiser is to provide humanitarian aid for Ukraine and soften the impact of the crisis on the lives of ordinary people.',
    cta: 'Join the Fundraiser',
    ctaLink: 'https://www.facebook.com/donate/1137971146948461/',
  },
  {
    image: stopputinLogo,
    imageStyles: {
      width: 172,
    },
    title: 'Upcoming rallies',
    description: 'Join the protesters to support Ukraine and demand actions to stop Russian military aggression.',
    cta: 'Schedule',
    ctaLink: 'https://www.stopputin.net/?fbclid=IwAR3Ihc67BCxBHcFhM_cNAHKnpK4pjYq-bn7eO9f1cXTblD4WHapdo5WMFc8',
  },
  {
    image: standWithUkraineLogo,
    imageStyles: {
      width: 261,
      transform: 'translate(-20px)'
    },
    title: '#StandWithUkraine',
    description: 'Use this hashtag on your social media to indicate your support and drive the world\'s attention to the cause.',
  },
]

export class Info extends Component {
  render() {
    return (
      <div className={s.root}>
        <Content>
          <h2 className={s.heading}>How you can help Ukraine:</h2>

          <div className={s.inner}>
            {
              supportWays.map(({logoMarkup, image, imageStyles, title, description, cta, ctaLink, }, i) => {
                return (
                  <div className={s.card} key={i}>
                    <div className={s.cardInner}>
                      {logoMarkup ? logoMarkup : <img className={s.logo} src={image} alt={title} style={imageStyles}/>}
                      <h6 className={s.organizationTitle}>{title}</h6>
                      <p className={s.description}>{description}</p>
                      {
                        cta && (
                          <a
                            className={s.link}
                            href={ctaLink}
                            rel="noreferrer"
                            target="_blank"
                            onClick={() => logEvent('OPEN_PARTNER_PAGE', {
                              url: ctaLink
                            })}>
                            {cta}
                          </a>
                        )
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
          </Content>
      </div>
    );
  }
}
