import { useTranslation } from "react-i18next";
import { Container } from "../../common/Container/Container";
import { Button } from "../../common/Button/Button";
import { FaTelegram } from "react-icons/fa";
import styles from "./RequestDemo.module.css";

export const RequestDemo = () => {
  const { t } = useTranslation();

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.background}></div>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>{t("requestDemo.title")}</h2>
          <p className={styles.subtitle}>{t("requestDemo.subtitle")}</p>
          <p className={styles.description}>{t("requestDemo.description")}</p>

          <a
            href="https://t.me/coder_fs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramLink}
          >
            <Button variant="primary" size="large">
              <FaTelegram className={styles.icon} />
              {t("requestDemo.cta")}
            </Button>
          </a>

          {/* <p className={styles.telegram}>{t('requestDemo.telegram')}</p> */}
        </div>
      </Container>
    </section>
  );
};
