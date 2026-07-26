import './styles/index.css';
import WindowControls from './components/WindowControls';
import ItemList from './components/ItemList';
import GlassCard from './components/GlassCard';
import { PinIcon } from './components/icons';

function App() {
  return (
    <div className="app">
      <WindowControls />

      <header className="app-header">
        <PinIcon className="app-logo" />
        <h1 className="app-title">FocusPin</h1>
      </header>

      <div className="cards-container">
        <GlassCard title="Ideas" className="card-ideas" animation="slide-up">
          <ItemList
            storeKey="inspirations"
            placeholder="Record a new inspiration..."
            emptyMessage="No inspirations yet"
            countNoun="inspiration"
            multilineEdit
          />
        </GlassCard>

        <GlassCard title="To-Do" className="card-todo" animation="slide-up">
          <ItemList
            storeKey="todos"
            placeholder="Add a new task..."
            emptyMessage="No tasks yet"
            completable
          />
        </GlassCard>
      </div>
    </div>
  );
}

export default App;
