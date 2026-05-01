// import React, { useRef } from "react";
// export function Ref(){
//     const inputRef = useRef()
 
//     function focusInput(){
//         inputRef.current.focus()

      
//     }

//     return(
//         <>
//         <input  ref={inputRef} />
//         <button onClick={focusInput}> click me</button>

//                 </>
//     )
// }
import { useState, useCallback } from "react";

const THEME = {
  bg: "#0f0e0c",
  surface: "#1a1814",
  border: "#2e2b24",
  gold: "#f5c842",
  goldDim: "#b8922e",
  text: "#e8e0d0",
  textMuted: "#8a8070",
  red: "#e05c4b",
  green: "#5cba8a",
  blue: "#5b9fe0",
};

// Simulated bias analysis using Claude API
async function analyzeBias(dataDescription, modelDescription) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are an AI bias detection expert. Analyze the following dataset/model description for potential bias and fairness issues.

Dataset Description: ${dataDescription}
Model/System Description: ${modelDescription}

Respond ONLY with a JSON object (no markdown, no backticks) with this exact structure:
{
  "overallRiskScore": <number 0-100>,
  "riskLevel": "<low|medium|high|critical>",
  "biasTypes": [
    {
      "name": "<bias type name>",
      "severity": "<low|medium|high>",
      "description": "<one sentence explanation>",
      "recommendation": "<one sentence fix>"
    }
  ],
  "fairnessMetrics": {
    "demographicParity": <number 0-100>,
    "equalOpportunity": <number 0-100>,
    "predictiveParity": <number 0-100>,
    "individualFairness": <number 0-100>
  },
  "summary": "<2-3 sentence executive summary>",
  "topRecommendation": "<single most important action to take>"
}`,
        },
      ],
    }),
  });
  const data = await response.json();
  const text = data.content.map((i) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

function GaugeRing({ score, size = 120, strokeWidth = 10, color }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const cx = size / 2;

  const riskColor =
    score >= 75
      ? THEME.red
      : score >= 50
      ? "#e0a84b"
      : score >= 25
      ? THEME.gold
      : THEME.green;
  const c = color || riskColor;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={THEME.border}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={c}
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

function MetricBar({ label, value, color }) {
  const c =
    color ||
    (value >= 75 ? THEME.green : value >= 50 ? THEME.gold : THEME.red);
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
          fontSize: 12,
          color: THEME.textMuted,
          fontFamily: "'Space Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span>{label}</span>
        <span style={{ color: c, fontWeight: 700 }}>{value}%</span>
      </div>
      <div
        style={{
          background: THEME.border,
          borderRadius: 4,
          height: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: c,
            borderRadius: 4,
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const map = {
    low: { bg: "#1a3028", color: THEME.green, label: "LOW" },
    medium: { bg: "#332800", color: THEME.gold, label: "MED" },
    high: { bg: "#331a15", color: THEME.red, label: "HIGH" },
  };
  const s = map[severity] || map.medium;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 3,
        fontFamily: "'Space Mono', monospace",
        letterSpacing: "0.1em",
        border: `1px solid ${s.color}30`,
      }}
    >
      {s.label}
    </span>
  );
}

function RiskLevelChip({ level }) {
  const map = {
    low: { color: THEME.green, label: "LOW RISK" },
    medium: { color: THEME.gold, label: "MEDIUM RISK" },
    high: { color: THEME.red, label: "HIGH RISK" },
    critical: { color: "#ff3b3b", label: "CRITICAL RISK" },
  };
  const r = map[level] || map.medium;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 16px",
        border: `1px solid ${r.color}50`,
        borderRadius: 40,
        background: `${r.color}12`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: r.color,
          boxShadow: `0 0 8px ${r.color}`,
        }}
      />
      <span
        style={{
          color: r.color,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.12em",
        }}
      >
        {r.label}
      </span>
    </div>
  );
}

export default function BiasDetector() {
  const [dataDesc, setDataDesc] = useState("");
  const [modelDesc, setModelDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = useCallback(async () => {
    if (!dataDesc.trim() || !modelDesc.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzeBias(dataDesc, modelDesc);
      setResult(res);
    } catch (e) {
      setError("Analysis failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  }, [dataDesc, modelDesc]);

  const inputStyle = {
    width: "100%",
    background: THEME.surface,
    border: `1px solid ${THEME.border}`,
    borderRadius: 8,
    color: THEME.text,
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    padding: "12px 14px",
    resize: "vertical",
    outline: "none",
    lineHeight: 1.6,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: THEME.gold,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: THEME.bg,
        color: THEME.text,
        fontFamily: "'DM Sans', sans-serif",
        padding: "32px 20px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        textarea:focus { border-color: #f5c842 !important; }
        textarea::placeholder { color: #55504a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1814; }
        ::-webkit-scrollbar-thumb { background: #2e2b24; border-radius: 2px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: `${THEME.gold}20`,
                border: `1px solid ${THEME.gold}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⚖️
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                fontFamily: "'Space Mono', monospace",
                color: THEME.gold,
                letterSpacing: "-0.01em",
              }}
            >
              Unbiased AI Decision
            </h1>
          </div>
          <p
            style={{
              margin: 0,
              color: THEME.textMuted,
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            Inspect datasets and AI models for hidden unfairness. Measure, flag,
            and fix harmful bias before it impacts real people.
          </p>
        </div>

        {/* Input Panel */}
        <div
          style={{
            background: THEME.surface,
            border: `1px solid ${THEME.border}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <label style={labelStyle}>Dataset Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                placeholder="e.g. Historical hiring data from 2010–2020 containing applicant demographics, education, experience, and outcomes. ~50k records, mostly from Fortune 500 companies..."
                value={dataDesc}
                onChange={(e) => setDataDesc(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Model / System Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                placeholder="e.g. A gradient boosting classifier that predicts loan approval likelihood. Features include credit score, income, zip code, employment history, and age..."
                value={modelDesc}
                onChange={(e) => setModelDesc(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !dataDesc.trim() || !modelDesc.trim()}
            style={{
              background:
                loading || !dataDesc.trim() || !modelDesc.trim()
                  ? THEME.border
                  : THEME.gold,
              color:
                loading || !dataDesc.trim() || !modelDesc.trim()
                  ? THEME.textMuted
                  : "#0f0e0c",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor:
                loading || !dataDesc.trim() || !modelDesc.trim()
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {loading && (
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: `2px solid ${THEME.textMuted}`,
                  borderTopColor: THEME.text,
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
            )}
            {loading ? "ANALYZING..." : "RUN BIAS ANALYSIS"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: `${THEME.red}15`,
              border: `1px solid ${THEME.red}40`,
              borderRadius: 8,
              padding: "14px 18px",
              color: THEME.red,
              fontSize: 13,
              marginBottom: 24,
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {/* Top Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 20,
                marginBottom: 20,
              }}
            >
              {/* Overall Score */}
              <div
                style={{
                  background: THEME.surface,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div style={{ position: "relative" }}>
                  <GaugeRing score={result.overallRiskScore} size={110} />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 700,
                        fontFamily: "'Space Mono', monospace",
                        color: THEME.text,
                        lineHeight: 1,
                      }}
                    >
                      {result.overallRiskScore}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: THEME.textMuted,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: 3,
                      }}
                    >
                      risk score
                    </div>
                  </div>
                </div>
                <RiskLevelChip level={result.riskLevel} />
              </div>

              {/* Summary + Fairness Metrics */}
              <div
                style={{
                  background: THEME.surface,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: THEME.gold,
                      marginBottom: 8,
                      fontWeight: 700,
                    }}
                  >
                    Executive Summary
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: THEME.text,
                    }}
                  >
                    {result.summary}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${THEME.border}`,
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: THEME.gold,
                      marginBottom: 12,
                      fontWeight: 700,
                    }}
                  >
                    Fairness Metrics
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0 24px",
                    }}
                  >
                    <MetricBar
                      label="Demographic Parity"
                      value={result.fairnessMetrics.demographicParity}
                    />
                    <MetricBar
                      label="Equal Opportunity"
                      value={result.fairnessMetrics.equalOpportunity}
                    />
                    <MetricBar
                      label="Predictive Parity"
                      value={result.fairnessMetrics.predictiveParity}
                    />
                    <MetricBar
                      label="Individual Fairness"
                      value={result.fairnessMetrics.individualFairness}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bias Types */}
            <div
              style={{
                background: THEME.surface,
                border: `1px solid ${THEME.border}`,
                borderRadius: 12,
                padding: 24,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: THEME.gold,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                Detected Bias Types
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {result.biasTypes.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      background: THEME.bg,
                      border: `1px solid ${THEME.border}`,
                      borderRadius: 8,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 8,
                      }}
                    >
                      <SeverityBadge severity={b.severity} />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: THEME.text,
                        }}
                      >
                        {b.name}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: 13,
                        color: THEME.textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {b.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 6,
                        fontSize: 12,
                        color: THEME.green,
                      }}
                    >
                      <span style={{ marginTop: 1 }}>↳</span>
                      <span>{b.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Recommendation */}
            <div
              style={{
                background: `${THEME.gold}0d`,
                border: `1px solid ${THEME.gold}30`,
                borderRadius: 12,
                padding: "18px 22px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div
                style={{ fontSize: 20, marginTop: 1, flexShrink: 0 }}
              >
                🎯
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: THEME.gold,
                    marginBottom: 6,
                    fontWeight: 700,
                  }}
                >
                  Priority Action
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: THEME.text,
                    lineHeight: 1.6,
                  }}
                >
                  {result.topRecommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: THEME.textMuted,
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            Fill in both fields above and run analysis to detect bias ↑
          </div>
        )}
      </div>
    </div>
  );
}