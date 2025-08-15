import { useEffect } from 'react';
import './styles/index.css';
import WindowControls from './components/WindowControls';
import TodoList from './components/TodoList';
import Inspiration from './components/Inspiration';
import GlassCard from './components/GlassCard';
import { useWindowPin } from './hooks/useWindowPin';

function App() {
  const { restorePinState } = useWindowPin();

  // 应用启动时恢复Pin状态
  useEffect(() => {
    restorePinState();
  }, [restorePinState]);

  return (
    <div className="app">
      <WindowControls />
      
      <div className="app-header">
        <h1 className="app-title">
          📌 FocusPin
        </h1>
      </div>

      <div className="cards-container">
        <GlassCard title="Ideas" animation="slide-up">
          <Inspiration />
        </GlassCard>
        
        <GlassCard title="To-Do" animation="slide-up">
          <TodoList />
        </GlassCard>
      </div>
    </div>
  );
}

export default App;