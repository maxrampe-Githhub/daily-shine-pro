import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SERVICES = [
  { name: "Interior Detail", description: "Deep interior cleaning: vacuum, shampoo, wipe-down, and dressing." },
  { name: "Exterior Detail", description: "Hand wash, decontamination, wheel/tire care, and sealant." },
  { name: "Full Detail", description: "Complete interior + exterior detail package." },
  { name: "Maintenance Wash", description: "Recurring quick wash to keep your vehicle looking sharp." },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the auto detailing services offered by Daily Detailers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});

// Silence unused-import warning for z while keeping consistent tool file shape.
void z;
