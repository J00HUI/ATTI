import { createGlobalStyle } from "styled-components"; //1
import GangwonHyun from "./GangwonHyun.ttf";
import GunggiLight from "./경기서체Light.ttf";
import GunggiMedium from "./경기서체Medium.ttf";
import BMJUA from "./BMJUA.ttf";

export default createGlobalStyle`		     
 
  @font-face {
    font-family: 'GangwonHyun';
    src: local('GangwonHyun');    //지정한 이름
    font-style: normal;
    src: url(${GangwonHyun}) format('truetype');
  }

  @font-face {
    font-family: 'GunggiLight';
    src: local('GunggiLight');    //지정한 이름
    font-style: normal;
    src: url(${GunggiLight}) format('truetype');
  }

  @font-face {
    font-family: 'GunggiMedium';
    src: local('GunggiMedium');    //지정한 이름
    font-style: normal;
    src: url(${GunggiMedium}) format('truetype');
  }

  @font-face {
    font-family: 'BMJUA';
    src: local('BMJUA');    //지정한 이름
    font-style: normal;
    src: url(${BMJUA}) format('truetype');
  }
  `