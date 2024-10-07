import './Hamburger.scss';
import { setActive } from '../../redux/mainSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

function Hamburger() {
  const active = useSelector((state: RootState) => state.main.isActive);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={`wrapper__gamburger ${active ? 'active__wrapper' : ''}`}>
      <div
        className={`gamburger ${active ? 'active' : ''}`}
        onClick={() => dispatch(setActive())}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={active ? 'gamburger__text-yeloy' : ''}>
        {active ? 'Закрыть' : 'Меню'}
      </div>
    </div>
  );
}

export default Hamburger;
