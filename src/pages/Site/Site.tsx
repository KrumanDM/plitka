import react from "react";
import { Footer } from "../../shared/components/Footer/Footer";
import { Header } from "../../shared/components/Header/Header";
import { Main } from "../Main/Main";


const Site = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
      {/* <video
  autoPlay
  muted
  loop
  width="1280"
  height="720"
  style={{ pointerEvents: "none" }}
>
  <source src="../../assets/video/Hurry.mp4" type="video/mp4" />
  Ваш браузер не поддерживает HTML5-видео.
</video> */}

      {/* <iframe
  id="YouTubeVideo-template--23241470181705__hero_video_A93TDV"
  data-type="youtube"
  data-video-id="BuxEPJ8bDXU"
  frameBorder="0"
  allowFullScreen
  allow="autoplay; encrypted-media"
  referrerPolicy="strict-origin-when-cross-origin"
  title="No-PopClub Video"
  width="1280"
  height="720"
  src="https://www.youtube.com/embed/BuxEPJ8bDXU?autoplay=1&controls=0&loop=1&playlist=BuxEPJ8bDXU&mute=1&modestbranding=1&playsinline=1&rel=0&enablejsapi=1"
  tabIndex={-1}
/>; */}



        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Site;
