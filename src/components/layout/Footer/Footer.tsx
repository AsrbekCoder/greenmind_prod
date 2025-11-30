import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container/Container';
import logo from '../../../assets/images/logo.png';
import styles from './Footer.module.css';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <img src={logo} alt="GreenMind AI" className={styles.logo} />
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              {t('footer.copyright').replace('2024', currentYear.toString())}
            </p>
            <p className={styles.madeIn}>{t('footer.madeIn')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
