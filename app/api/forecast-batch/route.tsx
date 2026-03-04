import { type NextRequest, NextResponse } from "next/server"

const EXTERNAL_API = "https://unfortuitous-reclivate-kalel.ngrok-free.dev"

export async function GET() {
  try {
    const response = await fetch(`${EXTERNAL_API}/ping`)
    return NextResponse.json({ ok: response.ok }, { status: response.status })
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 503 })
  }
}
// </CHANGE>

export async function POST(request: NextRequest) {
  try {
    // Get the file from the request
    const formData = await request.formData()

    // Forward the request to the external API
    const response = await fetch(`${EXTERNAL_API}/forecast-batch?add_env=true`, {
      method: "POST",
      body: formData,
    })

    // Get the response data
    const data = await response.json().catch(() => null)

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API Proxy Error:", error)
    return NextResponse.json({ detail: "Failed to connect to forecast service" }, { status: 500 })
  }
}
