// ─── Node Types ──────────────────────────────────────────────────────────────

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end'

export interface KeyValue {
  key: string
  value: string
}

export interface StartNodeData {
  type: 'start'
  label: string
  metadata: KeyValue[]
}

export interface TaskNodeData {
  type: 'task'
  label: string
  description: string
  assignee: string
  dueDate: string
  customFields: KeyValue[]
}

export interface ApprovalNodeData {
  type: 'approval'
  label: string
  approverRole: string
  autoApproveThreshold: number
}

export interface AutomatedNodeData {
  type: 'automated'
  label: string
  actionId: string
  actionParams: Record<string, string>
}

export interface EndNodeData {
  type: 'end'
  label: string
  endMessage: string
  showSummary: boolean
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData

// ─── Mock API Types ───────────────────────────────────────────────────────────

export interface AutomationAction {
  id: string
  label: string
  params: string[]
}

// ─── Simulation Types ─────────────────────────────────────────────────────────

export type SimulationStepStatus = 'success' | 'warning' | 'error' | 'info'

export interface SimulationStep {
  nodeId: string
  nodeLabel: string
  nodeType: NodeType
  status: SimulationStepStatus
  message: string
  timestamp: string
}

export interface SimulationResult {
  success: boolean
  steps: SimulationStep[]
  errors: string[]
}

// ─── Validation ───────────────────────────────────────────────────────────────

export interface ValidationError {
  nodeId?: string
  message: string
}