import React from "react";
import { Header } from "../../../Header";

export const ComplitesStorage = () => {
  return (
    <div>
      <Header/>
      <h1>Комплиты</h1>
      {/* Добавляем тег img с атрибутом src, указывающим на url изображения */}
      <img src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2thdGVib2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Skateboard" />
    </div>
  );
};