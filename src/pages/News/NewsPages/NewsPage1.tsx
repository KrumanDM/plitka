import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../shared/components/Header/Header";
import s from "./NewsPage.module.css";

const NewsPage1 = () => {
  const { id } = useParams(); // Получаем параметр id из URL
  const newsPages = [
    {
      id: "1",
      title: "Austyn Gillette’s “Know You My Own Way” Globe Skateboarding Part",
      text: "Остин вкладывает всю душу, смешивая мощные линии, безупречную форму и новаторские движения. От удара гидранта до финала, этот глобальный разрыв — высший класс.",
      videoLink: "https://www.youtube.com/embed/ror6kRSUQZo",
    },
    {
      id: "2",
      title: "Jante – 6:33 ",
      text: "Улицы Белграда с Тайлером Сурреем, Александром Эльфвингом, Дэвидом Джакиндой, Эриком Хедбергом, Саймоном Холлбергом, Ниссе Ингемарссоном, Мартином Сандбергом, Филипом Альмквистом и Густавом Тоннесеном.",
      videoLink: "https://www.youtube.com/embed/X6AQ6a42efM",
    },
    {
      id: "3",
      title: "BLUE - Rassvet",
      text: "Команда Рассвет представляет своё новое видео. Катаются Кембриан Седлик, Вэл Бауэр, Толя Титаев, Джозеф Биайс, Лилиан Фев, Патрик Франклин, Ярослав Кондратьев, Игорь Смирнов, Амин Шариф и Аликс Малнати.",
      videoLink: "https://www.youtube.com/embed/bbCqyWAXCBs",
    },
  ];

  const newsPage = newsPages.find((page) => page.id === id);

  if (!newsPage) {
    return <div>Новость не найдена</div>;
  }

  return (
    <div className={s.newsContainer}>
      <Header />
      <div className={s.newsItem}>
        <h2 className={s.newsTitle}>{newsPage.title}</h2>
        <iframe
          width="560"
          height="315"
          src={newsPage.videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className={s.newsText}>{newsPage.text}</p>
      </div>
    </div>
  );
};

export default NewsPage1;


