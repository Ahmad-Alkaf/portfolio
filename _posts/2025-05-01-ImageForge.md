---
title: ImageForge
date: 2025-05-01
categories: [Projects, ImageForge]
tags: [next.js, react, typescript, sharp, aws s3, clerk, prisma, postgresql, tailwind css, shadcn ui, zod, vitest, docker] # Tag names should be lowercase
media_subpath: /assets/img/Projects/ImageForge
image:
  path: /imageforge-logo.webp
  alt: ImageForge logo
---

> The source code is in a public repo on [GitHub](https://github.com/Ahmad-Alkaf/image-utility) (source-available, PolyForm Noncommercial license).

ImageForge is a web-based image toolkit. It bundles the edits you usually need a handful of separate tools for into **seven tools**, with batch processing and bulk download built in.

## Tools

1. **Convert** — change the image format.
2. **Compress** — make the file smaller.
3. **Resize / crop** — change the size, or cut the image.
4. **Watermark** — add a watermark to the image.
5. **Filters** — apply image filters.
6. **Metadata** — view or strip the EXIF data baked into your photos (`exif-reader`).
7. **AI background removal** — runs entirely in your browser via `@imgly/background-removal` (WASM in a Web Worker) — the image never leaves the device for this step.

## How it is built

- **One shared request handler for all six server tools** — auth, rate limit, validation, storage, job record, and error mapping in one place. Each tool route is a thin wrapper.
- **Server-side processing with Sharp** — resize, crop, format conversion, compression, watermark, and filters.
- **Client-side compression** before upload (`browser-image-compression`) to keep things fast.
- **Batch operations** with one-click bulk download as a zip (`JSZip`).
- **Pluggable storage** — local disk by default, or S3-compatible storage when configured; download tokens for results.
- **24-hour file retention** — a scheduler and a cron route delete files in batches of 200 and keep the job history.
- **Accounts and data** — Clerk authentication; Prisma + PostgreSQL for users and jobs.
- **Tests** — 50 automated test cases across 5 files with Vitest.

## Summary

A batch-friendly image utility built with Next.js.

- Seven tools: convert, compress, resize / crop, watermark, filters, metadata view / strip, and AI background removal.
- Client-side AI background removal (WASM) and pre-upload compression.
- One shared server pipeline with Sharp, local or S3-compatible storage, and time-limited file retention.
- Clerk auth, Prisma + PostgreSQL; 50 Vitest test cases; Dockerfile prepared for Coolify on Hetzner Cloud.
