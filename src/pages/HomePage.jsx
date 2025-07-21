import Navbar from "../components/layout/Navbar";
import Banner from "../components/layout/Banner";
import FilmRows from "../components/layout/filmRows";
import Footer from "../components/layout/footer";

import "../styles/HomePage.css";

function HomePage() {
  return (
    <>
      <div className="homePage">
        <Navbar />
        <Banner />
        <FilmRows />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
