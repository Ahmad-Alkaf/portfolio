---
title: Laptop POS
date: 2023-12-01
categories: [Projects, Laptop POS]
tags: [laravel, php, react, typescript, inertia, tailwind css, mysql, aws, paddle] # Tag names should be lowercase
media_subpath: /assets/img/Projects/Laptop POS
image:
  path: /laptop-pos-logo.png
  alt: Laptop POS logo
---

Laptop POS is an open-source **cloud Point-of-Sale system** for retail stores. It covers the full retail loop — inventory management, checkout, billing, stock tracking, and sales dashboards — with subscription billing. It was deployed end-to-end on AWS.

> The project is open source on [GitHub](https://github.com/laravel-aaa/Laptop-POS) [![GitHub stars](https://img.shields.io/github/stars/laravel-aaa/Laptop-POS?style=social&label=Stars)](https://github.com/laravel-aaa/Laptop-POS)
{: .prompt-tip}

Each store gets multi-role accounts so the right people see the right tools: **Cashiers** ring up sales at checkout, **Maintainers** manage inventory and the catalog, and **Owners** get the full picture through analytics dashboards. Stores subscribe through **Paddle** — three paid plans plus a no-credit-card free tier — and the interface is responsive across devices and browsers.

It was deployed entirely on **AWS**: S3 for asset storage, EC2 for compute, RDS for the MySQL database, and CodePipeline for continuous deployment.

## Screenshots

![Inventory page — manage products and stock](/inventory.webp)
_Inventory page — manage products and stock_

![Checkout page — ring up a sale](/checkout.webp)
_Checkout page — ring up a sale_

![Dashboard page — sales analytics at a glance](/dashboard.webp)
_Dashboard page — sales analytics at a glance_

## Summary

A cloud POS web application for retail stores. Open source at the [repository](https://github.com/laravel-aaa/Laptop-POS).

- Built with **Laravel** (backend), **Inertia** (glue layer), and **React + TypeScript** (frontend), styled with **Tailwind CSS**.
- Inventory, checkout, billing, stock tracking, and sales dashboards.
- Multi-role store accounts: Cashier, Maintainer, Owner.
- Subscription billing via **Paddle** — three plans plus a free tier.
- Was deployed end-to-end on **AWS**: S3, EC2, RDS (MySQL), CodePipeline.
