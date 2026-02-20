import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <div style={{ height: "400px", marginTop: "20px" }}>
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}

export default CodeEditor;
