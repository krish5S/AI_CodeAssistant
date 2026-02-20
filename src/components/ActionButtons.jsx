import axios from "axios";
import { useState } from "react";

function ActionButtons({ code, language, setResponse }) {
  const [loading, setLoading] = useState(false);

  const callAPI = async (actionType) => {
    if (!code || !code.trim()) {
      alert("Please paste some code first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", {
        code,
        language,
        action: actionType,
      });

      setResponse(res.data.result);
    } catch (error) {
      console.error("❌ API Error:", error);
      const errorMessage = error.response?.data?.details || error.message || "Server Error";
      alert("Analysis Failed: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <button onClick={() => callAPI("explain")} disabled={loading}>
        Explain
      </button>

      <button onClick={() => callAPI("bugs")} disabled={loading}>
        Find Bugs
      </button>

      <button onClick={() => callAPI("optimize")} disabled={loading}>
        Optimize
      </button>

      <button onClick={() => callAPI("complexity")} disabled={loading}>
        Complexity
      </button>

      {loading && (
        <p style={{ width: "100%", color: "#666", fontStyle: "italic" }}>
          🚀 AI is thinking... please wait...
        </p>
      )}
    </div>
  );
}

export default ActionButtons;