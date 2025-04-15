import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../shared/components/Header/Header";
import s from "./News.module.css";
import jante_633 from "../../assets/images/news/Jante_633.webp"
import Austyn_Gillette from "../../assets/images/news/Austyn_Gillette.webp"
import Rassvet_Blue from "../../assets/images/news/Rassvet_Blue.webp"

const News = () => {
  const news = [
    {
      id: 1,
      title: "Austyn Gillette’s “Know You My Own Way” Globe Skateboarding Part",
      text: "Остин вкладывает всю душу, смешивая мощные линии, безупречную форму и новаторские движения. От удара гидранта до финала, этот глобальный разрыв — высший класс.",
      image: Austyn_Gillette,
      link: "/NewsPage1/1",
    },
    {
      id: 2,
      title: "Jante – 6:33 ",
      text: "Улицы Белграда с Тайлером Сурреем, Александром Эльфвингом, Дэвидом Джакиндой, Эриком Хедбергом, Саймоном Холлбергом, Ниссе Ингемарссоном, Мартином Сандбергом, Филипом Альмквистом и Густавом Тоннесеном.",
      image: jante_633,
      link: "/NewsPage1/2",
    },
    {
      id: 3,
      title: "BLUE - Rassvet",
      text: "Команда Рассвет представляет своё новое видео. Катаются Кембриан Седлик, Вэл Бауэр, Толя Титаев, Джозеф Биайс, Лилиан Фев, Патрик Франклин, Ярослав Кондратьев, Игорь Смирнов, Амин Шариф и Аликс Малнати.",
      image: Rassvet_Blue,
      link: "/NewsPage1/3",
    },
  ];
  
 
  return (
    <div className={s.newsContainer}>
      <Header />
      <h1 className={s.mainHeader}>Skateboarding News</h1>
      <div className={s.newsList}>
        {news.map((item) => (
          <div key={item.id} className={s.newsItem}>
            <Link to={item.link} className={s.newsLink}>
              <img src={item.image} alt={item.title} className={s.newsImage} />
            </Link>
            <div className={s.titleContainer}>
              <h2 className={s.newsTitle}>{item.title}</h2>
              <p className={s.newsText}>{item.text}</p>
              <Link to={item.link} className={s.newsLink}>
                Читать дальше
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;