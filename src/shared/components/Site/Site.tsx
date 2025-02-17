import react from "react";
import { Footer } from "../../../pages/Footer/Footer";
import { Header } from "../Header/Header";
import { Main } from "../../../pages/Main/Main";


const Site = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Site;
