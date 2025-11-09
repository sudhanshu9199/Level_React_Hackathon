import style from "./About.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import img1 from "../../assets/Model_Images/img1.jpg";
import img2 from "../../assets/Model_Images/img2.jpg";
import img3 from "../../assets/Model_Images/img3.jpg";
import img4 from "../../assets/Model_Images/img4.jpg";
import img5 from "../../assets/Model_Images/img5.jpg";
import heroImg from "../../assets/Model_Images/aboutTop.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);
const About = () => {
  const clientsPreviewRef = useRef(null);
  const clientNameRefs = useRef([]);

  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    CustomEase.create(
      "hop",
      "M0,0 C0.071, 0.505 0.192, 0.726 0.318, 0.852 0.45, 0.984 0.504, 1 1,1"
    );

    const clientsPreview = clientsPreviewRef.current;
    const clientNames = clientNameRefs.current || [];
    let activeClientIndex = -1;
    let activeClientImgWrapper = null;
    let activeClientImg = null;

    const cleanups = [];

    clientNames.forEach((client, index) => {
      if (!client) return;

      const handleMouseOver = () => {
        if (activeClientIndex === index) return;

        // If another client is active, trigger its mouseout
        if (activeClientIndex !== -1) {
          const previousClient = clientNames[activeClientIndex];
          if (previousClient) {
            const mouseoutEvent = new Event("mouseout");
            previousClient.dispatchEvent(mouseoutEvent);
          }
        }

        activeClientIndex = index;
        const clientImgWrapper = document.createElement("div");
        clientImgWrapper.className = style.clientImgWrapper;
        const clientImg = document.createElement("img");
        clientImg.src = images[index] ?? `/img${index + 1}.jpg`;
        gsap.set(clientImg, { scale: 1.25, opacity: 0 });

        clientImgWrapper.appendChild(clientImg);
        clientsPreview.appendChild(clientImgWrapper);

        clientsPreview.classList.add(style.previewActive);

        activeClientImgWrapper = clientImgWrapper;
        activeClientImg = clientImg;

        gsap.to(clientImgWrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.5,
          ease: "hop",
        });

        gsap.to(clientImg, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });

        gsap.to(clientImg, {
          scale: 1,
          duration: 1.25,
          ease: "hop",
        });
      };

      const handleMouseOut = (event) => {
        if (event.relatedTarget && client.contains(event.relatedTarget)) return;

        if (activeClientIndex === index) {
          activeClientIndex = -1;
        }

        if (activeClientImg && activeClientImgWrapper) {
          const clientImgWrapperToRemove = activeClientImgWrapper;
          activeClientImg = null;
          activeClientImgWrapper = null;

          gsap.to(clientImgWrapperToRemove, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            onComplete: () => {
              clientImgWrapperToRemove.remove();

              if (clientsPreview.children.length === 0) {
                clientsPreview.classList.remove(style.previewActive);
              }
            },
          });
        }
      };

      client.addEventListener("mouseover", handleMouseOver);
      client.addEventListener("mouseout", handleMouseOut);

      // Cleanup on unmount
      cleanups.push(() => {
        client.removeEventListener("mouseover", handleMouseOver);
        client.removeEventListener("mouseout", handleMouseOut);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const rootRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;

    // create Lenis instance
    const lenis = new Lenis();

    // function fed to gsap.ticker to run Lenis RAF
    const lenisRaf = (time) => {
      // GSAP ticker time is in seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };
    // ensure lenis triggers ScrollTrigger updates on lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // add raf to gsap ticker
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // query the elements inside this component only
      const els = rootRef.current.querySelectorAll(`.${style.animateText}`);

      els.forEach((el) => {
        el.setAttribute("data-text", el.textContent.trim());
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            el.style.setProperty("--clip-value", `${clipValue}%`);
          },
        });
      });
    }, rootRef);

    // cleanup on unmount
    return () => {
      // revert all gsap context animations and listeners
      ctx.revert();

      // remove ticker callback
      gsap.ticker.remove(lenisRaf);

      // remove lenis listener and destroy instance
      lenis.off("scroll", ScrollTrigger.update);
      if (typeof lenis.destroy === "function") {
        lenis.destroy();
      }

      // kill all ScrollTriggers created (safe cleanup)
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={rootRef}>
      <section className={style.section1}>
        <div className={style.heroImg}>
          <img src={heroImg} alt="" />
        </div>
      </section>
      <section className={style.section2}>
        <h1>We Believe Demi-Fine Jewellery Is The Future</h1>
        <h2 className={style.animateText}>
          DEMIFINE FASHION PRIVATE LIMITED is the first demi-fine jewellery brand that was born out of a desire to offer affordable luxury to fashion-conscious women. Our aim is to make women feel confident, stylish, and empowered without breaking the bank. We strive to create a brand that empowers women to look and feel their best every day.
        </h2>
      </section>
      <section className={style.section3}>
        <h1>Our Mission</h1>
        <h2 className={style.animateText}>
          “Luxury made affordable for modern youth“ is a mission that is driven
          by the belief that everyone deserves to experience the pleasure and
          confidence that come from owning and wearing luxurious jewellery,
          regardless of their income or social status.
        </h2>
        <h1 className={style.aboutBrand}>About The Brand Store</h1>
        <h2 className={style.animateText}>
          We have been in business since 2022 as one of the first demi-fine
          jewellery brands. We design all of our original and eye-catching
          products in-house at our Pune-based headquarters, PALMONAS, and we now
          ship to over 200 countries. If you’re in Pune, come say hello! Our
          store is located at Lane 5, Koregaon Park. We choose fashionable
          designs with high-quality craftsmanship that can be worn every day.
          Our demi-fine styles are the pinnacle of self-expression because they
          were made to be stacked.
        </h2>
      </section>
      <section className={style.section4}>
        <div ref={clientsPreviewRef} className={style.clientsPreview}></div>
        <p className={style.smallHead}>
          We Believe Demi-Fine Jewellery Is The Future
        </p>

        <div className={style.clientsList}>
          {[
            "Palmonas X Shraddha Kapoor",
            "Our Mission",
            "About The Brand Store",
            "Emily In Paris X Palmonas",
            "Shraddha Favourite",
          ].map((name, index) => (
            <div
              key={index}
              ref={(el) => (clientNameRefs.current[index] = el)}
              className={style.clientName}
            >
              <h1>{name}</h1>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
