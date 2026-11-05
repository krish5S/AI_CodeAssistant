import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <div className="editor-container">
      <Editor
        height="420px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minimap: { enabled: false },
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "gutter",
        }}
      />
    </div>
  );
}

export default CodeEditor;
