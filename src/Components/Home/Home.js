import React from "react";
import "./Home.css";
import Product from "../Product/Product.js";

const Home = () => {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />

      <div className="home__row">
        <Product
          id="1234655"
          title="The Lean Startup: How Constant Innovation Creates"
          price={11.96}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
        />
        <Product
          id="ps5pro"
          title="PlayStation 5 Console"
          price={499.99}
          rating={5}
          image="https://m.media-amazon.com/images/I/619BkvKW35L._AC_UY218_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="horizon234"
          title="Horizon Forbidden West Special Edition"
          price={69.96}
          rating={5}
          image="https://m.media-amazon.com/images/I/81kfGkLMimL._AC_UY218_.jpg"
        />
        <Product
          id="TLOU2"
          title="The Last Of Us Part II - PlayStation 4"
          price={45.96}
          rating={5}
          image="https://m.media-amazon.com/images/I/41gZhtg1keL._AC_UY218_.jpg"
        />
        <Product
          id="123DS2"
          title="Demon's Souls - PlayStation 5"
          price={25.96}
          rating={4}
          image="https://m.media-amazon.com/images/I/81QoNRp5+WL._AC_UY218_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="istv12"
          title="Insignia NS-43DF710NA21 43-inch Smart 4K UHD - Fire TV, Released 2020"
          price={267.96}
          rating={4}
          image="https://m.media-amazon.com/images/I/61+OhM4LEUL._AC_UY218_.jpg"
        />
      </div>
    </div>
  );
};

export default Home;
