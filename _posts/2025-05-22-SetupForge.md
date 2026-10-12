---
title: SetupForge
date: 2025-05-22
categories: [Projects, SetupForge]
tags: [next.js, react, typescript, tanstack query, zod, vitest, c#, winforms, powershell, docker] # Tag names should be lowercase
media_subpath: /assets/img/Projects/SetupForge
image:
  path: /setupforge-logo.png
  alt: SetupForge logo
---

SetupForge is a web app for setting up a Windows PC. You pick your apps from the WinGet catalog (15,000+ packages), and SetupForge generates a custom installer EXE. You run the EXE, and it installs all the apps unattended.

The project spans three layers: a web frontend, server-side EXE compilation on demand, and a native Windows installer runtime (.NET WinForms, C#).

## Features

- **App catalog** — 15,207 verified WinGet package ids, shown in a responsive grid of 1 to 4 columns.
- **Fast search** over thousands of apps with `useDeferredValue` and memoized filtering; the grid is virtualized with TanStack Virtual.
- **Shareable presets** — your app selection is synced to the URL, so you can share an installer preset as a link.
- **Custom installer EXE** — generated on demand for your selection.
- **Unattended install** — the installer runs each app's install without user input and shows live console output and progress.

## How it is built

- **On-demand EXE generation** — `POST /api/generate-installer` copies the WinForms project to a temporary folder, writes the action script, runs MSBuild, and streams the EXE back. The container compiles a .NET Framework WinForms project **on Linux** (Mono MSBuild beside the Node runtime).
- **Request hardening** — Zod validation, every id checked against the catalog, app names taken from the catalog and not from the client, a cap of 200 apps, and a strict WinGet-id pattern. The id ends up inside a PowerShell command on the user's PC, so this is a command-injection defence.
- **Build back-pressure** — 2 concurrent builds and a queue of 10; after that, the server returns HTTP 503.
- **Supervised startup** — the catalog and the builder run as independent supervised tasks with file locks and retry back-off (30 s to 5 min), in "limited" and "full" service phases, with `/api/health`, `/api/status`, and `/api/ready` endpoints. Catalog snapshots are published by atomic rename and refreshed every 72 hours.
- **Installer runtime (C#, WinForms)** — a JSON-based action interpreter with parallel or sequential child execution, a PowerShell runner, process management, configurable error handling (Continue / Stop), real-time console output, progress tracking, and a hidden-execution mode.
- **Frontend data** — TanStack Query (React Query) with a 6-hour stale time and a 48-hour cache, Radix UI components.
- **Privacy-limited analytics** — PostHog events on key user actions, with no session recording and Do Not Track honoured.
- **Tests** — 79 automated test cases across 16 files with Vitest.

## Summary

A full-stack Windows setup tool: web app, server-side EXE build, and native installer.

- Next.js + React frontend over a 15,000+ package WinGet catalog, with virtualized rendering and shareable presets.
- Server-side compilation of a .NET Framework WinForms installer on Linux with Mono MSBuild, behind validation, an injection defence, and build back-pressure.
- C# installer runtime that runs PowerShell install actions unattended.
- Supervised startup with health, status, and readiness endpoints; 79 Vitest test cases; Docker.
