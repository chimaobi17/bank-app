import './css/app.css';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/hooks/use-appearance';
import { AppRouter } from './router';

// Initialize the app
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<AppRouter />);
}

// This will set light / dark mode on load...
initializeTheme();
