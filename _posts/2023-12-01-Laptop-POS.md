---
title: CornerTill (formerly Laptop POS)
name: CornerTill
date: 2023-12-01
categories: [Projects, Laptop POS]
tags: [laravel, php, react, typescript, inertia, tailwind css, mysql, docker, i18n, aws, paddle] # Tag names should be lowercase
media_subpath: /assets/img/Projects/Laptop POS
image:
  path: /cornertill-logo.png
  alt: CornerTill logo
summary: A cloud point-of-sale system for retail stores, live as a free beta, with inventory, checkout, bills, and sales dashboards in English and Arabic.
kind: Personal product
status: live
featured: true
order: 2
links:
  live: https://cornertill.com
  source: https://github.com/Ahmad-Alkaf/CornerTill
screenshot:
  path: /cornertill-home.webp
  small: /cornertill-home-640.webp
  alt: The CornerTill home page with the free beta offer
  domain: cornertill.com
case:
  problem: A small store needs inventory, checkout, bills, staff roles, and sales reports in one web app that works on any device.
  built: Laravel and Inertia with React and TypeScript. Multi-role store accounts (Cashier, Maintainer, Owner), a full Arabic RTL layout with an English and Arabic switch, Google sign-in, and email through Resend.
  result: Live at cornertill.com as a free beta, with all features and no credit card. A store runs its inventory, checkout, bills, and dashboard from any device with a browser, in English or Arabic.
---

> CornerTill is live at [cornertill.com](https://cornertill.com) as a free beta. The source code is in a public repo on [GitHub](https://github.com/Ahmad-Alkaf/CornerTill) (source-available, PolyForm Noncommercial license; it was open source until November 2026). [![GitHub stars](https://img.shields.io/github/stars/Ahmad-Alkaf/CornerTill?style=social&label=Stars)](https://github.com/Ahmad-Alkaf/CornerTill)

> Laptop POS is now **CornerTill**. The project was renamed in November 2026, and the repository moved to [Ahmad-Alkaf/CornerTill](https://github.com/Ahmad-Alkaf/CornerTill) on GitHub. Old links to the repository still work.
{: .prompt-info}

CornerTill is a **cloud point-of-sale system** for retail stores. It covers the full store loop: inventory, checkout, bills, stock tracking, and sales dashboards. It works in English and in Arabic, with a full right-to-left layout.

The first release was in December 2023. In November 2026, I renamed the product, moved it to a new deployment, and launched it as a free beta at cornertill.com.

## Features

- **Multi-role store accounts** — **Cashiers** ring up sales at checkout, **Maintainers** manage the inventory and the catalog, and **Owners** see the full picture on the dashboard.
- **Inventory** — product names, descriptions, barcodes, prices, images, and stock.
- **Checkout and bills** — barcode input, cash or digital payment, change calculation, and a bill for each sale.
- **Sales dashboard** — sales, bills, staff performance, and inventory status.
- **English and Arabic** — a full Arabic right-to-left layout, a language switch, and localized server messages.
- **Accounts** — owner and staff registration, email verification and password reset through Resend, and Google sign-in.
- **Responsive** — the same app works on a phone, a tablet, and a desktop.

## How it runs

- **Stack** — **Laravel 12** (backend), **Inertia** (glue layer), and **React + TypeScript** (frontend), styled with **Tailwind CSS**, on **MySQL**.
- **One production Docker image** — PHP-FPM, nginx, and supervisord. The queue worker and the scheduler run in the same container. A `/api/health` endpoint checks the database.
- **Deployment** — Coolify on Hetzner Cloud, with Cloudflare in front. Each push to the production branch deploys automatically.
- **Scheduled jobs** — for example, a deleted business is a soft delete, and a daily job removes it permanently after 30 days.
- **Backups** — hourly and daily database backups to Backblaze B2. A restore test passed.
- **Uptime monitoring** on the live site.
- **Feature switches** — Paddle subscription billing (three paid plans and a free tier) is in the code, and a switch keeps it off during the free beta. Each social sign-in provider has its own switch.

## History

- **2023** — first release as Laptop POS, deployed end-to-end on **AWS**: S3 for assets, EC2 for compute, RDS for the MySQL database, and CodePipeline for continuous deployment. That deployment no longer runs.
- **November 2026** — renamed to CornerTill, upgraded to Laravel 12, given a full Arabic layout, and launched as a free beta at cornertill.com.

## Screenshots

![Inventory page — manage products and stock](/cornertill-inventory.webp)
_Inventory page — manage products and stock_

![Checkout page — ring up a sale](/cornertill-checkout.webp)
_Checkout page — ring up a sale_

![Dashboard page — sales analytics at a glance](/cornertill-dashboard.webp)
_Dashboard page — sales analytics at a glance_

## Summary

A cloud POS web application for retail stores, live as a free beta at [cornertill.com](https://cornertill.com). Source-available in a public [repository](https://github.com/Ahmad-Alkaf/CornerTill).

- Built with **Laravel**, **Inertia**, and **React + TypeScript**, styled with **Tailwind CSS**, on **MySQL**.
- Inventory, checkout, bills, stock tracking, and sales dashboards, with multi-role store accounts.
- English and Arabic, with a full right-to-left layout.
- Docker on Coolify with auto-deploy, scheduled jobs, backups with a tested restore, and uptime monitoring.
- First released in 2023 on AWS (S3, EC2, RDS, CodePipeline).
