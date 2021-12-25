import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { StatusProvider } from '@contexts/status';

import App from '@layouts/App';

render(
  <BrowserRouter>
    <StatusProvider>
      <App />
    </StatusProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
