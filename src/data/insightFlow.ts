export type InsightStage = {
  tag: string;
  title: string;
  body: string;
};

export const INSIGHT_STAGES: InsightStage[] = [
  {
    tag: "01 — INGEST",
    title: "Pull every source into one stream.",
    body: "Logs, tickets, CRM events, and product telemetry are normalized into a single typed stream the moment they land — no nightly batch job standing between the signal and your team.",
  },
  {
    tag: "02 — ANALYZE",
    title: "Models reason over the whole graph.",
    body: "Xai builds a live relationship graph across every ingested entity, then runs it through domain-tuned models that surface causality, not just correlation.",
  },
  {
    tag: "03 — GENERATE",
    title: "Insight arrives as an answer.",
    body: "The output isn't a chart to interpret — it's a ranked, cited recommendation your team can act on, with the underlying evidence one click away.",
  },
];
