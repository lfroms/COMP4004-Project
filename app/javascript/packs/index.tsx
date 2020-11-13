import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'foundation';

import './index.scss';

function mount() {
  const rootElement = document.getElementById('ui');
  if (rootElement) {
    ReactDOM.render(<App />, rootElement);
  }
}

document.addEventListener('DOMContentLoaded', mount);
