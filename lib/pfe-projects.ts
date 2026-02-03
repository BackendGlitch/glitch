export interface PFEProject {
  id: string
  title: string
  description: string
  fullDescription: string
  skills: string[]
  stack: string[]
  difficulty: "High" | "Medium-High" | "Medium"
  color: "red" | "pink" | "cyan" | "yellow" | "green" | "purple"
  objectives: string[]
  deliverables: string[]
  timeline: string
  diagram?: {
    title: string
    description: string
    type: "architecture" | "flowchart" | "system"
    mermaid: string
  }
  context?: string
  educationalValue?: string[]
  orderLifecycle?: string[]
}

export const pfeProjects: PFEProject[] = [
  {
    id: "PFE001",
    title: "Design and Implementation of a Distributed 3D Printing Management Platform",
    description: "A centralized platform that manages distributed 3D printers through a client–server architecture, enabling users to submit printing requests and printer owners to monetize their equipment.",
    fullDescription: `With the increasing availability of affordable 3D printers, many individuals and small workshops own printing equipment that remains unused for long periods. At the same time, many users who need custom 3D-printed objects lack the technical knowledge, hardware, or time required to design, prepare, and print such objects.

This project is developed under **BackendGlitch** as a **Projet de Fin d'Études (PFE)** with the objective of designing and implementing a **centralized platform** that manages **distributed 3D printers** through a client–server architecture. The project focuses on backend systems, job scheduling, hardware communication, and real-time monitoring rather than commercial deployment.

The system is composed of four main parts:
1. **Customer Web Interface** - Allows users to submit 3D printing requests
2. **Central Backend Platform** - Manages orders, pricing, payment, and job scheduling
3. **Printer Owner Client Application** - Connects printers to the central platform
4. **Physical 3D Printers** - Execute the actual printing jobs

These components communicate securely to ensure automation, monitoring, and reliability.`,
    skills: [
      "Backend Development",
      "Distributed Systems",
      "Job Scheduling",
      "Hardware Communication",
      "Payment Gateway Integration",
      "Real-time Monitoring",
      "System Architecture"
    ],
    stack: [
      "Next.js",
      "Node.js / Express",
      "PostgreSQL",
      "Python / Rust",
      "REST API",
      "WebSocket",
      "Click Payment Gateway"
    ],
    difficulty: "High",
    color: "cyan",
    objectives: [
      "Design a web-based platform that allows users to submit 3D printing requests",
      "Automatically determine printer compatibility and filament type based on available printers",
      "Compute a dynamic price based on size, quantity, material, and machine time",
      "Integrate a Tunisian payment gateway (Click) for order validation",
      "Develop a local client application that connects printers to the central platform",
      "Enable real-time order monitoring from submission to completion",
      "Provide a scalable and modular architecture suitable for academic experimentation"
    ],
    deliverables: [
      "Functional web platform with user interface",
      "Central backend platform with job scheduling",
      "Printer owner client application",
      "Payment gateway integration (Click)",
      "Real-time monitoring system",
      "Comprehensive documentation",
      "System architecture diagrams"
    ],
    timeline: "3-4 months",
    context: `With the increasing availability of affordable 3D printers, many individuals and small workshops own printing equipment that remains unused for long periods. At the same time, many users who need custom 3D-printed objects lack the technical knowledge, hardware, or time required to design, prepare, and print such objects.

This project is developed under **BackendGlitch** as a **Projet de Fin d'Études (PFE)** with the objective of designing and implementing a **centralized platform** that manages **distributed 3D printers** through a client–server architecture.`,
    educationalValue: [
      "Distributed systems architecture",
      "Backend development and API design",
      "Job scheduling algorithms",
      "Hardware communication protocols",
      "Secure system design",
      "Real-time system monitoring",
      "Payment gateway integration",
      "Database design and optimization"
    ],
    orderLifecycle: [
      "DRAFT - Initial order creation",
      "PRICED - Price calculated and displayed",
      "PAYMENT_PENDING - Awaiting payment",
      "PAID - Payment confirmed",
      "QUEUED - Added to printer queue",
      "PRINTING - Currently being printed",
      "COMPLETED - Successfully finished",
      "FAILED / CANCELLED - Error or cancellation"
    ],
    diagram: {
      title: "High-Level System Architecture",
      description: "The system architecture showing the flow from user submission through the backend platform to the printer owner client and physical 3D printers.",
      type: "architecture",
      mermaid: `flowchart TB
    subgraph "User Layer"
        U[User Web Interface]
        U --> |Upload STL File| B
    end
    
    subgraph "BackendGlitch Platform"
        B[Backend API]
        B --> |Validate & Process| FS[(File Storage)]
        B --> |Calculate Price| P[Pricing Engine]
        B --> |Process Payment| PG[Payment Gateway<br/>Click]
        B --> |Schedule Job| Q[Job Queue]
        B --> |Monitor Status| M[Monitoring System]
    end
    
    subgraph "Printer Owner Layer"
        C[Printer Owner Client]
        C --> |Receive Job| Q
        C --> |Download File| FS
        C --> |Send Commands| P1[3D Printer 1]
        C --> |Send Commands| P2[3D Printer 2]
        C --> |Report Status| M
    end
    
    subgraph "Physical Layer"
        P1 --> |Status Updates| C
        P2 --> |Status Updates| C
    end
    
    PG --> |Payment Confirmation| B
    M --> |Real-time Updates| U
    
    style U fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style B fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style FS fill:#ffff00,stroke:#cccc00,stroke-width:3px,color:#000
    style P fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style PG fill:#ff0000,stroke:#cc0000,stroke-width:3px,color:#fff
    style Q fill:#ff00ff,stroke:#cc00cc,stroke-width:3px,color:#fff
    style M fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style C fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style P1 fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style P2 fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000`
    }
  }
]

export function getProjectById(id: string): PFEProject | undefined {
  return pfeProjects.find(project => project.id === id)
}
