export const DASHBOARD_NAV = [
  { label: "Overview", key: "overview" },
  { label: "Signals", key: "signals" },
  { label: "Automations", key: "automations" },
  { label: "Sources", key: "sources" },
  { label: "Settings", key: "settings" },
] as const;

export type DashboardTabKey = (typeof DASHBOARD_NAV)[number]["key"];

export const DASHBOARD_METRICS = [
  { label: "Signals resolved", value: "18,204", delta: "+12.4%" },
  { label: "Mean time to insight", value: "42s", delta: "-31%" },
  { label: "Automations triggered", value: "1,096", delta: "+8.1%" },
] as const;

export const DASHBOARD_CHART_BARS = [
  38, 52, 46, 61, 58, 74, 69, 81, 77, 90, 84, 96,
] as const;

export const DASHBOARD_SIGNALS = [
  {
    source: "Zendesk",
    entity: "Ticket #48213",
    signal: "Churn risk",
    confidence: "0.92",
  },
  {
    source: "Postgres",
    entity: "orders.refund_rate",
    signal: "Anomaly",
    confidence: "0.87",
  },
  {
    source: "Segment",
    entity: "checkout_abandon",
    signal: "Trend shift",
    confidence: "0.79",
  },
  {
    source: "Slack",
    entity: "#incidents",
    signal: "Escalation",
    confidence: "0.95",
  },
] as const;
