import { useTranslation } from 'react-i18next';
import { Button } from '../../common/Button/Button';
import { Container } from '../../common/Container/Container';
import styles from './Hero.module.css';

export const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.backgroundPattern}></div>
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              {t('hero.title')}
              <span className={styles.subtitle}>{t('hero.subtitle')}</span>
            </h1>

            <p className={styles.description}>{t('hero.description')}</p>

            <p className={styles.tagline}>{t('hero.tagline')}</p>

            <div className={styles.ctaButtons}>
              <Button
                variant="primary"
                size="large"
                onClick={() => scrollToSection('problem')}
              >
                {t('hero.ctaProblem')}
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => scrollToSection('roadmap')}
              >
                {t('hero.ctaRoadmap')}
              </Button>
            </div>
          </div>

          {/* Decorative element */}
          <div className={styles.decorative}>
            <div className={styles.glowCircle}></div>
            <div className={styles.floatingIcon}>🌱</div>
            <div className={styles.co2Badge}>
              <span className={styles.co2Text}>CO₂</span>
              <span className={styles.reduction}>-30%</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
