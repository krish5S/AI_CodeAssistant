function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="language-selector-wrapper">
      <label htmlFor="language-select">Language</label>
      <select
        id="language-select"
        className="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
