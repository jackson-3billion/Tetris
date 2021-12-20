import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ItemsProvider } from '@contexts/items';

import App from '@layouts/App';

render(
  <BrowserRouter>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
