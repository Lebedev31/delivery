import './Hamburger.scss';
import { HambergerProps } from './type';

function Hamburger({ isActive, toggleMenu }: HambergerProps) {
  return (
    <div className={`wrapper__gamburger ${isActive ? 'active__wrapper' : ''}`}>
      <div
        className={`gamburger ${isActive ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={isActive ? 'gamburger__text-yeloy' : ''}>
        {isActive ? 'Закрыть' : 'Меню'}
      </div>
    </div>
  );
}

export default Hamburger;
