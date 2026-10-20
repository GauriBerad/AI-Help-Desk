🤖 AI-Help-Desk: Rule-Based Expert System
An interactive, explainable AI expert system built with React, Vite, and JavaScript for an AI Fundamentals mini-project. This application simulates a technical support help desk using forward-chaining inference to diagnose computer problems, infer root causes, and recommend troubleshooting steps based on a predefined knowledge base of IF-THEN rules.

✨ Features
Rule-Based Inference Engine: Implements a data-driven forward-chaining algorithm (expertSystem.js) that evaluates conditions and cycles through facts until no new inferences can be made.

Interactive Incident Selector: Test various simulated hardware and software problems (e.g., slow performance, Wi-Fi failure, overheating, printer errors).

Real-Time Fact State Machine: Visually traces initial facts and newly inferred conclusions dynamically.

Explainable AI (XAI) Dashboard: Transparently lists all activated rules, causes, and action plans so users can see why a conclusion was reached instead of relying on a black-box model.

🛠️ Tech Stack
Frontend: React, Vite, JavaScript (JSX)

Styling: Custom CSS (styles.css) with a modern dashboard layout

Deployment Ready: Configured for seamless hosting on platforms like Vercel

📂 Project Structure
Plaintext
AI-Help-Desk/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── App.jsx            # Main user interface & state management
│   ├── expertSystem.js    # Knowledge base (problems, rules) & forward-chaining engine
│   ├── App.css            # Component-specific styles (if used)
│   ├── index.css          # Global styles
│   ├── styles.css         # Dashboard and layout styles
│   └── main.jsx           # React entry point
├── .gitignore
├── package.json
└── vercel.json            # Vercel SPA routing configuration
🚀 Getting Started Locally
Follow these steps to run the project on your local machine:

Clone the repository:

Bash
git clone https://github.com/GauriBerad/AI-Help-Desk.git
cd AI-Help-Desk
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open in browser:
Click the local development URL provided in your terminal (usually http://localhost:5173).

🧠 How the Inference Engine Works
Problem Selection: The user selects a specific IT incident category from the UI.

Fact Initialization: The system loads the initial set of facts associated with that problem (e.g., ["computer_slow"]).

Forward Chaining Loop: The diagnose function iterates through the rule base (rules). If a rule's conditions match the current fact set, the rule fires, adding new inferred conclusions to the state machine until saturation is reached.

Report Generation: The UI aggregates the fired rules, inferred causes, and unique troubleshooting actions into a clean, tabbed report.