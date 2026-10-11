---
title: Certificate Platform
date: 2025-11-01
categories: [Projects, Certificate Platform]
tags: [tanstack start, react, typescript, postgresql, prisma, better auth, tailwind css, shadcn ui, paraglide, docker, playwright, vitest, multi-tenancy, rbac, i18n] # Tag names should be lowercase
media_subpath: /assets/img/Projects/Certificate Platform
image:
  path: /certificate-platform-logo.webp
  alt: Certificate Platform logo
---

Certificate Platform is a multi-tenant **certificate-issuance system** for training organizations. Each organization manages its own courses, participants, trainers, and certificates in fully isolated data, issues certificates from **JSON-configurable templates**, and every certificate carries a **QR code** that anyone can scan to verify it's genuine. Content is fully **bilingual (Arabic / English)** with right-to-left support.

It was built by a small team — two engineers working full-stack across the entire codebase, plus a product planner handling requirements.

## Features

- **Multi-tenancy** — organization-isolated data for courses, participants, trainers, and certificates.
- **Certificate templates** — customizable layouts driven by JSON configuration.
- **QR verification** — every issued certificate is verifiable via a QR code scan.
- **Role-based access** — Admin / Employee roles via Better Auth.
- **Bilingual** — full Arabic-RTL and English-LTR via Paraglide JS.
- **Dashboard** — analytics and insights across courses and certificates.
- **Tested** — unit/integration tests with Vitest, end-to-end tests with Playwright.

## Tech stack

Built on the modern **TanStack** stack — TanStack Start (React SSR), Router, Query, Table, and Form — with PostgreSQL + Prisma, Better Auth, Tailwind CSS + Shadcn UI, and the React Compiler enabled. Containerized with Docker.

## Summary

A multi-tenant, bilingual, QR-verified certificate platform.

- Organization-isolated multi-tenant data model with RBAC.
- JSON-configurable certificate templates; QR verification for issued certificates.
- Full Arabic/English i18n (RTL) via Paraglide.
- TanStack Start full-stack with Vitest + Playwright coverage; Dockerized.
- Built collaboratively in a small team (two engineers + a product planner).
