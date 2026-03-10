import { useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ActionButtons from "./components/ActionButtons";
import OutputPanel from "./components/OutputPanel";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Code Assistant</h1>
        <p className="tagline">
          Paste your code. Get instant AI-powered insights.
        </p>
      </header>

      <div className="main-layout">
        {/* Left Panel — Editor */}
        <div className="glass-card">
          <div className="panel-title">
            <span className="icon">✦</span> Code Editor
          </div>

          <LanguageSelector language={language} setLanguage={setLanguage} />

          <CodeEditor code={code} setCode={setCode} language={language} />

          <ActionButtons
            code={code}
            language={language}
            setResponse={setResponse}
          />
        </div>

        {/* Right Panel — Output */}
        <div className="glass-card">
          <div className="panel-title">
            <span className="icon">⚡</span> Analysis Output
          </div>

          <OutputPanel response={response} />
        </div>
      </div>
    </div>
  );
}

export default App;
