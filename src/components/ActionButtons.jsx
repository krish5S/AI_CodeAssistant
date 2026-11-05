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
      const res = await axios.post("/api/analyze", {
        code,
        language,
        action: actionType,
      });

      setResponse(res.data.result);
    } catch (error) {
      console.error("❌ API Error:", error);
      const errorMessage =
        error.response?.data?.details || error.message || "Server Error";
      alert("Analysis Failed: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="button-group">
      <button
        className="btn-explain"
        onClick={() => callAPI("explain")}
        disabled={loading}
      >
        💡 Explain
      </button>

      <button
        className="btn-bugs"
        onClick={() => callAPI("bugs")}
        disabled={loading}
      >
        🐛 Find Bugs
      </button>

      <button
        className="btn-optimize"
        onClick={() => callAPI("optimize")}
        disabled={loading}
      >
        ⚡ Optimize
      </button>

      <button
        className="btn-complexity"
        onClick={() => callAPI("complexity")}
        disabled={loading}
      >
        📊 Complexity
      </button>

      {loading && (
        <div className="loading-indicator">
          <span>🚀 AI is analyzing your code...</span>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;