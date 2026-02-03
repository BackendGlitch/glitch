import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend only when the route is called
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send email to both recipients
    const emailContent = `
New Contact Form Submission from Glitch Website

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from the Glitch website contact form.
    `.trim()

    // Use Resend's test email for development, or your verified domain for production
    // IMPORTANT: For production, you need to verify your domain in Resend dashboard
    // For testing, Resend allows using "onboarding@resend.dev" without verification
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    
    // Send to both email addresses
    const recipients = [
      "contact@backendglitch.com",
      "samer.samm12@gmail.com"
    ]
    
    console.log("Sending email from:", fromEmail)
    console.log("Recipients:", recipients)

    const emailResults = []
    
    // Send emails one by one to better handle errors
    for (const to of recipients) {
      try {
        const result = await resend.emails.send({
          from: `Glitch Website <${fromEmail}>`,
          to: [to],
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          text: emailContent,
          html: `
            <div style="font-family: monospace; background-color: #09090b; color: #fafafa; padding: 20px; border: 2px solid #ff00ff;">
              <h2 style="color: #ff00ff; border-bottom: 2px solid #ff00ff; padding-bottom: 10px; margin-bottom: 20px;">
                New Contact Form Submission from Glitch Website
              </h2>
              <div style="margin-bottom: 20px;">
                <p><strong style="color: #00ffff;">Name:</strong> ${name}</p>
                <p><strong style="color: #00ffff;">Email:</strong> <a href="mailto:${email}" style="color: #00ffff;">${email}</a></p>
              </div>
              <div style="border-top: 1px solid #27272a; padding-top: 20px; margin-top: 20px;">
                <p><strong style="color: #00ffff;">Message:</strong></p>
                <p style="white-space: pre-wrap; background-color: #18181b; padding: 15px; border-left: 3px solid #ff00ff; margin-top: 10px;">
                  ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </p>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a;">
                This email was sent from the Glitch website contact form.
              </div>
            </div>
          `,
        })
        
        emailResults.push({ to, success: true, id: result.data?.id })
        console.log(`Email sent successfully to ${to}:`, result.data?.id)
      } catch (emailError: any) {
        emailResults.push({ to, success: false, error: emailError.message })
        console.error(`Failed to send email to ${to}:`, emailError)
        // Continue sending to other recipients even if one fails
      }
    }

    // Check if at least one email was sent successfully
    const successCount = emailResults.filter(r => r.success).length
    
    if (successCount === 0) {
      return NextResponse.json(
        { 
          error: "Failed to send email. Please check your Resend configuration.",
          details: emailResults
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: `Email sent successfully to ${successCount} recipient(s)`,
        results: emailResults
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      { 
        error: "Failed to send email. Please try again later.",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    )
  }
}

