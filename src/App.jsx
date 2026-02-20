import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ActionButtons from "./components/ActionButtons";
import OutputPanel from "./components/OutputPanel";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [response, setResponse] = useState(null);

  useEffect(() => {
  axios.get("http://localhost:5000/api/test")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}, []);

  return (
    <div className="container">
      <h1>AI Code Assistant</h1>

      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />

      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
      />

      <ActionButtons
        code={code}
        language={language}
        setResponse={setResponse}
      />

      <OutputPanel response={response} />
    </div>
  );
}

export default App;
