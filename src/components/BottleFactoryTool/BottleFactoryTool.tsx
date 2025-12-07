import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./BottleFactoryTool.module.css";

// Type definitions
interface Zone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Factory {
  id: string;
  name: string;
  location: string;
  description: string;
  width: number;
  height: number;
  zones: Zone[];
}

// Backend readings structure
interface ZoneSensor {
  temperature?: number;
  pressure?: number;
  power_kw?: number;
  vibration?: number;
  efficiency?: number;
  cycle_time_sec?: number;
  output_bottles_per_min?: number;
  quality_score?: number;
  fill_level_accuracy?: number;
  flow_rate_lpm?: number;
  downtime_min?: number;
  bottles_filled?: number;
  label_position_accuracy?: number;
  speed_bottles_per_min?: number;
  reject_rate?: number;
  belt_speed_mpm?: number;
  motor_temperature?: number;
  humidity?: number;
  co2_level_ppm?: number;
  occupancy_percent?: number;
}

interface ZoneReading {
  id: string;
  sensors: ZoneSensor;
  alerts: string[];
}

interface Readings {
  timestamp: string;
  zones: ZoneReading[];
  summary: {
    total_power_kw: number;
    active_alerts: number;
    overall_efficiency: number;
    production_rate_bottles_per_hour: number;
  };
}

interface Issue {
  id: string;
  zoneId: string;
  severity: "critical" | "warning" | "ok";
  title: string;
  description: string;
  metrics?: Record<string, number>;
  estimated_savings_kwh?: number;
  estimated_savings_usd?: number;
}

interface KPIs {
  avg_energy_per_1000_bottles_kwh: number;
  avg_scrap_rate_percent: number;
  estimated_co2_tonnes: number;
}

interface AnalysisResult {
  success: boolean;
  factoryName?: string;
  layout?: string;
  kpis?: KPIs;
  issues?: Issue[];
  actions?: string[];
  analysisMarkdown?: string;
}

// Backend response structure
interface BackendIssue {
  zone_id: string;
  zone_name: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  metrics?: Record<string, number>;
  estimated_savings_kwh?: number;
  estimated_savings_usd?: number;
}

interface BackendAnalysisResponse {
  success: boolean;
  analysis?: {
    timestamp?: string;
    overall_assessment?: string;
    issues?: BackendIssue[];
    metrics?: {
      total_power_kw?: number;
      overall_efficiency?: number;
      production_rate_bottles_per_hour?: number;
      avg_energy_per_1000_bottles_kwh?: number;
      active_alerts?: number;
    };
    readings?: any;
  };
}

type ZoneSeverity = "ok" | "warning" | "critical";

// API base URL
const API_BASE_URL = "http://localhost:3002/api";

export const BottleFactoryTool = () => {
  const { i18n } = useTranslation();

  // State
  const [factoryLayout, setFactoryLayout] = useState<Factory | null>(null);
  const [readings, setReadings] = useState<Readings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [zoneSeverities, setZoneSeverities] = useState<
    Record<string, ZoneSeverity>
  >({});

  // Fetch factory layout and readings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [factoryRes, readingsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/demo/bottle/factory`),
          fetch(`${API_BASE_URL}/demo/bottle/readings`),
        ]);

        if (!factoryRes.ok || !readingsRes.ok) {
          throw new Error("Failed to fetch demo data");
        }

        const factoryData = await factoryRes.json();
        const readingsData = await readingsRes.json();

        // Log the responses for debugging
        console.log("Factory data:", factoryData);
        console.log("Readings data:", readingsData);

        if (!factoryData.success || !readingsData.success) {
          throw new Error("API returned unsuccessful response");
        }

        setFactoryLayout(factoryData.factory);
        setReadings(readingsData.readings);

        // Initialize all zones as "ok"
        const initialSeverities: Record<string, ZoneSeverity> = {};
        factoryData.factory.zones.forEach((zone: Zone) => {
          initialSeverities[zone.id] = "ok";
        });
        setZoneSeverities(initialSeverities);
      } catch (err) {
        console.error("Error fetching demo data:", err);
        setError("Could not load demo factory data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle analyze button click
  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);

      // Map i18n language to API language (uz | ru | en)
      const currentLang = i18n.language || "en";
      const apiLang = ["uz", "ru", "en"].includes(currentLang)
        ? (currentLang as "uz" | "ru" | "en")
        : "en";

      const response = await fetch(`${API_BASE_URL}/demo/bottle/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: apiLang }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze factory");
      }

      const rawData: BackendAnalysisResponse = await response.json();

      // Log the response for debugging
      console.log("Analysis response:", JSON.stringify(rawData, null, 2));

      if (!rawData.success) {
        throw new Error("Analysis was unsuccessful");
      }

      // Map backend response to frontend structure
      const mappedData: AnalysisResult = {
        success: rawData.success,
        factoryName: "Bottle Factory",
        kpis: rawData.analysis?.metrics && rawData.analysis.metrics.avg_energy_per_1000_bottles_kwh !== undefined ? {
          avg_energy_per_1000_bottles_kwh: rawData.analysis.metrics.avg_energy_per_1000_bottles_kwh,
          avg_scrap_rate_percent: 0, // Not in backend response
          estimated_co2_tonnes: 0, // Not in backend response
        } : undefined,
        issues: rawData.analysis?.issues ? rawData.analysis.issues.map((issue: BackendIssue) => ({
          id: issue.zone_id || Math.random().toString(),
          zoneId: issue.zone_id,
          severity: issue.severity === "high" ? "critical" : issue.severity === "medium" ? "warning" : "ok",
          title: issue.title,
          description: issue.description,
          metrics: issue.metrics,
          estimated_savings_kwh: issue.estimated_savings_kwh,
          estimated_savings_usd: issue.estimated_savings_usd,
        })) : undefined,
        analysisMarkdown: rawData.analysis?.overall_assessment || "",
      };

      console.log("Mapped data:", mappedData);
      console.log("Has kpis?", !!mappedData.kpis);
      console.log("Has issues?", !!mappedData.issues);
      console.log("Has analysisMarkdown?", !!mappedData.analysisMarkdown);

      setAnalysisResult(mappedData);

      // Update zone severities based on issues
      const newSeverities: Record<string, ZoneSeverity> = {};

      // Initialize all zones as "ok"
      if (factoryLayout?.zones && Array.isArray(factoryLayout.zones)) {
        factoryLayout.zones.forEach((zone) => {
          newSeverities[zone.id] = "ok";
        });
      }

      // Update severities based on issues (if issues exist)
      if (mappedData.issues && Array.isArray(mappedData.issues)) {
        mappedData.issues.forEach((issue: Issue) => {
          const currentSeverity = newSeverities[issue.zoneId] || "ok";

          // Critical takes precedence over warning, warning over ok
          if (issue.severity === "critical") {
            newSeverities[issue.zoneId] = "critical";
          } else if (
            issue.severity === "warning" &&
            currentSeverity !== "critical"
          ) {
            newSeverities[issue.zoneId] = "warning";
          }
        });
      }

      setZoneSeverities(newSeverities);
    } catch (err) {
      console.error("Error analyzing factory:", err);
      setError("Failed to run analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Get issue count for a zone
  const getZoneIssueCount = (zoneId: string): number => {
    if (!analysisResult || !analysisResult.issues || !Array.isArray(analysisResult.issues)) return 0;
    return analysisResult.issues.filter((issue) => issue.zoneId === zoneId)
      .length;
  };

  // Get zone name by ID
  const getZoneName = (zoneId: string): string => {
    const zone = factoryLayout?.zones.find((z) => z.id === zoneId);
    return zone?.label || "Unknown Zone";
  };

  // Helper: Convert camelCase/snake_case to Title Case
  const formatMetricLabel = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper: Format metric values with units
  const formatMetricValue = (key: string, value: number): string => {
    const keyLower = key.toLowerCase();

    if (keyLower.includes("temp")) return `${value.toFixed(1)}°C`;
    if (keyLower.includes("power") || keyLower.includes("kwh") || keyLower.includes("kw"))
      return `${value.toFixed(1)} kW`;
    if (keyLower.includes("efficiency") || keyLower.includes("accuracy") || keyLower.includes("rate"))
      return `${value.toFixed(1)}%`;
    if (keyLower.includes("downtime") || keyLower.includes("min"))
      return `${value.toFixed(0)} min`;
    if (keyLower.includes("bottles")) return `${value.toFixed(0)} bottles`;
    if (keyLower.includes("output") && keyLower.includes("min"))
      return `${value.toFixed(0)} bottles/min`;
    if (keyLower.includes("pressure")) return `${value.toFixed(1)} bar`;
    if (keyLower.includes("vibration")) return `${value.toFixed(1)} mm/s`;
    if (keyLower.includes("score")) return `${value.toFixed(1)}`;
    if (keyLower.includes("time") && keyLower.includes("sec"))
      return `${value.toFixed(1)} sec`;

    return value.toFixed(1);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bottle factory demo (tool)</h2>
          <p className={styles.subtitle}>Loading factory data...</p>
        </div>
        <div className={styles.loadingSkeleton}>
          <div className={styles.skeletonPulse}></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !factoryLayout) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bottle factory demo (tool)</h2>
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Bottle factory demo (tool)</h2>
        <p className={styles.subtitle}>
          This is a live simulation of a bottle factory with real-time sensor data.
          Click 'Analyze factory' to see how GreenMind AI detects energy waste,
          CO₂ emissions, and mechanical issues, then highlights problem zones on the
          factory map.
        </p>
      </div>

      {/* Main Content - Two Column Layout for Map and Readings */}
      <div className={styles.topContent}>
        {/* Left Column: Factory Map */}
        <div className={styles.leftColumn}>
          <div className={styles.mapSection}>
            <h3 className={styles.sectionTitle}>Factory Layout</h3>
            <div className={styles.mapContainer}>
              {factoryLayout?.zones.map((zone) => {
                const severity = zoneSeverities[zone.id] || "ok";
                const issueCount = getZoneIssueCount(zone.id);

                return (
                  <div
                    key={zone.id}
                    className={`${styles.zone} ${
                      styles[
                        `zone${severity
                          .charAt(0)
                          .toUpperCase()}${severity?.slice(1)}`
                      ]
                    }`}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.w}%`,
                      height: `${zone.h}%`,
                    }}
                    title={`${zone.label}${
                      issueCount > 0 ? ` - ${issueCount} issue(s)` : ""
                    }`}
                  >
                    <span className={styles.zoneLabel}>{zone.label}</span>
                    {issueCount > 0 && (
                      <span className={styles.issueCount}>{issueCount}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Readings + KPIs */}
        <div className={styles.rightColumn}>
          {/* Readings Summary */}
          {readings && (
            <div className={styles.readingsSection}>
              <h3 className={styles.sectionTitle}>Current Factory Status</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.readingsTable}>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Power</td>
                      <td>{readings.summary.total_power_kw.toLocaleString()} kW</td>
                    </tr>
                    <tr>
                      <td>Production Rate</td>
                      <td>{readings.summary.production_rate_bottles_per_hour.toLocaleString()} bottles/hr</td>
                    </tr>
                    <tr>
                      <td>Overall Efficiency</td>
                      <td>{readings.summary.overall_efficiency.toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td>Active Alerts</td>
                      <td>{readings.summary.active_alerts}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KPI Tiles */}
          {analysisResult && analysisResult.kpis && (
            <div className={styles.kpiSection}>
              <h3 className={styles.sectionTitle}>
                Key Performance Indicators
              </h3>
              <div className={styles.kpiGrid}>
                <div className={styles.kpiTile}>
                  <div className={styles.kpiValue}>
                    {analysisResult.kpis.avg_energy_per_1000_bottles_kwh?.toFixed(
                      1
                    ) || "N/A"}
                  </div>
                  <div className={styles.kpiLabel}>kWh / 1000 bottles</div>
                </div>
                <div className={styles.kpiTile}>
                  <div className={styles.kpiValue}>
                    {analysisResult.kpis.avg_scrap_rate_percent?.toFixed(1) || "N/A"}%
                  </div>
                  <div className={styles.kpiLabel}>Scrap rate</div>
                </div>
                <div className={styles.kpiTile}>
                  <div className={styles.kpiValue}>
                    {analysisResult.kpis.estimated_co2_tonnes?.toFixed(1) || "N/A"}
                  </div>
                  <div className={styles.kpiLabel}>t CO₂ (7 days)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Analyze Button + Issues + AI Analysis */}
      <div className={styles.bottomSection}>
        {/* Analyze Button */}
        <div className={styles.analyzeSection}>
          <button
            className={styles.analyzeButton}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className={styles.spinner}></span>
                Analyzing...
              </>
            ) : (
              "Analyze factory with GreenMind AI"
            )}
          </button>
          {error && analysisResult && (
            <p className={styles.errorText}>{error}</p>
          )}
        </div>

        {/* Issues List */}
        {analysisResult && (
          <div className={styles.issuesSection}>
            <h3 className={styles.sectionTitle}>Detected Issues</h3>
            {!analysisResult.issues || !Array.isArray(analysisResult.issues) || analysisResult.issues.length === 0 ? (
              <p className={styles.noIssuesText}>
                No issues detected. Factory is operating normally.
              </p>
            ) : (
              <div className={styles.issuesList}>
                {analysisResult.issues.map((issue) => (
                  <div key={issue.id} className={styles.issueCard}>
                    <div className={styles.issueHeader}>
                      <span className={styles.issueZone}>
                        {getZoneName(issue.zoneId)}
                      </span>
                      <span
                        className={`${styles.severityBadge} ${
                          styles[
                            `severity${issue.severity
                              .charAt(0)
                              .toUpperCase()}${issue.severity?.slice(1)}`
                          ]
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <h4 className={styles.issueTitle}>{issue.title}</h4>
                    <p className={styles.issueDescription}>
                      {issue.description}
                    </p>

                    {/* Metrics Grid */}
                    {issue.metrics && Object.keys(issue.metrics).length > 0 && (
                      <div>
                        <div className={styles.metricsHeader}>
                          <span className={styles.metricsIcon}>📊</span>
                          <h5 className={styles.metricsTitle}>Metrics</h5>
                        </div>
                        <div className={styles.metricsGrid}>
                          {Object.entries(issue.metrics).map(([key, value]) => (
                            <div key={key} className={styles.metricItem}>
                              <span className={styles.metricLabel}>
                                {formatMetricLabel(key)}
                              </span>
                              <span className={styles.metricValue}>
                                {formatMetricValue(key, value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Estimated Savings */}
                    {(issue.estimated_savings_kwh !== undefined ||
                      issue.estimated_savings_usd !== undefined) && (
                      <div className={styles.savingsContainer}>
                        <span className={styles.savingsLabel}>Potential Savings:</span>
                        <div className={styles.savingsBadges}>
                          {issue.estimated_savings_kwh !== undefined &&
                            issue.estimated_savings_kwh > 0 && (
                              <span className={styles.savingsBadgeEnergy}>
                                ⚡ {issue.estimated_savings_kwh.toFixed(1)} kWh
                              </span>
                            )}
                          {issue.estimated_savings_usd !== undefined &&
                            issue.estimated_savings_usd > 0 && (
                              <span className={styles.savingsBadgeMoney}>
                                💰 ${issue.estimated_savings_usd}
                              </span>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Analysis (Markdown) */}
        {analysisResult && (
          <div className={styles.analysisSection}>
            <h3 className={styles.sectionTitle}>AI Analysis</h3>
            <p className={styles.analysisSubtext}>
              Generated by GreenMind AI based on real-time factory sensor data
              and production metrics.
            </p>
            {analysisResult.analysisMarkdown ? (
              <div className={styles.markdownContent}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysisResult.analysisMarkdown}
                </ReactMarkdown>
              </div>
            ) : (
              <p className={styles.noAnalysisText}>
                The AI did not return a full report. Please try again.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
