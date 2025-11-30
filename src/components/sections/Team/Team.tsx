import { useTranslation } from "react-i18next";
import { Container } from "../../common/Container/Container";
import { Card } from "../../common/Card/Card";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Team.module.css";

export const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: "member1",
      avatar: "👨‍💻",
      linkedin: "www.linkedin.com/in/asrbek-suvanov-a8a128217",
      github: "https://github.com/AsrbekCoder",
    },
    {
      id: "member4",
      avatar: "👩",

      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "member2",
      avatar: "👨‍🔬",
      linkedin: "https://www.linkedin.com/in/ulug-bek-boboqulov-3b7a0b220/",
      github: "https://github.com",
    },
    {
      id: "member3",
      avatar: "👨‍🏭",
      linkedin: "https://www.linkedin.com/in/doniyor-toychiyev/",
      github: "https://github.com/incognito3263",
    },
  ];

  return (
    <section id="team" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.badge}>👥 {t("team.title")}</span>
          <h2 className={styles.title}>{t("team.title")}</h2>
          <p className={styles.subtitle}>{t("team.subtitle")}</p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <Card key={member.id} className={styles.memberCard}>
              <div className={styles.avatar}>{member.avatar}</div>
              <h3 className={styles.name}>{t(`team.${member.id}.name`)}</h3>
              <p className={styles.role}>{t(`team.${member.id}.role`)}</p>

              <div className={styles.skills}>
                <h4>Skills:</h4>
                <p>{t(`team.${member.id}.skills`)}</p>
              </div>

              <div className={styles.experience}>
                <h4>Experience:</h4>
                <p>{t(`team.${member.id}.experience`)}</p>
              </div>

              <div className={styles.focus}>
                <h4>Focus:</h4>
                <p>{t(`team.${member.id}.focus`)}</p>
              </div>

              <div className={styles.links}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
