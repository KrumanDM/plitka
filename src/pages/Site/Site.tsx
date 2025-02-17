import react from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../../shared/components/Header/Header";
import { Main } from "../Main/Main";


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
