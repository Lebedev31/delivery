import './App.scss';
import Header from '../Header/Header';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const active = useSelector((state: RootState) => state.main.isActive);

  useEffect(() => {
    if (active) {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.94)';
    } else {
      document.body.style.backgroundColor = 'rgba(9, 35, 78, 0.9)';
    }
  }, [active]);

  return (
    <div className="container">
      <Header />
      <main></main>
    </div>
  );
}

export default App;
