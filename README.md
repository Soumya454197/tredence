# HR Workflow Designer

A visual workflow designer application for HR processes, built with React, TypeScript, and Vite. Create, visualize, and manage complex HR workflows with an intuitive node-based interface.

## Features

- **Visual Workflow Editor**: Drag-and-drop interface for creating HR workflows
- **Multiple Node Types**:
  - **Start Nodes**: Initiate workflows with metadata
  - **Task Nodes**: Assign tasks with descriptions, assignees, due dates, and custom fields
  - **Approval Nodes**: Add approval steps with role-based settings and auto-approval thresholds
  - **Automated Nodes**: Execute automated actions with configurable parameters
  - **End Nodes**: Complete workflows with customizable end messages
- **State Management**: Built-in undo/redo capabilities with Zustand
- **Responsive Design**: Tailwind CSS for modern, responsive UI
- **Type-Safe**: Full TypeScript support for robust development

## Prerequisites

- Node.js 16+ 
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tredence
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Build

Build for production:

```bash
npm run build
```

This command compiles TypeScript and creates an optimized production build.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
├── index.ts           # Type definitions for workflow nodes
├── index.css          # Global styles
├── workflow.ts        # Workflow logic and utilities
├── package.js         # Project metadata and dependencies
├── vite.ts            # Vite configuration
├── tailwind.jd        # Tailwind CSS configuration
├── tsconfi.js         # TypeScript configuration
└── nodeconfg.ts       # Node configuration
```

## Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **React Flow** - Visual node editor framework
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide React** - Icon library
- **UUID** - Unique identifier generation
- **ESLint** - Code quality tool

## Node Types

### Start Node
```typescript
{
  type: 'start'
  label: string
  metadata: KeyValue[]
}
```

### Task Node
```typescript
{
  type: 'task'
  label: string
  description: string
  assignee: string
  dueDate: string
  customFields: KeyValue[]
}
```

### Approval Node
```typescript
{
  type: 'approval'
  label: string
  approverRole: string
  autoApproveThreshold: number
}
```

### Automated Node
```typescript
{
  type: 'automated'
  label: string
  actionId: string
  actionParams: Record<string, string>
}
```

### End Node
```typescript
{
  type: 'end'
  label: string
  endMessage: string
  showSummary: boolean
}
```

## Getting Started

1. **Create a Workflow**: Start by adding a Start node to initiate your workflow
2. **Add Steps**: Use Task, Approval, or Automated nodes to define workflow steps
3. **Connect Nodes**: Draw connections between nodes to define the workflow logic
4. **Complete Workflow**: End with an End node to specify completion behavior

## Development Tips

- Use TypeScript's type system for type-safe workflow definitions
- Leverage Zustand for managing complex workflow state
- Customize node appearance using Tailwind CSS classes
- Utilize custom fields on Task nodes for flexible HR processes

## License

[Add your license information here]

## Support

For issues, questions, or contributions, please create an issue or submit a pull request.
