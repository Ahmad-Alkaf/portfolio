---
title: Alhajarayn Guide
date: 2022-01-01
categories: [Projects, Alhajarayn Guide]
tags: [node.js, express, mysql, javascript, typescript, jquery, bootstrap, html, css] # Tag names should be lowercase
media_subpath: /assets/img/Projects/Alhajarayn Guide
image:
  path: /alhajarayn-guide-logo.webp
  alt: Alhajarayn Guide logo
---

Alhajarayn Guide ("دليل الهجرين") is a database-backed web system for managing the records of the town of Alhajarayn. It keeps a directory of **persons** — exportable as **vCard** contacts — and tracks the **requests** and **operations** (transactions) associated with them, all behind a login with user management. The interface is fully Arabic (right-to-left).

## Features

- **Requests** — the home screen: searchable request cards with add / edit / view-details / delete.
- **Persons directory** — manage people's records, with **vCard** contact export.
- **Operations** — record and edit the town's operations (transactions).
- **Users & authentication** — session-based login and user management.
- **File uploads** — attach files to records.

## Tech stack

A full-stack web app: a **Node.js + Express** server backed by **MySQL**, with a **jQuery + Bootstrap** frontend (with autocomplete), session-based auth, file uploads, and server-side **vCard** generation. Written with **TypeScript**.

Built together with **Ali Bin Shoaib**.
