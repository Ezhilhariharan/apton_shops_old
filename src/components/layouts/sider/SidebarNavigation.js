/* eslint-disable no-unused-vars */
import React from 'react';
import DashboardIcon from '../../icons/DashboardIcon';
import WhatsAppIcon from '../../icons/WhatsAppIcon';
import MarketingIcon from '../../icons/MarketingIcon';
import IntergrationIcons from '../../icons/IntegrationIcons';
import SocialMediaIcon from '../../icons/SocialMediaIcon';
import TemplateFolderIcon from '../../icons/TemplateFolderIcon';
// import CampaignSpeakerIcon from '../../icons/CampaingSpeakerIcon';
import CampaignSpeakerIcon from '../../icons/CampaignSpeakerIcon';
import Inbox from '../../icons/Inbox';
import CustomerUsersIcon from '../../icons/CustomerUsersIcon';
import SurveyIcon from '../../icons/SurveyIcon';
export const sidebarNavigation = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Inbox',
    key: 'Inbox',
    url: '/inbox',
    icon: <Inbox />,
  },
  {
    title: 'Social Media',
    key: 'Social Media',
    url: '/socialmedia-automation',
    icon: <SocialMediaIcon />,
  },
  {
    title: 'WhatsApp ',
    key: 'whatApp-marketing',
    icon: <WhatsAppIcon />,
    children: [
      {
        title: 'Templates',
        key: 'whatApp-templates',
        url: '/whatsapp-template',
        icon: <TemplateFolderIcon className="childrenPadding" />,
      },
      // {
      //   title: 'Survey Bots',
      //   key: 'survey-bots ',
      //   url: '/survey-bots',
      //   icon: <SurveyIcon className="childrenPadding" />,
      // },
      {
        title: 'Campaign',
        key: 'whatApp-marketing-Campaign',
        url: '/whatsapp-marketing',
        icon: <CampaignSpeakerIcon className="childrenPadding" />,
      },
      // {
      //   title: 'Customer',
      //   key: 'whatsapp-customers',
      //   url: '/customer',
      //   icon: <CustomerUsersIcon className="childrenPadding" />,
      // },
    ],
  },

  {
    title: 'Integration',
    key: 'integration',
    url: '/integration',
    icon: <IntergrationIcons color={'#181818'} />,
  },
];
