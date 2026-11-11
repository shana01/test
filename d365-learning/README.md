# D365 F&O Academy

A self-paced learning app for **Microsoft Dynamics 365 Finance & Operations** (Finance and Supply Chain Management). It explains what each module does and walks you through how to use it.

## Features

- **17 modules** in four areas:
  - **Foundations:** Getting started and navigation; Organization and system administration
  - **Finance:** General ledger, Accounts payable, Accounts receivable, Cash and bank, Fixed assets, Budgeting
  - **Supply chain:** Product information, Procurement, Sales, Inventory, Warehouse, Production, Master planning
  - **Projects and people:** Project management and accounting, Human resources
- Each module has an **overview**, **key concepts**, **step-by-step how-to guides** with menu paths, **tips**, and a **quiz**.
- **End-to-end processes** (Procure-to-Pay, Order-to-Cash, Record-to-Report, Plan-to-Produce) show how the modules connect.
- A **glossary** of every term, with filters
- **Flashcards** for every term (keyboard: Space flips the card, ← → move between cards)
- **Search** across modules, guides and terms
- **Progress tracking** (stored in your browser's localStorage) and **light and dark themes**

## Running it

The app is plain HTML, CSS and JavaScript, with no build step and no dependencies.

- Open `d365-learning/index.html` in a browser, or
- serve the folder: `python3 -m http.server -d d365-learning 8000`, then go to <http://localhost:8000>, or
- publish it with GitHub Pages.

## Installing it on a phone

The app is a Progressive Web App: it gets a home-screen icon, opens full screen, and works offline once it has loaded.

- **iPhone or iPad (Safari):** open the site, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap **⋮**, then **Install app** (or **Add to Home screen**).

Live site: <https://shana01.github.io/test/d365-learning/>

When you change a cached file, the app shows the update on its next launch. If you add or rename files, bump `CACHE` in `sw.js`.

## Adding or editing content

All learning content is in [`js/data.js`](js/data.js). To add a module, add an object to `D365_MODULES` with these fields:

```js
{
  id: "unique-id",
  name: "Module name",
  area: "finance",            // foundation | finance | scm | projects
  summary: "One-line description",
  overview: ["Paragraph", "..."],
  concepts: [{ term: "Term", def: "Definition" }],
  tasks: [{ title: "Do something", path: "Module > Menu > Page", steps: ["Step 1", "..."], tip: "Optional" }],
  tips: ["..."],
  quiz: [{ q: "Question?", options: ["A", "B", "C"], answer: 1, explain: "Why B is right" }],
}
```

The app picks up the new module automatically: home page, glossary, flashcards, search and quiz.

> This is an unofficial study aid. Menu paths follow the standard product but can vary by version and configuration, so always confirm them on Microsoft Learn.
