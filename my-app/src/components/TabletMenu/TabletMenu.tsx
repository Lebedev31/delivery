import './TabletMenu.scss';
import fire from '../../img/image 9.png';

function TabletMenu({ isActive }: { isActive: boolean }) {
  return (
    <div className={`menu ${isActive ? 'active' : ''}`}>
      <div className="menu__main">
        <div className="menu__promotion">
          <p>30%</p>
          <div className="menu__img">
            Акции
            <div className="menu__fire">
              <img src={fire} alt="огонь" />
            </div>
          </div>
          <p style={{ marginTop: '70px' }}>20%</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default TabletMenu;
