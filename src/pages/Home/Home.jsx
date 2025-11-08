import style from "./Home.module.scss";
import {
  rightImages,
  topImages,
  midImages,
  lastImages,
  itemImages,
} from "./images.js";
import { useImageSlider } from "./useImageSlider";
import guaranteeLabelImage from "../../assets/Model_Images/guaranteeLabelImage.png";
import sraddhaMainImage from "../../assets/Model_Images/shraddha_Main_Guranti.jpg";
import shraddhaWithProduct from "../../assets/Model_Images/Shraddha_model2.jpg";
import onLineDrawing from "../../assets/Model_Images/sec3_OneLine.jpg";
import { useState } from "react";
import EverydayProduct from "./EverydayProduct.jsx";
import CarouselSlide from "./CarouselSlide.jsx";
import { Link } from "react-router";

const Home = () => {
  const index = useImageSlider(4);

  return (
    <div className={style.home}>
      <section className={style.section1}>
        <div className={style.right}>
          <div className={style.frame}>
            <img src={rightImages[index]} alt="model" />
          </div>
        </div>
        <div className={style.middle}>
          <div
            className={style.topImg}
            style={{
              backgroundImage: `url(${topImages[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-image 0.6s ease-in-out",
            }}
          ></div>
          <div className={style.textPart}>
            <p className={style.smallText}>Timeless Beauty</p>
            <p className={style.boldText}>
              Elegance in everyday
              <br />
              demifine, beauty
              <br />
              jewellery
            </p>
              <Link to='/about' className={style.link}>
            <div className={style.AboutBtn}>
              <p>About Us</p>
            </div>
            </Link>
          </div>
          <div
            className={style.midImg}
            style={{
              backgroundImage: `url(${midImages[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-image 0.6s ease-in-out",
            }}
          ></div>
          <div
            className={style.lastImg}
            style={{
              backgroundImage: `url(${lastImages[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-image 0.6s ease-in-out",
            }}
          ></div>
          <div
            className={style.itemImg}
            style={{
              backgroundImage: `url(${itemImages[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-image 0.6s ease-in-out",
            }}
          ></div>
          <div className={style.smallTextPart}>
            <p>Limited Edition Palmonas Smoor</p>
          </div>
        </div>
      </section>

      <section className={style.section2}>
        <div className={style.mixedBg}></div>
        <div className={style.leftTexts}>
          <p className={style.topText}>Jewels as unique as you</p>
          <p className={style.header}>
            Commitment, Forever, In every
            <br /> sparkling jewel
          </p>

          <img src={guaranteeLabelImage} alt="" />
        </div>
        <div className={style.sraddhaImage}>
          <div className={style.frame}>
            <img src={sraddhaMainImage} alt="model" />
          </div>
          <img className={style.withProduct} src={shraddhaWithProduct} alt="" />
        </div>
      </section>

      <section className={style.section3}>
        <div className={style.firstGrid}>
          <div className={style.gridInnerText}>
            <p className={style.topText}>
              Our
              <br />
              Silver <br />
              Collection
            </p>
          </div>
          <div className={style.gridInner}>
            <div className={style.frame}>
              <img
                src="https://images.loox.io/uploads/2025/10/27/Uv83v-dr9_mid.jpg"
                alt="model"
              />
            </div>
          </div>
          <div className={style.gridInner}>
            <div className={style.frame}>
              <img
                src="https://palmonas.com/cdn/shop/files/PMMSTNC318-S-1_45db94ad-061b-4596-87b1-efa8e2c6ef4d.jpg?v=1744516037"
                alt="model"
              />
            </div>
          </div>
        </div>
        <div className={style.secGrid}>
          <div className={style.gridInner}>
            <div className={style.frame}>
              <img
                src="https://palmonas.com/cdn/shop/files/DSC08329.jpg?v=1751372386"
                alt="model"
              />
            </div>
          </div>
          <div className={style.gridInner}>
            <div className={style.frame}>
              <img
                src="https://palmonas.com/cdn/shop/files/DSC09394_0b687add-1c4b-4d8e-987a-cdf7f68d3bf5.jpg?v=1751362055"
                alt="model"
              />
            </div>
          </div>
          <div className={style.gridInnerDraw}>
            <img src={onLineDrawing} alt="" />
          </div>
        </div>
      </section>

      <section className={style.section4}>
        <div className={style.view1}>
          <div className={style.head}>
            <p className={style.everyday}>Everyday Jewellery</p>
            <p className={style.all}>See all</p>
          </div>
          <EverydayProduct />
        </div>

        <div className={style.view2}>
          <CarouselSlide />
        </div>
      </section>
    </div>
  );
};

export default Home;
