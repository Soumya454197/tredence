import type { NodeType } from '@/types'

export const NODE_CONFIG: Record<
  NodeType,
  { label: string; color: string; borderColor: string; icon: string; description: string }
> = {
  start: {
    label: 'Start',
    color: 'rgba(16,185,129,0.12)',
    borderColor: '#10b981',
    icon: '▶',
    description: 'Workflow entry point',
  },
  task: {
    label: 'Task',
    color: 'rgba(59,130,246,0.12)',
    borderColor: '#3b82f6',
    icon: '☑',
    description: 'Human task assignment',
  },
  approval: {
    label: 'Approval',
    color: 'rgba(245,158,11,0.12)',
    borderColor: '#f59e0b',
    icon: '✓',
    description: 'Requires approval',
  },
  automated: {
    label: 'Automated',
    color: 'rgba(139,92,246,0.12)',
    borderColor: '#8b5cf6',
    icon: '⚡',
    description: 'System triggered action',
  },
  end: {
    label: 'End',
    color: 'rgba(239,68,68,0.12)',
    borderColor: '#ef4444',
    icon: '■',
    description: 'Workflow completion',
  },
}