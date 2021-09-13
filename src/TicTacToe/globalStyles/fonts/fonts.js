import { css } from 'styled-components'

import UsuaziHosomoziWoff from '../fonts/Usuazi-Hosomozi.woff'
import UsuaziHosomoziWoff2 from '../fonts/Usuazi-Hosomozi.woff2'

export const fonts = css`
  @font-face {
    font-family: 'Futura Std';
    src: local('Futura Std'), local('FuturaStd'),
      url(${UsuaziHosomoziWoff2}) format('woff2'),
      url(${UsuaziHosomoziWoff}) format('woff');
  }
`
