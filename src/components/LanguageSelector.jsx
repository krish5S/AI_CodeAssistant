function LanguageSelector({ language, setLanguage }) {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      style={{ padding: "8px", marginTop: "10px" }}
    >
      <option value="javascript">JavaScript</option>
      <option value="cpp">C++</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </select>
  );
}

export default LanguageSelector;
