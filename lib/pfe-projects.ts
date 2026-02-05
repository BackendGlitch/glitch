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

The system is composed of five main parts:
1. **Mobile Application** - Native or cross-platform mobile app for iOS and Android allowing users to browse, submit, and track 3D printing requests on-the-go
2. **Customer Web Interface** - Web-based platform for users to submit 3D printing requests from desktop browsers
3. **Central Backend Platform** - Centralized server managing orders, pricing, payment processing, job scheduling, and real-time booking system
4. **Printer Owner Client Application** - Desktop application that connects printers to the central platform
5. **Physical 3D Printers** - Execute the actual printing jobs

The **central booking server** acts as the core of the system, handling all booking requests from both mobile and web interfaces, managing the queue of print jobs, coordinating between multiple printer owners, and providing real-time status updates to all connected clients.

These components communicate securely to ensure automation, monitoring, and reliability.`,
    skills: [
      "Backend Development",
      "Mobile App Development",
      "Distributed Systems",
      "Job Scheduling",
      "Hardware Communication",
      "Payment Gateway Integration",
      "Real-time Monitoring",
      "System Architecture",
      "API Design",
      "Database Design"
    ],
    stack: [
      "React Native / Flutter",
      "Next.js",
      "Node.js / Express",
      "PostgreSQL",
      "Python / Rust",
      "REST API",
      "WebSocket",
      "Click Payment Gateway",
      "Redis",
      "Docker"
    ],
    difficulty: "High",
    color: "cyan",
    objectives: [
      "Develop a mobile application (iOS and Android) for users to browse, submit, and track 3D printing requests",
      "Design and implement a central booking server that manages all print job requests and coordinates between multiple printer owners",
      "Create a web-based platform that allows users to submit 3D printing requests from desktop browsers",
      "Automatically determine printer compatibility and filament type based on available printers",
      "Compute a dynamic price based on size, quantity, material, and machine time",
      "Integrate a Tunisian payment gateway (Click) for order validation",
      "Develop a local client application that connects printers to the central platform",
      "Enable real-time order monitoring from submission to completion across all platforms (mobile, web, desktop)",
      "Implement a booking system that manages queue priorities and job distribution",
      "Provide a scalable and modular architecture suitable for academic experimentation"
    ],
    deliverables: [
      "Mobile application for iOS and Android with booking functionality",
      "Central booking server with REST API and WebSocket support",
      "Functional web platform with user interface",
      "Backend platform with job scheduling and queue management",
      "Printer owner client application",
      "Payment gateway integration (Click)",
      "Real-time monitoring system across all platforms",
      "Database schema and migration scripts",
      "API documentation for mobile and web clients",
      "Comprehensive documentation",
      "System architecture diagrams including mobile app integration"
    ],
    timeline: "3-4 months",
    context: `With the increasing availability of affordable 3D printers, many individuals and small workshops own printing equipment that remains unused for long periods. At the same time, many users who need custom 3D-printed objects lack the technical knowledge, hardware, or time required to design, prepare, and print such objects.

This project is developed under **BackendGlitch** as a **Projet de Fin d'Études (PFE)** with the objective of designing and implementing a **centralized platform** that manages **distributed 3D printers** through a client–server architecture.`,
    educationalValue: [
      "Mobile application development (iOS/Android)",
      "Cross-platform development frameworks",
      "Distributed systems architecture",
      "Backend development and API design",
      "Central server architecture and booking systems",
      "Job scheduling algorithms",
      "Hardware communication protocols",
      "Secure system design",
      "Real-time system monitoring",
      "Payment gateway integration",
      "Database design and optimization",
      "RESTful API and WebSocket implementation"
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
      title: "Complete System Architecture with Mobile App and Central Booking Server",
      description: "The complete system architecture showing mobile application, web interface, central booking server, printer clients, and physical 3D printers with real-time communication.",
      type: "architecture",
      mermaid: `flowchart TB
    subgraph "Client Layer"
        MA[Mobile App<br/>iOS/Android]
        WA[Web Interface]
        MA --> |REST API + WebSocket| BS
        WA --> |REST API + WebSocket| BS
    end
    
    subgraph "Central Booking Server"
        BS[Central Backend API<br/>Booking Server]
        BS --> |Validate & Process| FS[(File Storage)]
        BS --> |Calculate Price| PE[Pricing Engine]
        BS --> |Process Payment| PG[Payment Gateway<br/>Click]
        BS --> |Manage Queue| JQ[Job Queue<br/>Scheduler]
        BS --> |Real-time Updates| WS[WebSocket Hub]
        BS --> |Store Data| DB[(PostgreSQL)]
        BS --> |Cache| RD[(Redis)]
    end
    
    subgraph "Printer Owner Layer"
        PC1[Printer Client 1]
        PC2[Printer Client 2]
        PC3[Printer Client N]
        PC1 --> |Poll Jobs| JQ
        PC2 --> |Poll Jobs| JQ
        PC3 --> |Poll Jobs| JQ
        PC1 --> |Download File| FS
        PC2 --> |Download File| FS
        PC3 --> |Download File| FS
        PC1 --> |Status Updates| WS
        PC2 --> |Status Updates| WS
        PC3 --> |Status Updates| WS
    end
    
    subgraph "Physical Layer"
        P1[3D Printer 1]
        P2[3D Printer 2]
        PN[3D Printer N]
        P1 --> |Status| PC1
        P2 --> |Status| PC2
        PN --> |Status| PC3
    end
    
    PG --> |Payment Confirmation| BS
    WS --> |Real-time Updates| MA
    WS --> |Real-time Updates| WA
    JQ --> |Job Assignment| PC1
    JQ --> |Job Assignment| PC2
    JQ --> |Job Assignment| PC3
    
    style MA fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style WA fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style BS fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style FS fill:#ffff00,stroke:#cccc00,stroke-width:3px,color:#000
    style PE fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style PG fill:#ff0000,stroke:#cc0000,stroke-width:3px,color:#fff
    style JQ fill:#ff00ff,stroke:#cc00cc,stroke-width:3px,color:#fff
    style WS fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style DB fill:#ffff00,stroke:#cccc00,stroke-width:3px,color:#000
    style RD fill:#ff0000,stroke:#cc0000,stroke-width:3px,color:#fff
    style PC1 fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style PC2 fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style PC3 fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style P1 fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style P2 fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style PN fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000`
    }
  },
  {
    id: "PFE002",
    title: "Wasla Mobile Application and Central Booking Server",
    description: "Development of a mobile application for iOS and Android, along with a central booking server to enable customers to book transport tickets online 24/7, connecting multiple Louaj transport stations across Tunisia.",
    fullDescription: `Wasla Network is a comprehensive transport station management system for Louaj (Tunisian public transport). Currently, the system includes desktop applications for station personnel, but lacks a mobile solution for customers to book tickets remotely.

This project is developed under **BackendGlitch** as a **Projet de Fin d'Études (PFE)** with the objective of designing and implementing a **mobile application** and a **central booking server** that enables customers to reserve transport tickets online 24/7, connecting multiple Louaj stations across Tunisia in real-time.

The system is composed of three main parts:
1. **Mobile Application (iOS & Android)** - Native or cross-platform mobile app allowing customers to browse routes, check availability, book tickets, make payments, and receive digital tickets
2. **Central Booking Server** - Centralized server that coordinates bookings across all connected stations, manages real-time availability, processes payments, and synchronizes data between stations
3. **Integration with Existing Wasla Infrastructure** - Connect the new mobile and central server components with existing Wasla desktop applications and station backends

The **central booking server** acts as the coordination hub, managing bookings from mobile clients, synchronizing availability across all stations in real-time, processing payments, and ensuring seamless integration with existing station management systems.

This project extends the Wasla ecosystem by enabling customers to book tickets from anywhere, at any time, while maintaining real-time synchronization with physical stations.`,
    skills: [
      "Mobile App Development",
      "iOS Development",
      "Android Development",
      "Backend Development",
      "Real-time Systems",
      "Payment Gateway Integration",
      "API Design",
      "WebSocket Implementation",
      "Database Design",
      "System Integration"
    ],
    stack: [
      "React Native / Flutter",
      "Swift (iOS)",
      "Kotlin (Android)",
      "Go / Node.js",
      "PostgreSQL",
      "Redis",
      "WebSocket",
      "REST API",
      "Payment Gateway",
      "Docker"
    ],
    difficulty: "High",
    color: "green",
    objectives: [
      "Develop a mobile application for iOS and Android platforms for customer ticket booking",
      "Design and implement a central booking server that coordinates bookings across multiple transport stations",
      "Enable real-time availability checking and synchronization between stations",
      "Integrate secure payment processing for online ticket purchases",
      "Implement push notifications for booking confirmations and status updates",
      "Create digital ticket system with QR code generation for validation at stations",
      "Ensure seamless integration with existing Wasla desktop applications and station backends",
      "Implement real-time communication between mobile app, central server, and station systems",
      "Design scalable architecture to handle high concurrent booking requests",
      "Provide comprehensive booking history and ticket management for users"
    ],
    deliverables: [
      "Mobile application for iOS with full booking functionality",
      "Mobile application for Android with full booking functionality",
      "Central booking server with REST API and WebSocket support",
      "Real-time synchronization system between central server and station backends",
      "Payment gateway integration for secure online transactions",
      "Digital ticket system with QR code generation and validation",
      "Push notification system for booking updates",
      "User authentication and account management system",
      "Booking history and ticket management interface",
      "API documentation for mobile and backend integration",
      "Database schema and migration scripts",
      "Comprehensive documentation",
      "System architecture diagrams"
    ],
    timeline: "3-4 months",
    context: `Wasla Network is a comprehensive transport station management system for Louaj (Tunisian public transport). The system currently includes desktop applications for station personnel, AI-powered barrier control, self-service kiosks, and network connectivity between stations.

However, customers still need to visit physical stations or use the web interface to book tickets. This project aims to extend the Wasla ecosystem by developing a mobile application that allows customers to book tickets from anywhere, at any time, along with a central booking server that coordinates bookings across all connected stations in real-time.

This project is developed under **BackendGlitch** as a **Projet de Fin d'Études (PFE)** to provide a complete mobile booking solution integrated with the existing Wasla infrastructure.`,
    educationalValue: [
      "Mobile application development for iOS and Android",
      "Cross-platform development frameworks (React Native/Flutter)",
      "Central server architecture and distributed systems",
      "Real-time system design and WebSocket implementation",
      "Payment gateway integration and secure transaction processing",
      "API design and RESTful service development",
      "Database design for booking and reservation systems",
      "System integration with existing infrastructure",
      "Push notification implementation",
      "QR code generation and validation systems",
      "Scalable backend architecture",
      "User authentication and session management"
    ],
    orderLifecycle: [
      "BROWSE - User browses available routes and schedules",
      "SELECT - User selects departure station, destination, date, and number of seats",
      "CHECK_AVAILABILITY - System checks real-time availability across stations",
      "RESERVE - User creates booking reservation",
      "PAYMENT_PENDING - Booking created, awaiting payment",
      "PAYMENT_PROCESSING - Payment gateway processing transaction",
      "PAID - Payment confirmed, booking validated",
      "TICKET_GENERATED - Digital ticket with QR code generated",
      "CONFIRMED - Booking confirmed and synchronized with station",
      "ACTIVE - Ticket is valid for travel",
      "USED - Ticket has been used/validated at station",
      "EXPIRED / CANCELLED - Ticket expired or booking cancelled"
    ],
    diagram: {
      title: "Wasla Mobile App and Central Booking Server Architecture",
      description: "Complete system architecture showing mobile applications, central booking server, integration with existing Wasla station infrastructure, and real-time synchronization.",
      type: "architecture",
      mermaid: `flowchart TB
    subgraph "Mobile Client Layer"
        iOS[iOS Mobile App]
        AND[Android Mobile App]
        iOS --> |REST API + WebSocket| CBS
        AND --> |REST API + WebSocket| CBS
    end
    
    subgraph "Central Booking Server"
        CBS[Central Booking Server]
        CBS --> |Manage Bookings| BM[Booking Manager]
        CBS --> |Process Payments| PG[Payment Gateway]
        CBS --> |Real-time Sync| WS[WebSocket Hub]
        CBS --> |Store Data| DB[(PostgreSQL)]
        CBS --> |Cache| RD[(Redis)]
        CBS --> |Coordinate| SC[Station Coordinator]
    end
    
    subgraph "Existing Wasla Infrastructure"
        ST1[Station Backend 1<br/>Monastir]
        ST2[Station Backend 2<br/>Ksar Hellal]
        STN[Station Backend N]
        DESK1[Wasla Desktop App]
        DESK2[Management Desktop]
        AI[Wasla AI System]
        EX[Wasla Express]
    end
    
    subgraph "Communication Layer"
        API[REST API]
        WS2[WebSocket Server]
    end
    
    CBS --> |Real-time Updates| WS2
    WS2 --> |Sync Availability| ST1
    WS2 --> |Sync Availability| ST2
    WS2 --> |Sync Availability| STN
    SC --> |Coordinate Bookings| ST1
    SC --> |Coordinate Bookings| ST2
    SC --> |Coordinate Bookings| STN
    
    ST1 --> |Status Updates| WS2
    ST2 --> |Status Updates| WS2
    STN --> |Status Updates| WS2
    
    WS2 --> |Real-time Updates| iOS
    WS2 --> |Real-time Updates| AND
    
    PG --> |Payment Confirmation| CBS
    CBS --> |Generate Ticket| iOS
    CBS --> |Generate Ticket| AND
    
    DESK1 --> |Local Operations| ST1
    DESK2 --> |Management| ST1
    AI --> |Barrier Control| ST1
    EX --> |Self-Service| ST1
    
    style iOS fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style AND fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style CBS fill:#00ff00,stroke:#00cc00,stroke-width:3px,color:#000
    style BM fill:#ffff00,stroke:#cccc00,stroke-width:3px,color:#000
    style PG fill:#ff0000,stroke:#cc0000,stroke-width:3px,color:#fff
    style WS fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000
    style DB fill:#ffff00,stroke:#cccc00,stroke-width:3px,color:#000
    style RD fill:#ff0000,stroke:#cc0000,stroke-width:3px,color:#fff
    style SC fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style ST1 fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style ST2 fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style STN fill:#aa00ff,stroke:#8800cc,stroke-width:3px,color:#fff
    style DESK1 fill:#ff00ff,stroke:#cc00cc,stroke-width:3px,color:#fff
    style DESK2 fill:#ff00ff,stroke:#cc00cc,stroke-width:3px,color:#fff
    style AI fill:#ff8800,stroke:#cc6600,stroke-width:3px,color:#fff
    style EX fill:#00ffff,stroke:#00cccc,stroke-width:3px,color:#000
    style WS2 fill:#00d9ff,stroke:#00aacc,stroke-width:3px,color:#000`
    }
  }
]

export function getProjectById(id: string): PFEProject | undefined {
  return pfeProjects.find(project => project.id === id)
}
