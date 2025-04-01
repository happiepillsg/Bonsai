import React from 'react';
import { Dashboard } from './components/dashboard';

const App: React.FC = () => {
  return (
    <div className="w-[400px] h-[600px] bg-background text-foreground">
      <Dashboard />
    </div>
  );
};

export default App; 