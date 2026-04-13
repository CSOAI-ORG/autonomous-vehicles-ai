/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/autonomous-vehicles-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleAvSafetyAssessment } from "./tools/av-safety-assessment.js";
import { handleAvLiabilityFramework } from "./tools/av-liability-framework.js";

const server = new McpServer({
  name: "csoai-autonomous-vehicles-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const AvSafetyAssessmentShape = {
  system_name: z.string().describe("Name of the AV system"),
  autonomy_level: z.string().describe("SAE level (L0-L5)"),
  ai_components: z.string().describe("AI subsystems (perception, planning, V2X, mapping)"),
  safety_validation: z.string().describe("Validation approach (simulation, closed-course, ODD, shadow mode)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, China, Japan, etc.)"),
};

const AvLiabilityFrameworkShape = {
  system_name: z.string().describe("Name of the AV system"),
  liability_model: z.string().describe("Liability model (manufacturer, operator, shared, insurance-backed)"),
  incident_type: z.string().describe("Type of incident (collision, pedestrian, property, cyber-physical)"),
  insurance_coverage: z.string().describe("Insurance type (product liability, motor, cyber, combined)"),
  jurisdiction: z.string().describe("Operating jurisdiction"),
};

// ─── Tool 1: av_safety_assessment ───
(server.tool as any)(
  "av_safety_assessment",
  "Assess safety and regulatory compliance for autonomous vehicle AI. Covers perception, decision-making, V2X, ISO 26262, SOTIF, and liability.",
  AvSafetyAssessmentShape,
  async (args: any) => {
    const result = handleAvSafetyAssessment(args.system_name, args.autonomy_level, args.ai_components, args.safety_validation, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 2: av_liability_framework ───
(server.tool as any)(
  "av_liability_framework",
  "Assess liability and insurance compliance for autonomous vehicles. Covers product liability, operator responsibility, manufacturer obligations, and insurance requirements.",
  AvLiabilityFrameworkShape,
  async (args: any) => {
    const result = handleAvLiabilityFramework(args.system_name, args.liability_model, args.incident_type, args.insurance_coverage, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
