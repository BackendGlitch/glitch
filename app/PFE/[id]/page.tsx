"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Target, CheckCircle2, Calendar, Code, BookOpen, Workflow, Smartphone, Server } from "lucide-react"
import { getProjectById, type PFEProject } from "@/lib/pfe-projects"
import Navbar from "@/components/sections/Navbar"
import Footer from "@/components/sections/Footer"
import MermaidDiagram from "@/components/MermaidDiagram"

export default function PFEProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<PFEProject | null>(null)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = getProjectById(projectId)
    if (!foundProject) {
      router.push("/")
      return
    }
    setProject(foundProject)
  }, [params.id, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white font-pixel">Loading...</div>
      </div>
    )
  }

  const colorClasses = {
    red: { border: "border-red-400", bg: "bg-red-400/10", text: "text-red-400" },
    pink: { border: "border-pink-400", bg: "bg-pink-400/10", text: "text-pink-400" },
    cyan: { border: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-400" },
    yellow: { border: "border-yellow-400", bg: "bg-yellow-400/10", text: "text-yellow-400" },
    green: { border: "border-green-400", bg: "bg-green-400/10", text: "text-green-400" },
    purple: { border: "border-purple-400", bg: "bg-purple-400/10", text: "text-purple-400" },
  }

  const colors = colorClasses[project.color]
  const difficultyColors = {
    High: "text-red-400 border-red-400 bg-red-400/10",
    "Medium-High": "text-yellow-400 border-yellow-400 bg-yellow-400/10",
    Medium: "text-green-400 border-green-400 bg-green-400/10",
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border-2 border-zinc-700 bg-zinc-900/50 hover:border-cyan-400 hover:bg-cyan-400/10 text-zinc-300 hover:text-cyan-400 transition-all font-pixel text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              [ BACK ]
            </button>
            
            <div className="mb-8">
              <div className={`inline-block mb-4 px-4 py-2 border-2 ${colors.border} ${colors.bg} pixel-text text-xs ${colors.text}`}>
                [{project.id}]
              </div>
              <h1 className={`text-4xl md:text-6xl font-pixel ${colors.text} mb-4 leading-tight`}>
                {project.title}
              </h1>
              <div className={`inline-block px-3 py-1 border-2 ${difficultyColors[project.difficulty]} pixel-text text-xs mb-6`}>
                {project.difficulty}
              </div>
              <p className="text-xl font-latex leading-relaxed max-w-3xl text-zinc-300">
                {project.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10 font-latex text-zinc-200">
            {/* Project Context */}
            {project.context && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <FileText className="h-7 w-7" />
                  PROJECT CONTEXT
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="text-lg md:text-xl leading-relaxed space-y-4 prose-invert">
                    {project.context.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Description */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <FileText className="h-7 w-7" />
                PROJECT DESCRIPTION
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="text-lg md:text-xl leading-relaxed space-y-4 prose-invert">
                  {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Mobile Application & Central Booking Server Section - For PFE001 and PFE002 */}
            {(project.id === "PFE001" || project.id === "PFE002") && (
              <>
                <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                  <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                    <Smartphone className="h-7 w-7" />
                    MOBILE APPLICATION
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Overview</h3>
                      {project.id === "PFE001" ? (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The mobile application is a native or cross-platform mobile app developed for both iOS and Android platforms. 
                          It provides users with a convenient way to browse available 3D printers, submit printing requests, track job progress, 
                          and manage their orders directly from their smartphones.
                        </p>
                      ) : (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The mobile application is a native or cross-platform mobile app developed for both iOS and Android platforms. 
                          It enables customers to browse transport routes, check real-time seat availability across all Louaj stations, 
                          book tickets, make secure payments, and receive digital tickets with QR codes directly on their smartphones.
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Key Features</h3>
                      {project.id === "PFE001" ? (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Browse Printers:</strong> View available 3D printers with their specifications, capabilities, and current availability</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Submit Requests:</strong> Upload STL files, configure print parameters (quantity, scale, material), and submit printing requests</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Real-time Tracking:</strong> Monitor job status, progress percentage, and receive push notifications for status updates</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Payment Integration:</strong> Secure in-app payment processing using the Click payment gateway</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Order History:</strong> Access complete history of past orders, receipts, and download completed print files</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Offline Support:</strong> Queue requests when offline and sync when connection is restored</span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Route Browsing:</strong> Browse available transport routes between Louaj stations, view schedules, and check real-time seat availability</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Ticket Booking:</strong> Select departure and destination stations, choose date and time, select number of seats, and book tickets instantly</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Real-time Availability:</strong> View live seat availability across all stations, with instant updates when seats are booked or released</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Secure Payment:</strong> Process payments securely through integrated payment gateway, with support for multiple payment methods</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Digital Tickets:</strong> Receive digital tickets with QR codes immediately after booking, stored in the app for easy access</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Booking History:</strong> Access complete history of past bookings, view ticket details, and manage upcoming trips</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Push Notifications:</strong> Receive real-time notifications for booking confirmations, schedule changes, and trip reminders</span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Technical Implementation</h3>
                      {project.id === "PFE001" ? (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The mobile app communicates with the central booking server via REST API for standard operations and WebSocket 
                          for real-time updates. It uses secure authentication, local caching for offline support, and implements push 
                          notifications for job status changes.
                        </p>
                      ) : (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The mobile app communicates with the central booking server via REST API for booking operations and WebSocket 
                          for real-time availability updates. It uses secure authentication, QR code generation for digital tickets, 
                          push notifications for booking confirmations, and integrates seamlessly with existing Wasla station infrastructure 
                          for ticket validation at physical stations.
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                  <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                    <Server className="h-7 w-7" />
                    CENTRAL BOOKING SERVER
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Overview</h3>
                      {project.id === "PFE001" ? (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The central booking server is the core component of the system, acting as the single source of truth for all 
                          booking requests, job scheduling, and coordination between multiple printer owners. It handles requests from 
                          both mobile and web clients, manages the queue of print jobs, and ensures fair distribution of work across 
                          available printers.
                        </p>
                      ) : (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The central booking server is the core component of the Wasla network, acting as the coordination hub for all 
                          ticket bookings across multiple Louaj transport stations. It handles booking requests from mobile and web clients, 
                          manages real-time seat availability synchronization between all stations, processes payments, generates digital tickets, 
                          and ensures seamless integration with existing Wasla desktop applications and station backends.
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Core Responsibilities</h3>
                      {project.id === "PFE001" ? (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Request Management:</strong> Receive and validate booking requests from mobile and web clients</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Job Queue Management:</strong> Maintain a prioritized queue of print jobs and assign them to available printers based on compatibility, workload, and priority</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Printer Coordination:</strong> Coordinate between multiple printer owners, ensuring optimal job distribution and load balancing</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Real-time Synchronization:</strong> Broadcast status updates to all connected clients via WebSocket connections</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Payment Processing:</strong> Integrate with payment gateway, validate transactions, and update order status accordingly</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Data Persistence:</strong> Store all booking data, job history, and system state in PostgreSQL database with Redis caching for performance</span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Booking Management:</strong> Receive and validate ticket booking requests from mobile and web clients across all stations</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Real-time Availability Sync:</strong> Maintain real-time seat availability synchronization across all connected Louaj stations, ensuring accurate booking information</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Station Coordination:</strong> Coordinate bookings between multiple stations, handle inter-station transfers, and manage vehicle tracking</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Real-time Communication:</strong> Broadcast availability updates, booking confirmations, and schedule changes to all connected clients via WebSocket</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Payment Processing:</strong> Integrate with payment gateway, process secure transactions, and generate digital tickets upon successful payment</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Integration with Wasla Infrastructure:</strong> Seamlessly integrate with existing Wasla desktop applications, station backends, and AI systems for unified operations</span>
                          </li>
                          <li className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                            <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                            <span className="flex-1"><strong>Data Persistence:</strong> Store all booking data, ticket information, and station state in PostgreSQL database with Redis caching for high-performance real-time operations</span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Architecture Components</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-lg font-pixel ${colors.text} mb-2`}>REST API</h4>
                          <p className="text-lg leading-relaxed text-zinc-200">
                            Provides standard HTTP endpoints for mobile and web clients to submit requests, query status, and manage orders. 
                            Includes authentication, rate limiting, and request validation.
                          </p>
                        </div>
                        <div>
                          <h4 className={`text-lg font-pixel ${colors.text} mb-2`}>WebSocket Hub</h4>
                          <p className="text-lg leading-relaxed text-zinc-200">
                            Maintains persistent connections with all clients (mobile, web, printer clients) for real-time bidirectional 
                            communication. Broadcasts job status updates, queue changes, and system notifications.
                          </p>
                        </div>
                        <div>
                          <h4 className={`text-lg font-pixel ${colors.text} mb-2`}>Job Scheduler</h4>
                          <p className="text-lg leading-relaxed text-zinc-200">
                            Intelligent scheduling algorithm that assigns jobs to printers based on printer capabilities, current workload, 
                            job priority, and estimated completion time. Implements fair queuing and load balancing.
                          </p>
                        </div>
                        <div>
                          <h4 className={`text-lg font-pixel ${colors.text} mb-2`}>Pricing Engine</h4>
                          <p className="text-lg leading-relaxed text-zinc-200">
                            Calculates dynamic pricing based on file size, material consumption, print time, quantity, and printer 
                            specifications. Provides price estimates before booking confirmation.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-pixel ${colors.text} mb-4`}>Scalability & Performance</h3>
                      {project.id === "PFE001" ? (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The central booking server is designed to handle high concurrent loads with horizontal scaling capabilities. 
                          It uses Redis for caching frequently accessed data, implements connection pooling for database operations, 
                          and supports multiple instances behind a load balancer for high availability.
                        </p>
                      ) : (
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 mb-4">
                          The central booking server is designed to handle high concurrent booking loads from thousands of mobile users 
                          across multiple stations simultaneously. It uses Redis for real-time availability caching, implements connection 
                          pooling for database operations, supports horizontal scaling with multiple instances behind a load balancer, 
                          and ensures 24/7 availability for critical transport operations. The system is optimized for low-latency 
                          real-time synchronization to provide instant booking confirmations and availability updates.
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Objectives */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <Target className="h-7 w-7" />
                OBJECTIVES
              </h2>
              <ul className="space-y-4">
                {project.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                    <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                    <span className="flex-1">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Deliverables */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <FileText className="h-7 w-7" />
                DELIVERABLES
              </h2>
              <ul className="space-y-4">
                {project.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                    <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                    <span className="flex-1">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills & Stack */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-2xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Code className="h-6 w-6" />
                  REQUIRED SKILLS
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 text-base font-pixel border-2 ${colors.border} ${colors.bg} ${colors.text}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-2xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Code className="h-6 w-6" />
                  TECH STACK
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-base font-pixel border-2 border-zinc-700 bg-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Order Lifecycle */}
            {project.orderLifecycle && project.orderLifecycle.length > 0 && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Workflow className="h-7 w-7" />
                  ORDER STATE LIFECYCLE
                </h2>
                <div className="space-y-3">
                  {project.orderLifecycle.map((state, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-lg md:text-xl">
                      <div className={`w-8 h-8 flex items-center justify-center border-2 ${colors.border} ${colors.bg} ${colors.text} font-pixel text-sm flex-shrink-0`}>
                        {idx + 1}
                      </div>
                      <span className="font-latex">{state}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Educational Value */}
            {project.educationalValue && project.educationalValue.length > 0 && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <BookOpen className="h-7 w-7" />
                  EDUCATIONAL VALUE
                </h2>
                <p className="text-lg md:text-xl mb-6 leading-relaxed text-zinc-300">
                  This project allows interns to work on the following areas:
                </p>
                <ul className="space-y-4">
                  {project.educationalValue.map((value, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                      <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                      <span className="flex-1">{value}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Timeline */}
            <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-2xl font-pixel ${colors.text} mb-4 flex items-center gap-3`}>
                <Calendar className="h-6 w-6" />
                TIMELINE
              </h2>
              <p className="text-2xl font-latex">{project.timeline}</p>
            </section>

            {/* Diagram Section */}
            {project.diagram && project.diagram.mermaid && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-4`}>
                  {project.diagram.title}
                </h2>
                <p className="mb-8 text-lg md:text-xl leading-relaxed text-zinc-200">
                  {project.diagram.description}
                </p>
                <div className={`p-6 border-2 ${colors.border} bg-zinc-950 rounded-sm overflow-auto`}>
                  <MermaidDiagram chart={project.diagram.mermaid} />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
