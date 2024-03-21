import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Link to={"/all-games"}>
        <button>All Games</button>
      </Link>
      <Link to={"/kan-jam"}>
        <button>Can Jam</button>
      </Link>
      <Link to={"/bean-bags"}>
        <button>Bean Bags</button>
      </Link>
      <Link to={"/beer-die"}>
        <button>Beer Die</button>
      </Link>
      <Link to={"/bocce-ball"}>
        <button>Bocce Ball</button>
      </Link>
      <Link to={"/ladder-golf"}>
        <button>Ladder Golf</button>
      </Link>
      <Link to={"/timber-toss"}>
        <button>Timber Toss</button>
      </Link>
    </div>
  );
};

export default Home;
