import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import s from "./SearchForm.module.css";
import closeIcon from "./closeOutline.svg";

type SearchFormProps = {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
  handleOpenSearch: () => void;
  handleCloseResults: () => void;
};

export const SearchForm: FC<SearchFormProps> = ({
  handleInputChange,
  query,
  handleOpenSearch,
  handleCloseResults,
}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={s.searchContainer} onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef}
        className={s.searchInput}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Поиск"
      />
      <img
        className={s.closeButton}
        onClick={() => {
          handleOpenSearch();
          handleCloseResults();
        }}
        src={closeIcon}
        alt="close sidebar"
        id={"hw5-menu-close"}
      />
    </div>
  );
};

export default SearchForm;

