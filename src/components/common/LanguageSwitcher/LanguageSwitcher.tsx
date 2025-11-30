import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "./LanguageSwitcher.module.css";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        {/* <MdLanguage className={styles.icon} /> */}
        <span className={styles.currentLang}>
          <span className={styles.flag}>{currentLanguage.flag}</span>
          <span className={styles.code}>
            {currentLanguage.code.toUpperCase()}
          </span>
        </span>
        <IoMdArrowDropdown
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.option} ${
                language.code === i18n.language ? styles.active : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className={styles.flag}>{language.flag}</span>
              <span className={styles.name}>{language.name}</span>
              {language.code === i18n.language && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
