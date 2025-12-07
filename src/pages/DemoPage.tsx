import { useTranslation } from "react-i18next";
import { ChatBot } from "../components/ChatBot/ChatBot";
import { BottleFactoryTool } from "../components/BottleFactoryTool/BottleFactoryTool";
import styles from "./DemoPage.module.css";

export const DemoPage = () => {
  const { t } = useTranslation();
  const exampleQuestions = [
    {
      language: "uz",
      text: "G'isht zavodimda CO₂ chiqindisini kamaytirish uchun 3 ta amaliy usul aytib bering.",
    },
    {
      language: "en",
      text: "We have rising vibration on a conveyor motor: 4.2 → 4.5 → 5.1 mm/s. What should we check first?",
    },
    {
      language: "ru",
      text: "Как ваш проект помогает заводам сократить выбросы CO₂ и повысить энергоэффективность?",
    },
  ];

  const handleQuestionClick = (question: string) => {
    // Auto-send the question
    const chatBotElement = document.querySelector(
      'input[placeholder="Ask something..."]'
    ) as HTMLInputElement;
    if (chatBotElement) {
      chatBotElement.value = question;
      const sendButton = chatBotElement.nextElementSibling as HTMLButtonElement;
      if (sendButton) {
        sendButton.click();
      }
    }
  };

  return (
    <main className={styles.demoPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.liveDot}></span>
            {t("demo.hero.badge")}
          </div>
          <h1 className={styles.mainTitle}>{t("demo.hero.title")}</h1>
          <p className={styles.subtitle}>{t("demo.hero.subtitle")}</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Demo Video Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t("demo.demoVideo.title")}</h2>
              <p className={styles.cardText}>{t("demo.demoVideo.intro")}</p>
              <ul className={styles.videoList}>
                <li>{t("demo.demoVideo.point1")}</li>
                <li>{t("demo.demoVideo.point2")}</li>
                <li>{t("demo.demoVideo.point3")}</li>
              </ul>
              <div className={styles.videoWrapper}>
                <iframe
                  src="https://www.youtube.com/embed/cf9a9le9bQc"
                  title="GreenMind AI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                ></iframe>
              </div>
            </div>

            {/* What This Demo Shows Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t("demo.whatThisShows.title")}
              </h2>
              <div className={styles.demoPoints}>
                <div className={styles.demoPoint}>
                  <span className={styles.pointNumber}>
                    {t("demo.whatThisShows.point1.number")}
                  </span>
                  <div>
                    <h3 className={styles.pointTitle}>
                      {t("demo.whatThisShows.point1.title")}
                    </h3>
                    <p className={styles.pointText}>
                      {t("demo.whatThisShows.point1.description")}
                    </p>
                  </div>
                </div>
                <div className={styles.demoPoint}>
                  <span className={styles.pointNumber}>
                    {t("demo.whatThisShows.point2.number")}
                  </span>
                  <div>
                    <h3 className={styles.pointTitle}>
                      {t("demo.whatThisShows.point2.title")}
                    </h3>
                    <p className={styles.pointText}>
                      {t("demo.whatThisShows.point2.description")}
                    </p>
                  </div>
                </div>
                <div className={styles.demoPoint}>
                  <span className={styles.pointNumber}>
                    {t("demo.whatThisShows.point3.number")}
                  </span>
                  <div>
                    <h3 className={styles.pointTitle}>
                      {t("demo.whatThisShows.point3.title")}
                    </h3>
                    <p className={styles.pointText}>
                      {t("demo.whatThisShows.point3.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t("demo.techStack.title")}</h2>
              <div className={styles.techGrid}>
                <div className={styles.techBlock}>
                  <h3 className={styles.techBlockTitle}>
                    {t("demo.techStack.frontend.title")}
                  </h3>
                  <p className={styles.techBlockText}>
                    {t("demo.techStack.frontend.description")}
                  </p>
                </div>
                <div className={styles.techBlock}>
                  <h3 className={styles.techBlockTitle}>
                    {t("demo.techStack.backend.title")}
                  </h3>
                  <p className={styles.techBlockText}>
                    {t("demo.techStack.backend.description")}
                  </p>
                </div>
                <div className={styles.techBlock}>
                  <h3 className={styles.techBlockTitle}>
                    {t("demo.techStack.demoData.title")}
                  </h3>
                  <p className={styles.techBlockText}>
                    {t("demo.techStack.demoData.description")}
                  </p>
                </div>
                <div className={styles.techBlock}>
                  <h3 className={styles.techBlockTitle}>
                    {t("demo.techStack.roadmap.title")}
                  </h3>
                  <p className={styles.techBlockText}>
                    {t("demo.techStack.roadmap.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Live Chat Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t("demo.liveChat.title")}</h2>
              <p className={styles.cardText}>
                {t("demo.liveChat.description")}{" "}
                <strong>{t("demo.liveChat.languages")}</strong>.
              </p>

              {/* Example Questions */}
              <div className={styles.exampleQuestions}>
                <p className={styles.exampleLabel}>
                  {t("demo.liveChat.exampleLabel")}
                </p>
                <div className={styles.questionChips}>
                  {exampleQuestions.map((q, index) => (
                    <button
                      key={index}
                      className={styles.questionChip}
                      onClick={() => handleQuestionClick(q.text)}
                    >
                      <span className={styles.chipLanguage}>
                        {q.language.toUpperCase()}
                      </span>
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline ChatBot */}
              <div className={styles.chatBotWrapper}>
                <ChatBot inline={true} />
              </div>
            </div>
            {/* <div className={styles.card}>
              <h2 className={styles.cardTitle}>API access example</h2>
              <p className={styles.cardText}>
                GreenMind AI can also be used via REST API:
              </p>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeMethod}>POST</span>
                  <span className={styles.codeEndpoint}>/api/chat</span>
                </div>
                <div className={styles.codeContent}>
                  <div className={styles.codeSection}>
                    <span className={styles.codeLabel}>Request:</span>
                    <pre className={styles.codeText}>{`{
  "message": "How does your project use AI?",
  "history": []
}`}</pre>
                  </div>
                  <div className={styles.codeSection}>
                    <span className={styles.codeLabel}>Response:</span>
                    <pre className={styles.codeText}>{`{
  "success": true,
  "message": "Our project uses AI to analyze factory data (energy, CO₂, sensor signals) and generate practical recommendations for engineers.",
  "timestamp": "2025-12-06T12:34:56.000Z"
}`}</pre>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottle Factory Tool */}
        <BottleFactoryTool />
      </div>
    </main>
  );
};
