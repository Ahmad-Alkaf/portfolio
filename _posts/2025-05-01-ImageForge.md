---
title: ImageForge
date: 2025-05-01
categories: [Projects, ImageForge]
tags: [next.js, react, typescript, sharp, aws s3, clerk, prisma, postgresql, tailwind css] # Tag names should be lowercase
media_subpath: /assets/img/Projects/ImageForge
image:
  path: /imageforge-logo.webp
  alt: ImageForge logo
---

ImageForge is a web-based image toolkit that bundles the edits you usually need a handful of separate tools for: **AI background removal**, resizing, format conversion, EXIF inspection, and file storage — with batch processing and bulk download built in.

## Features

- **AI background removal** that runs entirely in your browser via `@imgly/background-removal` (WASM) — images never have to leave the device for this step.
- **Server-side processing with Sharp** — resize, convert formats, and optimize.
- **Client-side compression** before upload (`browser-image-compression`) to keep things fast.
- **EXIF metadata reading** (`exif-reader`) — inspect the data baked into your photos.
- **Batch operations** with one-click bulk download as a zip (`JSZip`).
- **Pluggable storage** — local disk by default, or S3-compatible storage when configured; accounts via Clerk.

## Summary

A batch-friendly image utility built with Next.js.

- Client-side AI background removal (WASM) and pre-upload compression.
- Server-side resize / convert / optimize with Sharp.
- EXIF extraction, local or S3-compatible storage, and zip bulk download.
- Clerk auth, Prisma + PostgreSQL; Dockerfile prepared for Coolify on Hetzner Cloud.
