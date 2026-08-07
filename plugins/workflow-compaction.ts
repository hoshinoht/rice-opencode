import type { Plugin } from "@opencode-ai/plugin";

export const WORKFLOW_COMPACTION_CONTEXT = `Append this section only if an active workplan is currently being planned or executed. Otherwise, omit it entirely.

### Workflow Status
- Mode: workflow-plan | workflow-execute
- Workplan path: [exact path]
- Current step: [exact current step and status]
- Plan-checker ran: yes | no
- Continuation requirement: [workflow-plan: "Load the workflow-plan skill before continuing." | workflow-execute: "Load the workflow-execute skill before continuing."]

Preserve exact values. Do not infer an active workflow from an old, completed, cancelled, proposed, or merely discussed workplan.`;

export const WorkflowCompactionPlugin: Plugin = async () => ({
  "experimental.session.compacting": async (_input, output) => {
    output.context.push(WORKFLOW_COMPACTION_CONTEXT);
  },
});
