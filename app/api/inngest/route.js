import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { checkBudgetAlerts } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkBudgetAlerts],
});
