// Компонент SearchForm, который отображает форму поиска
import React, { useEffect, useRef, useState } from "react";
import "./SearchForm.css"; // Изменено с "./SearchForm.css"
import closeIcon from "./closeOutline.svg";

type SearchFormProps = {
  handleOpen: () => void;
};

const SearchForm = (props: SearchFormProps) => {
  // Состояние, которое хранит, что ввел пользователь в поле поиска
  const [query, setQuery] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Функция, которая обновляет состояние query при изменении поля поиска
  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  // Функция, которая обрабатывает отправку формы поиска
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Здесь можно вызвать функцию поиска по запросу query
    console.log("Поиск по запросу: " + query);
    // Остановить всплытие события клика до div с классом s.searchContainer
    event.stopPropagation();
    alert("Sucsessed");
  };

  // Функция, которая останавливает всплытие события клика до div с классом s.searchContainer
  const handleClick = (event: any) => {
    event.stopPropagation();
  };

  //useRef используется для создания ссылки на форму, а useEffect используется для добавления
  //обработчика событий на document, который проверяет, является ли цель события клика частью формы
  //или нет. Если цель события клика не является частью формы, вызывается функция handleOpen,
  //которую вы можете использовать для скрытия формы.
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        props.handleOpen();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  return (
    <form
      ref={formRef}
      className="search-form"
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Введите запрос"
      />

      <img
        className="close-button"
        onClick={props.handleOpen}
        src={closeIcon}
        alt="close sidebar"
        id={"hw5-menu-close"}
      />
    </form>
  );
};

export default SearchForm;
