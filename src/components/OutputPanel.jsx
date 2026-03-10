import ReactMarkdown from "react-markdown";

function OutputPanel({ response }) {
  return (
    <div className="output-panel">
      {!response ? (
        <div className="output-empty">
          <span className="empty-icon">✨</span>
          <p>
            Your AI analysis results will appear here. Paste some code and click
            an action to get started.
          </p>
        </div>
      ) : (
        <div className="output-content">
          <h3>✅ Analysis Results</h3>
          <div className="markdown-body">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputPanel;