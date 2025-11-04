import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import style from "./Home.module.scss";
import { useState } from "react";

const cards = [
  {
    id: 1,
    image: "https://palmonas.com/cdn/shop/files/daily_ware_c32bcc0d-4cd5-41c3-8868-e24936980c93.jpg?v=1760076359&width=650",
    title: "",
  },
  {
    id: 2,
    image: "https://palmonas.com/cdn/shop/files/office_look_c3017051-98e4-4dbd-a027-7fb5ae821807.jpg?v=1760076384&width=650",
    title: "",
  },
  {
    id: 3,
    image: "https://palmonas.com/cdn/shop/files/party_ware_fb0025a4-9d04-44dd-a83d-ac0e703e79f4.jpg?v=1760076406&width=650",
    title: "",
  },
  {
    id: 4,
    image: "https://palmonas.com/cdn/shop/files/day_out_look_53c55987-8031-4e78-b09f-32c1db1f2c27.jpg?v=1760076473&width=650",
    title: "",
  },
  {
    id: 5,
    image: "https://palmonas.com/cdn/shop/files/date_night_look_d3b9a0f5-1f96-46e9-8ad8-e308147736e6.jpg?v=1760076493&width=650",
    title: "",
  },
  {
    id: 6,
    image: "https://palmonas.com/cdn/shop/files/wedding_ware_55482a62-e9e6-408c-8dcf-6994d5501362.jpg?v=1760076518&width=650",
    title: "",
  },
];

const CarouselSlide = () => {
  const [index, setindex] = useState(0);
  const dragX = useMotionValue(0);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if(offset < -100 || velocity < -500) setindex(prev => (prev + 1) % cards.length);
    else if (offset > 100 || velocity > 500) setindex(prev => (prev - 1 + cards.length) % cards.length);
  }
  return (
    <div className={style.carouselWrapper}>
      <div className={style.head}>
        <p>For Every You</p>
      </div>

      <div className={style.carousel}>
        <AnimatePresence>
          {cards.map((card, i) => {
            let position = (i - index + cards.length) % cards.length;
            let zIndex = cards.length - position;
            let scale = position === 0 ? 1 : 0.85;
            let rotateY = position === 0 ? 0 : position === 1 ? -25 : 25;
            let x = position === 0 ? 0 : position === 1 ? 150 : -150;
            let opacity = position > 1 ? 0 : 1;

            return (
              <motion.div
                key={card.id}
                className={style.card}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x: dragX, zIndex }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity, scale, rotateY, x }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
              >
                <img src={card.image} alt={card.title} />
                <motion.div className={style.text}>{card.title}</motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CarouselSlide