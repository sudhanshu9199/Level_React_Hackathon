import style from "./About.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { useEffect, useRef } from "react";
  import img1 from "../../assets/Model_Images/shraddha_model1.jpg"
  import img2 from "../../assets/Model_Images/shraddha_model2.jpg";
  import img3 from "../../assets/Model_Images/shraddha_model3.jpg";
  import img4 from "../../assets/Model_Images/shraddha_model4.jpg";

gsap.registerPlugin(useGSAP, CustomEase);
const About = () => {
  const clientsPreviewRef = useRef(null);
  const clientNameRefs = useRef([]);

  const images = [img1, img2, img3, img4];

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
        clientImg.src = images[index] ?? `/shraddha_model${index + 1}.jpg`;
        gsap.set(clientImg, { scale: 1.25, opacity: 0 });

        clientImgWrapper.appendChild(clientImg);
        clientsPreview.appendChild(clientImgWrapper);

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
  return (
    <div>
      <section className={style.section2}>
        <div ref={clientsPreviewRef} className={style.clientsPreview}></div>
        <p className={style.smallHead}>
          We Drlieve Demi-Fine Jewellery Is The Future
        </p>

        <div className={style.clientsList}>
          {[
            "Palmonas X Shraddha Kapoor",
            "Our Mission",
            "About The Brand Store",
            "Emily In Paris X Palmonas",
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
