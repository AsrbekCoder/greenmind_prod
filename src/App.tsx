import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { ChatBot } from './components/ChatBot/ChatBot';
import { HomePage } from './pages/HomePage';
import { DemoPage } from './pages/DemoPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={
              <main>
                <HomePage />
              </main>
            } />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
