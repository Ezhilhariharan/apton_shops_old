import Blurbin from '@components/icons/BlurBin';
import Blurchats from '@components/icons/BlurChat';
import BlurTime from '@components/icons/BlurTime';
import Bin from '@components/icons/DeleteBlack';
import TimerIcon from '@components/icons/TimerIcon';
import ChatIcon from '@components/icons/ChatIcon';
import CalendarIcon from '@components/icons/CalendarIcon';
import EyeIcon from '@components/icons/EyeIcon';
import BlurCalender from '@components/icons/BlurCalender';
import BlurEye from '@components/icons/BlurEye';
import MyComputer from '@components/icons/MyComputer';
import UnSplash from '@components/icons/UnSplash';
import Library from '@components/icons/Library';
import Canvas from '@components/icons/Canvas';
import GoogleDrive from '@components/icons/GoogleDrive';
import LikesIcon from '@components/icons/LikesIcon';
import CommentsIcon from '@components/icons/CommentsIcon';
import InstaHeart from '@components/icons/InstaHeart';
import LinkdinLike from '@components/icons/LinkdinLike';
import PerformanceIcon from '@components/icons/Performance';

export const Buttonvalues = [
  {
    name: 'Schedule',
    value: 'Schedule',
  },
  {
    name: 'Publish',
    value: 'Publish',
  },
];
export const Options = [
  {
    id: 1,
    name: 'Chat',
    icon: <ChatIcon />,
  },
  { id: 2, name: 'Timer', icon: <TimerIcon /> },
  // { id: 3, name: 'Calendar', icon: <CalendarIcon /> },
  {
    id: 4,
    name: 'Eye',
    icon: <EyeIcon />,
  },
  {
    id: 5,
    name: 'Clear',
    icon: <Bin />,
  },
];
export const shedulePostAction = [
  {
    id: 1,
    name: 'Eye',
    icon: <EyeIcon />,
  },
  {
    id: 2,
    name: 'Clear',
    icon: <Bin />,
  },
];
export const disableOption = [
  {
    id: 1,
    name: 'Chat',
    icon: <Blurchats />,
  },
  { id: 2, name: 'Timer', icon: <BlurTime /> },
  // { id: 3, name: 'Calendar', icon: <BlurCalender /> },
  {
    id: 4,
    name: 'Eye',
    icon: <BlurEye />,
  },
  {
    id: 5,
    name: 'Clear',
    icon: <Blurbin />,
  },
];
export const uploadFileList = [
  {
    id: 1,
    name: 'Coming soon',
    icon: <GoogleDrive />,
  },
  // { id: 2, name: 'My computer', icon: <MyComputer /> },
  // { id: 3, name: 'Unsplash', icon: <UnSplash /> },
  // {
  //   id: 4,
  //   name: 'Library',
  //   icon: <Library />
  // },
  { id: 5, name: 'Coming soon', icon: <Canvas /> },
];
export const mediaCharacterLimit = [
  {
    characterLimit: 10000,
    title: 'Facebook',
  },
  {
    characterLimit: 10000,
    title: 'Facebook Groups',
  },
  {
    characterLimit: 2200,
    title: 'Instagram',
  },
  {
    characterLimit: 3000,
    title: 'Linkedin Pages',
  },
  {
    characterLimit: 279,
    title: 'Twitter',
  },
  {
    Title: 100,
    characterLimit: 500,
    title: 'Pinterest',
  },
];
export const instruction = [
  ' Aspect Ratio B/W 1.91:1 & 9:16',
  'Min resolution - 720 pixels',
  'Video size should be less than 3.6 GB',
];
export const DropdownList = [
  {
    key: '1',
    title: 'Facebook',
  },
  {
    key: '2',
    title: 'Instagram',
  },
  {
    key: '3',
    title: 'Facebook Groups',
  },
  {
    key: '4',
    title: 'Linkedin Pages',
  },
  {
    key: '5',
    title: 'Twitter',
  },
  {
    key: '6',
    title: 'Pinterest',
  },
];
export const leftSideActions = [
  {
    id: 1,
    icon: <LikesIcon />,
    instaIcon: <InstaHeart />,
    linkdinIcon: <LinkdinLike />,
    name: 'likes',
  },
  {
    id: 2,
    icon: <CommentsIcon />,
    name: 'comments',
  },
];

export const rightSideActions = [
  {
    id: 1,
    icon: <EyeIcon />,
    name: 'preview',
  },
  {
    id: 2,
    icon: <PerformanceIcon />,
    name: 'insights',
  },
  {
    id: 3,
    name: 'Clear',
    icon: <Bin />,
  },
];
