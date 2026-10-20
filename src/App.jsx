import { useState } from "react";
import { problems, diagnose } from "./expertSystem.js";
import "./styles.css";

function App() {
  const [selectedId, setSelectedId] = useState("slow");
  const [result, setResult] = useState(diagnose("slow"));
  const [activeTab, setActiveTab] = useState("causes");

  function handleSelect(id) {
    setSelectedId(id);
    setResult(diagnose(id));
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>AI Help Desk Expert System</h1>
          <p>Interactive Rule-Based Reasoning Engine (Forward Chaining)</p>
        </div>
        <div className="badge">AI Fundamentals</div>
      </header>

      <div className="main-grid">
        {/* Left Column: Problem Selector */}
        <div className="card">
          <h2>🔍 Select Incident</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 12px 0" }}>
            Choose a simulated computer issue to trigger the inference engine:
          </p>

          <div className="problem-select-list">
            {problems.map((problem) => (
              <button
                key={problem.id}
                className={`problem-btn ${selectedId === problem.id ? "active" : ""}`}
                onClick={() => handleSelect(problem.id)}
              >
                <strong>{problem.title}</strong>
                <small>{problem.description}</small>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Diagnostic Report */}
        <div className="card">
          <h2>⚡ Inference Engine Report</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 16px 0" }}>
            Real-time fact matching and rule activation results for: <strong>{result.problem}</strong>
          </p>

          {/* Reasoning Pipeline Visualizer */}
          <div className="pipeline-box">
            <div className="pipeline-title">Fact State Machine</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>Initial Facts Loaded:</span>
                <div className="tag-row">
                  {result.initialFacts.map((fact) => (
                    <span key={fact} className="fact-tag">{fact}</span>
                  ))}
                </div>
              </div>

              {result.inferredFacts.length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  <span style={{ fontSize: "12px", color: "#166534", display: "block", marginBottom: "4px" }}>Inferred Conclusions:</span>
                  <div className="tag-row">
                    {result.inferredFacts.map((fact) => (
                      <span key={fact} className="fact-tag inferred">{fact} (+ inferred)</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs-header">
            <button
              className={`tab ${activeTab === "causes" ? "active" : ""}`}
              onClick={() => setActiveTab("causes")}
            >
              Inferred Causes ({result.causes.length})
            </button>
            <button
              className={`tab ${activeTab === "actions" ? "active" : ""}`}
              onClick={() => setActiveTab("actions")}
            >
              Action Plan ({result.actions.length})
            </button>
            <button
              className={`tab ${activeTab === "rules" ? "active" : ""}`}
              onClick={() => setActiveTab("rules")}
            >
              Fired Rules ({result.firedRules.length})
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: "200px" }}>
            {activeTab === "causes" && (
              <div>
                {result.causes.map((cause) => (
                  <div key={cause.ruleId} className="cause-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "14px", color: "#1e293b" }}>{cause.name}</strong>
                      <span style={{ fontSize: "11px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", color: "#475569" }}>
                        {cause.ruleId}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{cause.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "actions" && (
              <div>
                {result.actions.map((action, index) => (
                  <div key={index} className="action-row">
                    <div className="action-num">{index + 1}</div>
                    <div style={{ fontSize: "13px", color: "#334155", paddingTop: "2px" }}>{action}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "rules" && (
              <div>
                {result.firedRules.map((rule) => (
                  <div key={rule.id} className="rule-box">
                    <div><span className="rule-id">[{rule.id}]</span> MATCHED</div>
                    <div style={{ margin: "4px 0", color: "#93c5fd" }}>IF: {rule.conditions.join(" AND ")}</div>
                    <div style={{ color: "#86efac" }}>THEN: {rule.conclusion}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;