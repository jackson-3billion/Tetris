import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import neonregular2 from './fonts/neon-webfont.woff2';
import neonregular from './fonts/neon-webfont.woff';

import { StatusProvider } from '@contexts/status';
import { OpponentStatusProvider } from '@contexts/opponentStatus';

import App from '@layouts/App';

const styles = css`
  @font-face {
    font-family: 'neonregular';
    src: url('${neonregular2}') format('woff2'), url('${neonregular}') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

render(
  <BrowserRouter>
    <StatusProvider>
      <OpponentStatusProvider>
        <Global styles={styles} />
        <App />
      </OpponentStatusProvider>
    </StatusProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
