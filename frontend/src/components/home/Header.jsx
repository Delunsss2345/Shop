import { ShoppingCartIcon, User2 } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-secondary text-white p-4 ">
      <div className="max-w-7xl w-full mx-auto flex justify-between *:flex *:gap-4 items-center">
        <h1 className="font-bold text-2xl tracking-wider">
          <Link to="/">LEGEND</Link>
        </h1>

        <div>
          <Link to="/cart">
            <ShoppingCartIcon />
          </Link>
          <Link to="/profile">
            <User2 />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
