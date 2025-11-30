import { useTranslation } from "react-i18next";
import { Container } from "../../common/Container/Container";
import { Card } from "../../common/Card/Card";
import {
  MdFactory,
  MdEnergySavingsLeaf,
  MdWarning,
  MdSpeed,
  MdCo2,
  MdSmartToy,
} from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import styles from "./ProblemSolution.module.css";

export const ProblemSolution = () => {
  const { t } = useTranslation();

  const problems = [
    {
      icon: <MdCo2 />,
      title: t("problem.problem1.title"),
      description: t("problem.problem1.description"),
    },
    {
      icon: <MdWarning />,
      title: t("problem.problem2.title"),
      description: t("problem.problem2.description"),
    },
    {
      icon: <MdSpeed />,
      title: t("problem.problem3.title"),
      description: t("problem.problem3.description"),
    },
  ];

  const features = [
    {
      icon: <MdFactory />,
      title: t("solution.feature1.title"),
      points: [
        t("solution.feature1.points.0"),
        t("solution.feature1.points.1"),
        t("solution.feature1.points.2"),
      ],
    },
    {
      icon: <MdEnergySavingsLeaf />,
      title: t("solution.feature2.title"),
      points: [
        t("solution.feature2.points.0"),
        t("solution.feature2.points.1"),
        t("solution.feature2.points.2"),
        t("solution.feature2.points.3"),
      ],
    },
    {
      icon: <MdSmartToy />,
      title: t("solution.feature3.title"),
      examples: [
        t("solution.feature3.examples.0"),
        t("solution.feature3.examples.1"),
        t("solution.feature3.examples.2"),
      ],
      technology: t("solution.feature3.technology"),
    },
  ];

  const consequences = [
    t("problem.consequences.item1"),
    t("problem.consequences.item2"),
    t("problem.consequences.item3"),
  ];

  const impacts = [
    t("solution.impact.item1"),
    t("solution.impact.item2"),
    t("solution.impact.item3"),
    t("solution.impact.item4"),
  ];

  return (
    <section id="problem" className={styles.section}>
      {/* Problem Part */}
      <div className={styles.problemSection}>
        <Container>
          <div className={styles.header}>
            <span className={styles.badge}>🔴 {t("problem.domain")}</span>
            <h2 className={styles.title}>{t("problem.title")}</h2>
            <p className={styles.subtitle}>{t("problem.subtitle")}</p>
            <p className={styles.intro}>{t("problem.intro")}</p>
          </div>

          <div className={styles.grid}>
            {problems.map((problem, index) => (
              <Card key={index} className={styles.problemCard}>
                <div className={styles.iconWrapper}>{problem.icon}</div>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <p className={styles.cardDescription}>{problem.description}</p>
              </Card>
            ))}
          </div>

          <div className={styles.consequences}>
            <h3>{t("problem.consequences.title")}</h3>
            <ul>
              {consequences.map((consequence, index) => (
                <li key={index}>
                  <MdWarning className={styles.warningIcon} />
                  {consequence}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* Solution Part */}
      <div className={styles.solutionSection}>
        <Container>
          <div className={styles.header}>
            <span className={styles.badge}>✅ {t("solution.title")}</span>
            <h2 className={styles.title}>{t("solution.subtitle")}</h2>
            <p className={styles.intro}>{t("solution.intro")}</p>
          </div>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <Card key={index} className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>

                {"points" in feature && (
                  <ul className={styles.pointsList}>
                    {feature?.points?.map((point, idx) => (
                      <li key={idx}>
                        <IoCheckmarkCircle className={styles.checkIcon} />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {"examples" in feature && (
                  <>
                    <div className={styles.examples}>
                      {feature.examples?.map((example, idx) => (
                        <div key={idx} className={styles.example}>
                          <span className={styles.exampleIcon}>💬</span>
                          <span className={styles.exampleText}>
                            "{example}"
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className={styles.technology}>{feature.technology}</p>
                  </>
                )}
              </Card>
            ))}
          </div>

          <div className={styles.impact}>
            <h3>{t("solution.impact.title")}</h3>
            <div className={styles.impactGrid}>
              {impacts.map((impact, index) => (
                <div key={index} className={styles.impactCard}>
                  <IoCheckmarkCircle className={styles.impactIcon} />
                  <p>{impact}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
