import { useEffect, useState } from "react";

export const useNavbarAnimation = () => {
    const [show, setshow] = useState(true);
    const [lastScrollY, setlastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollY && currentScroll > 100) {
                setshow(false);
            }
            else setshow(true);

            setlastScrollY(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    }, [lastScrollY]);
    return { show };
};