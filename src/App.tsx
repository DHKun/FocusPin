import './styles/index.css';
import WindowControls from './components/WindowControls';
import TodoList from './components/TodoList';
import Inspiration from './components/Inspiration';

function App() {
  return (
    <div className="app">
      <WindowControls />
      <h1>FocusPin</h1>
      <p>Desktop sticky notes for tasks and inspiration</p>
      <TodoList />
      <Inspiration />
    </div>
  );
}

export default App;