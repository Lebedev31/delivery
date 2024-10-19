import "./AddinationalMenu.scss";

type Props = {
  activeMenu: boolean;
  categoryArray: string[];
};

function AddinationalMenu({ activeMenu, categoryArray }: Props) {
  return (
    <div
      className={`addinational ${
        activeMenu ? "addinational__menu-active" : ""
      }`}
    >
      <ul>
        {categoryArray.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default AddinationalMenu;
