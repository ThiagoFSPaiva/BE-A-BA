import loginBg from '../assets/images/login-template.svg';
import templates from '../assets/images/templates.png';
import uploads from '../assets/images/uploads.png';
import user from '../assets/images/user.png';
import logoImage from '../assets/images/logo.png';
import csv from '../assets/images/icons/csv.png'
import xls from '../assets/images/icons/xls.png'
import xlsx from '../assets/images/icons/xlsx.png'

type IconsTemplate = {
  xls: string;
  xlsx: string;
  csv: string;
  [key: string]: string;
};


export const images = {
  loginBg,
  summaryImages: {
    totalBook: templates,
    sold: uploads,
    cancel: user,
  },
  logo: logoImage,

  iconsTemplate: {
    xls: xls,
    xlsx: xlsx,
    csv: csv,
  } as IconsTemplate,
};