import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import createBookingTool from "./tools/create-booking";

export default defineMcp({
  name: "daily-detailers-mcp",
  title: "Daily Detailers MCP",
  version: "0.1.0",
  instructions:
    "Tools for Daily Detailers, a Grand Rapids auto detailing business. Use `list_services` to see offered services and `create_booking` to submit a quote request on a customer's behalf.",
  tools: [listServicesTool, createBookingTool],
});
