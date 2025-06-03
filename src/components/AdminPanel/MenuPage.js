import { useParams } from "react-router-dom";

const MenuPage = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Menu Page: {id}</h2>
      <p>Here you can implement detailed page content for this menu.</p>
    </div>
  );
};

export default MenuPage;
