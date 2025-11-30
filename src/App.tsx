import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { Hero } from './components/sections/Hero/Hero';
import { ProblemSolution } from './components/sections/ProblemSolution/ProblemSolution';
import { Team } from './components/sections/Team/Team';
import { WhyUs, Roadmap, Approach, BusinessModel } from './components/sections/SimpleSections';
import { RequestDemo } from './components/sections/RequestDemo/RequestDemo';
import { ChatBot } from './components/ChatBot/ChatBot';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Team />
        <WhyUs />
        <Roadmap />
        <Approach />
        <BusinessModel />
        <RequestDemo />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
