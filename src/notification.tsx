import React from 'react';
import { createRoot } from 'react-dom/client';
import Notification from './components/Notification';
import './styles.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Notification />);
} 