---
title: Standalone Html Apps
description: Part of 02-building-web-apps in the PortLev Learn Claude Code curriculum.
---

# Standalone HTML Apps

A standalone HTML app is a single `.html` file that contains everything: HTML structure, CSS styles, JavaScript logic and React components — all in one file, with React loaded from a CDN.

Open the file in a browser. That's it. No install, no build step, no server.

---

## The CDN Setup

Every standalone app starts with this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <!-- React and ReactDOM from CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Babel to compile JSX in the browser -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    /* CSS here */
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // React components and app logic here
    
    function App() {
      return <div>Hello, World!</div>;
    }
    
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

The `type="text/babel"` attribute tells Babel to compile your JSX. React and ReactDOM are available as global variables from the CDN scripts.

---

## Prompting for Standalone Apps

Always tell Claude Code the app is a standalone HTML file with React via CDN. Otherwise it may try to scaffold a full project.

**The prompt pattern:**
```
> Create a single HTML file called [filename].html that [describe the app].
> Use React via CDN (unpkg). No build tools, no npm, no external CSS libraries.
> Include all CSS inline in a <style> tag.
> [Describe specific features, interactions and design requirements]
```

---

## Key Pattern: localStorage Persistence

For standalone apps, localStorage is your database. Tell Claude Code to use it:

```
> Persist all data in localStorage under the key '[app-name]-data' so it 
  survives page refreshes. Load from localStorage on mount, save on every change.
```

The implementation looks like this:

```javascript
const [items, setItems] = React.useState(() => {
  const saved = localStorage.getItem('myapp-items');
  return saved ? JSON.parse(saved) : [];
});

// Save whenever items change
React.useEffect(() => {
  localStorage.setItem('myapp-items', JSON.stringify(items));
}, [items]);
```

Claude Code knows this pattern and will implement it correctly when prompted.

---

## Key Pattern: Charts and Visualizations

For data visualization in standalone apps, tell Claude Code to use Chart.js from CDN:

```
> For charts, use Chart.js from CDN (https://cdn.jsdelivr.net/npm/chart.js).
> Show a bar chart for [metric A] and a line chart for [metric B].
```

Or for pure CSS/SVG charts (no extra library):
```
> Draw the chart using SVG elements — no chart library needed.
  Show bars as <rect> elements with proportional heights.
```

---

## Key Pattern: CSV Import/Export

For apps that need to handle data:

```
> Add a "Import CSV" button that reads a CSV file from the user's computer
  and populates the app data. Add an "Export CSV" button that downloads
  all current data as a CSV file.
```

Claude Code will implement the FileReader API for import and Blob + URL.createObjectURL for export.

---

## Real Example: Full Prompt for a Billable Hours Tracker

For consultants, fractional executives and anyone tracking time across clients, this is the kind of tool that pays for itself in week one:

```
Create a single HTML file called billable-hours.html — a billable time tracker
designed for fractional executives and consultants.

Use React via CDN (unpkg.com React 18). No npm, no build tools, no external 
CSS frameworks.

Features:
- Add clients (name, hourly rate, color tag, default project type)
- Start/stop timer per client with one click
- Show elapsed time for each active timer in HH:MM:SS, updating every second
- Log completed entries: client, project description, start, end, duration, 
  billable amount (auto-calculated from rate × hours)
- Filter log by client or date range
- Weekly summary: total billable hours per client, total revenue this week
- Monthly invoice view: pre-formatted invoice per client ready to copy into 
  email or Stripe — includes itemized entries with descriptions
- Export log as CSV for QuickBooks / accountant handoff

Design:
- Clean white background, card layout, professional finish
- Sidebar with client list (with color dot + current week's billable total)
- Main area: active timer at top, log below
- Active timer shows in green with a pulsing indicator
- Invoice view uses serif font and prints cleanly on letter-size paper
- Responsive for mobile (stack sidebar above main at <768px)

Persist all data in localStorage under key 'billable-hours-data'.
No login, no server — pure browser app. Free to use forever.
```

This one prompt produces a complete tool that replaces $30-50/month of Harvest, Toggl or FreshBooks for a solo operator. That's the leverage Claude Code gives you.

---

## Limitations of Standalone Apps

Standalone HTML apps cannot:
- Fetch from external APIs that block CORS (unless the API allows it)
- Send emails or make server-side calls
- Authenticate users
- Store data on a server (localStorage is local only)
- Run scheduled background tasks

When you need any of those capabilities, move to a Next.js app (next lesson).

---

## Organization: When You Have Multiple Apps

As you build more standalone apps, organize them in a folder with a simple index:

```
my-tools/
├── index.html          # Navigation page linking to all tools
├── time-tracker.html
├── budget-tracker.html
├── todo-app.html
└── ...
```

You can prompt Claude Code to create the index:
```
> Create an index.html that serves as a homepage for my tools collection.
  It should list all the .html files in this folder with their names and 
  brief descriptions. Style it as a clean card grid.
```

---

Next: [Next.js Apps](./nextjs-apps.md)
