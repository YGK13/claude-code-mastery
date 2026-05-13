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

## Real Example: Full Prompt for a Time Tracker

```
Create a single HTML file called time-tracker.html that is a time tracker app.

Use React via CDN (unpkg.com React 18). No npm, no build tools, no external CSS frameworks.

Features:
- Add projects (name + color tag)
- Start/stop timer for any project with a single click
- Show elapsed time for each active timer in HH:MM:SS format, updating every second
- Log completed time entries (project, start time, end time, duration)
- Filter log by project or date range
- Summary view: total hours per project this week
- Export log as CSV

Design:
- Clean white background, card layout
- Sidebar with project list, main area with timer and log
- Active timer shows in green with a pulsing indicator
- Responsive for mobile (stack sidebar above main at <768px)

Persist all data in localStorage under key 'time-tracker-data'.
```

This one prompt will produce a complete, production-quality time tracker. That's the power of Claude Code with a well-crafted prompt.

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
