import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

export default function MobileNavigation() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      style={{ width: "100vw", height: "100vh" }}
    >
      <SwiperSlide style={{ width: "100vw", height: "100vh" }}>
        <Link href="/">Home</Link>
      </SwiperSlide>
      <SwiperSlide style={{ width: "100vw", height: "100vh" }}>
        <Link href="/projetos">Projetos</Link>
      </SwiperSlide>
      <SwiperSlide style={{ width: "100vw", height: "100vh" }}>
        <Link href="/sobre">Sobre</Link>
      </SwiperSlide>
      <SwiperSlide style={{ width: "100vw", height: "100vh" }}>
        <Link href="/contato">Contato</Link>
      </SwiperSlide>
    </Swiper>
  );
}