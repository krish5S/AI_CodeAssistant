import ReactMarkdown from 'react-markdown';

function OutputPanel({ response }) {
  if (!response) return null;

  return (
    <div style={{ 
      marginTop: "30px", 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      textAlign: "left"
    }}>
      <h3 style={{ borderBottom: "2px solid #555", paddingBottom: "10px" }}>
        AI Analysis Results
      </h3>
      <div style={{ lineHeight: "1.6", color: "#333" }}>
        {/* ReactMarkdown handles all the formatting for you! */}
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}

export default OutputPanel;