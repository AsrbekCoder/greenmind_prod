import { useTranslation } from 'react-i18next';
import { Container } from '../common/Container/Container';
import { Card } from '../common/Card/Card';
import { IoCheckmarkCircle, IoRocketSharp, IoCodeSlash, IoBusiness } from 'react-icons/io5';
import { MdTimeline } from 'react-icons/md';
import './SimpleSections.css';

// WhyUs Section
export const WhyUs = () => {
  const { t } = useTranslation();

  const reasons = ['reason1', 'reason2', 'reason3', 'reason4'];

  return (
    <section id="whyus" className="section why-us-section">
      <Container>
        <div className="section-header">
          <span className="badge">✨ {t('whyUs.title')}</span>
          <h2>{t('whyUs.title')}</h2>
          <p>{t('whyUs.subtitle')}</p>
        </div>

        <div className="grid-2">
          {reasons.map((reason, idx) => (
            <Card key={idx} className="reason-card">
              <IoCheckmarkCircle className="card-icon green" />
              <h3>{t(`whyUs.${reason}.title`)}</h3>
              <p>{t(`whyUs.${reason}.description`)}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// Roadmap Section
export const Roadmap = () => {
  const { t } = useTranslation();

  const phases = ['phase1', 'phase2', 'phase3', 'phase4'];

  return (
    <section id="roadmap" className="section roadmap-section">
      <Container>
        <div className="section-header">
          <span className="badge">🗺️ {t('roadmap.title')}</span>
          <h2>{t('roadmap.title')}</h2>
          <p>{t('roadmap.subtitle')}</p>
          <div className="current-stage">{t('roadmap.currentStage')}</div>
        </div>

        <div className="roadmap-timeline">
          {phases.map((phase, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker">
                <MdTimeline />
              </div>
              <Card className="timeline-card">
                <div className="phase-header">
                  <h3>{t(`roadmap.${phase}.title`)}</h3>
                  <span className="timeline-badge">{t(`roadmap.${phase}.timeline`)}</span>
                </div>
                <ul>
                  {[0, 1, 2].map((i) => {
                    const item = t(`roadmap.${phase}.items.${i}`, { defaultValue: '' });
                    return item ? <li key={i}>{item}</li> : null;
                  })}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// Approach Section
export const Approach = () => {
  const { t } = useTranslation();

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];

  return (
    <section id="approach" className="section approach-section">
      <Container>
        <div className="section-header">
          <span className="badge">⚙️ {t('approach.title')}</span>
          <h2>{t('approach.title')}</h2>
          <p>{t('approach.subtitle')}</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <Card key={idx} className="step-card">
              <div className="step-number">{idx + 1}</div>
              <h3>{t(`approach.${step}.title`)}</h3>
              <p>{t(`approach.${step}.description`)}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// BusinessModel Section
export const BusinessModel = () => {
  const { t } = useTranslation();

  return (
    <section id="business" className="section business-section">
      <Container>
        <div className="section-header">
          <span className="badge">💼 {t('businessModel.title')}</span>
          <h2>{t('businessModel.title')}</h2>
        </div>

        <div className="business-grid">
          <Card className="business-card">
            <IoBusiness className="card-icon blue" />
            <h3>{t('businessModel.model.title')}</h3>
            <ul>
              <li>{t('businessModel.model.item1')}</li>
              <li>{t('businessModel.model.item2')}</li>
              <li>{t('businessModel.model.item3')}</li>
            </ul>
          </Card>

          <Card className="business-card">
            <IoRocketSharp className="card-icon green" />
            <h3>{t('businessModel.impact.title')}</h3>
            <ul>
              <li>{t('businessModel.impact.item1')}</li>
              <li>{t('businessModel.impact.item2')}</li>
              <li>{t('businessModel.impact.item3')}</li>
            </ul>
          </Card>

          <Card className="business-card full-width">
            <IoCodeSlash className="card-icon purple" />
            <h3>{t('businessModel.differentiation.title')}</h3>
            <p>{t('businessModel.differentiation.intro')}</p>
            <ul>
              <li><strong>Local-first:</strong> {t('businessModel.differentiation.point1')}</li>
              <li><strong>AI-centric:</strong> {t('businessModel.differentiation.point2')}</li>
              <li><strong>Accessible:</strong> {t('businessModel.differentiation.point3')}</li>
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
};
