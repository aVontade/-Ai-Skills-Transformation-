# AI Transformation Command Center

An interactive, AI-powered dashboard designed for CEOs and Transformation Leads to navigate their company's transition into the AI economy. This command center provides a holistic view of the transformation journey, focusing on key pillars like strategic vision, culture, communication, and ethical governance.

![AI Transformation Dashboard Screenshot](https://storage.googleapis.com/aistudio-o-demos-public/ai_transformation_dashboard_screenshot.png)

## ✨ Core Features

*   **Holistic Dashboard View:** At-a-glance visualization of critical metrics across various domains of AI transformation, from `Vision Alignment` to `AI Model Performance`.
*   **Scenario Simulator:** An interactive control panel that allows leaders to adjust KPIs (e.g., psychological safety, budget allocation) to simulate different scenarios and understand potential outcomes.
*   **AI-Powered Strategic Recommendations:** Utilizes the Google Gemini API to analyze the current dashboard state and generate concise, actionable strategic advice for leadership.
*   **External Analysis Tool:** Leverages Gemini with Google Search grounding to analyze a company's public website and suggest potential AI integration opportunities, providing an external-in perspective.
*   **Data Drill-Down:** Clickable modules for `Surveys`, `Feedback`, and `Reports` that open modals to display raw, detailed data, offering deeper insights.
*   **Customizable Themes:** Includes Dark, Light, and High-Contrast modes to ensure accessibility and user comfort.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript
*   **AI:** Google Gemini API (`@google/genai`) for generative AI features.
*   **Styling:** Tailwind CSS for a utility-first design system.
*   **Data Visualization:** Recharts for creating interactive and responsive charts.
*   **Module System:** ES Modules with an `importmap` in `index.html` for dependency management.

## 🤖 How the AI Works

The dashboard integrates the Gemini API in two key ways:

1.  **Strategic Recommendations:**
    *   The current state of all dashboard metrics (vision alignment, goal progress, etc.) is compiled into a detailed prompt.
    *   This prompt is sent to the `gemini-2.5-flash` model with a specific `responseSchema` requesting a JSON array of recommendations.
    *   The model analyzes the data and returns structured JSON containing three actionable recommendations, which are then displayed in the UI.

2.  **External Website Analysis:**
    *   A user enters a company's URL into the input field in the "Scenario Simulator" section.
    *   A prompt is constructed, instructing the model to act as a consultant, analyze the company via the provided URL, and suggest AI integration strategies.
    *   The request is sent to the `gemini-2.5-flash` model with the `googleSearch` tool enabled.
    *   Gemini uses its search capabilities to gather public information about the company and generates a markdown-formatted report with an overview and actionable opportunities.

## 🚀 Getting Started

This project is a static web application that can be run in any modern browser.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   A Google Gemini API key.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-transformation-dashboard.git
    cd ai-transformation-dashboard
    ```
2.  **Set up your API Key:**
    The application loads the Gemini API key from `process.env.API_KEY`. To provide this, you will need to serve the application from a local development server that supports environment variables or replace `process.env.API_KEY` directly in the code (not recommended for production).

    For local development, you can create a `.env` file in the root of the project:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    And use a bundler like Vite or Create React App that supports loading `.env` files.

3.  **Serve the application:**
    Since this is a static project, you can serve the `index.html` file using any simple local web server.
    *   **Using Python:**
        ```bash
        python -m http.server
        ```
    *   **Using Node.js (`serve` package):**
        ```bash
        npx serve .
        ```
    *   **Using a VS Code Extension:** Extensions like "Live Server" can serve the project with a single click.

    Once the server is running, open your browser and navigate to the provided local URL (e.g., `http://localhost:8000`).

## 📂 Project Structure

```
.
├── components/          # Reusable React components
│   ├── charts/          # Recharts wrapper components
│   ├── AboutUsSection.tsx
│   ├── CultureSection.tsx
│   ├── DashboardCard.tsx  # Base card component
│   ├── DashboardControls.tsx # Scenario simulator
│   └── ...
├── constants.tsx        # Mock data, icons, and constants
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.html           # Entry point, includes importmap
├── index.tsx            # React root renderer
├── metadata.json        # Project metadata
└── README.md            # You are here!
```