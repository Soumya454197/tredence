import type { AutomationAction, SimulationResult, SimulationStep } from '@/types'
import type { Node, Edge } from 'reactflow'
import type { WorkflowNodeData } from '@/types'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'create_ticket', label: 'Create JIRA Ticket', params: ['project', 'summary', 'assignee'] },
  { id: 'send_slack', label: 'Send Slack Message', params: ['channel', 'message'] },
  { id: 'update_hris', label: 'Update HRIS Record', params: ['employeeId', 'field', 'value'] },
  { id: 'schedule_meet', label: 'Schedule Meeting', params: ['attendees', 'title', 'duration'] },
]

// ─── Simulate async delay ─────────────────────────────────────────────────────

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getAutomations(): Promise<AutomationAction[]> {
  await delay(300)
  return MOCK_AUTOMATIONS
}

export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> {
  await delay(800)

  const errors: string[] = []
  const steps: SimulationStep[] = []

  // ── Validation ──────────────────────────────────────────────────────────────
  const startNodes = nodes.filter(n => n.data.type === 'start')
  const endNodes = nodes.filter(n => n.data.type === 'end')

  if (startNodes.length === 0) {
    errors.push('Workflow must have a Start node.')
  }
  if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start node.')
  }
  if (endNodes.length === 0) {
    errors.push('Workflow must have an End node.')
  }

  // Detect cycles via DFS
  const hasCycle = detectCycle(nodes, edges)
  if (hasCycle) {
    errors.push('Workflow contains a cycle. Cycles are not allowed.')
  }

  // Check all non-end nodes have at least one outgoing edge
  nodes.forEach(node => {
    if (node.data.type === 'end') return
    const outgoing = edges.filter(e => e.source === node.id)
    if (outgoing.length === 0) {
      errors.push(`Node "${node.data.label}" has no outgoing connection.`)
    }
  })

  if (errors.length > 0) {
    return { success: false, steps: [], errors }
  }

  // ── Topological execution ────────────────────────────────────────────────────
  const ordered = topologicalSort(nodes, edges)
  const now = new Date()

  for (let i = 0; i < ordered.length; i++) {
    const node = ordered[i]
    await delay(100) // simulate async step

    const timestamp = new Date(now.getTime() + i * 1200).toISOString()
    const step = buildStep(node, timestamp)
    steps.push(step)
  }

  return { success: true, steps, errors: [] }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildStep(
  node: Node<WorkflowNodeData>,
  timestamp: string
): SimulationStep {
  const data = node.data

  const messages: Record<string, string> = {
    start: `Workflow initiated: "${data.label}"`,
    task: `Task assigned to ${(data as any).assignee || 'unassigned'}: "${data.label}"`,
    approval: `Awaiting approval from ${(data as any).approverRole || 'approver'}: "${data.label}"`,
    automated: `Executing automation "${data.label}" — action: ${(data as any).actionId || 'none'}`,
    end: `Workflow complete: ${(data as any).endMessage || 'Done'}`,
  }

  const statuses: Record<string, 'success' | 'info' | 'warning'> = {
    start: 'info',
    task: 'warning',
    approval: 'warning',
    automated: 'success',
    end: 'success',
  }

  return {
    nodeId: node.id,
    nodeLabel: data.label,
    nodeType: data.type,
    status: statuses[data.type] ?? 'info',
    message: messages[data.type] ?? `Processed node: ${data.label}`,
    timestamp,
  }
}

function detectCycle(nodes: Node[], edges: Edge[]): boolean {
  const adjacency = new Map<string, string[]>()
  nodes.forEach(n => adjacency.set(n.id, []))
  edges.forEach(e => {
    adjacency.get(e.source)?.push(e.target)
  })

  const visited = new Set<string>()
  const stack = new Set<string>()

  function dfs(id: string): boolean {
    visited.add(id)
    stack.add(id)
    for (const neighbor of adjacency.get(id) ?? []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true
      if (stack.has(neighbor)) return true
    }
    stack.delete(id)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && dfs(node.id)) return true
  }
  return false
}

function topologicalSort(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Node<WorkflowNodeData>[] {
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  nodes.forEach(n => {
    inDegree.set(n.id, 0)
    adjacency.set(n.id, [])
  })

  edges.forEach(e => {
    adjacency.get(e.source)?.push(e.target)
    inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1)
  })

  const queue = nodes.filter(n => (inDegree.get(n.id) ?? 0) === 0)
  const result: Node<WorkflowNodeData>[] = []

  while (queue.length > 0) {
    const node = queue.shift()!
    result.push(node)
    for (const neighbor of adjacency.get(node.id) ?? []) {
      const deg = (inDegree.get(neighbor) ?? 1) - 1
      inDegree.set(neighbor, deg)
      if (deg === 0) {
        const neighborNode = nodes.find(n => n.id === neighbor)
        if (neighborNode) queue.push(neighborNode)
      }
    }
  }

  return result
}