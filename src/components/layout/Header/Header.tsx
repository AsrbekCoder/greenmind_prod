import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiMenu, HiX } from "react-icons/hi";
import { Container } from "../../common/Container/Container";
import { LanguageSwitcher } from "../../common/LanguageSwitcher/LanguageSwitcher";
import logo from "../../../assets/images/logo.png";
import styles from "./Header.module.css";

export const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "problem", label: t("nav.problem") },
    { id: "team", label: t("nav.team") },
    { id: "whyus", label: t("nav.whyUs") },
    { id: "roadmap", label: t("nav.roadmap") },
    // { id: 'approach', label: t('nav.approach') },
    { id: "business", label: t("nav.businessModel") },
    { id: "demo", label: t("nav.demo") },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo} onClick={() => scrollToSection("home")}>
            <img src={logo} alt="GreenMind AI" />
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={styles.navLink}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <div
        className={`${styles.mobileNav} ${
          isMobileMenuOpen ? styles.mobileNavOpen : ""
        }`}
      >
        <nav className={styles.mobileNavContent}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={styles.mobileNavLink}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
