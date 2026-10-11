---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
title: Resume
media_subpath: /assets/img/resume
toc: true
---

<div class="d-flex justify-content-center mb-2">
    <img class="border border-success rounded-circle overflow-hidden" width="250px" src="University personal photo 6x6 (HD).webp" alt="Graduation Avatar" />
</div>

I'm Ahmed Hashem Mohsen Alkaf Alhashemi, a full-stack software engineer with 4 years of experience. I work at **TechTroniX** in Jeddah, where I build and run internal web applications with **TypeScript, React, Next.js, Node.js, tRPC, Prisma, and PostgreSQL**, and deploy them with **Docker**. I take each feature from requirements to production, and I work directly with the staff who use it every day.

<i class="fas fa-map-marker-alt fa-fw"></i> Jeddah, Saudi Arabia

## Experience

### TechTroniX

**Software Engineer (Full-Stack, QA Automation, DevOps)** · Jeddah, Saudi Arabia · On-site  
Full-time: December 2023 – Present · Internship: November 2023

TechTroniX is an eCommerce and PC-assembly company. I work on a team of 3 developers.

- Built a desktop quality-control tool (C#, .NET) and automated stress testing for the PC-assembly line. With these tools, the company separated building from testing: team output went from 18 to 30 PC towers per day with the same 6 people. The tool runs 38 checks and has 3,636 automated tests.
- Built and maintain these parts of the company's operations portal (Next.js, TypeScript, tRPC, Prisma, PostgreSQL): the quality-control module with 119 data points per PC, the authentication and permissions layer, background jobs, file storage, and live updates with Server-Sent Events.
- Automated marketplace operations on Amazon, Noon, and Trendyol with Node.js, Amazon SP-API, Puppeteer, and AWS SQS: stock sync from the company's online store through signed webhooks, order processing, and 14 report feeds into the purchasing team's Google Sheets.
- Built an AI invoice flow for the purchasing team: OCR (Azure Document Intelligence) and an LLM read supplier invoices, and the system matches each line to the product catalog. A person reviews every AI result before anything is saved to the store.
- Set up CI/CD with GitHub Actions, Docker, and an AWS EC2 build server that runs only during a deploy. Moved the portal's file storage to Amazon S3 with only a short stop, and verified the copy at 0 differences across 938 files.

## Projects

- [Autism Children Technical System (ACTS)](/posts/ACTS)
- [Schedule Builder](/posts/Schedule-Builder)
- [Certificate Platform](/posts/Certificate-Platform)
- [QRForge](/posts/QRForge)
- [ImageForge](/posts/ImageForge)
- [Laptop POS](/posts/Laptop-POS)
- [Check Task](/posts/Check-Tasks)
- [Alhajarayn Guide](/posts/Alhajarayn-Guide-Transactions)

## Education

### Al-Ahgaff University

![Al-Ahgaff University Logo](Colloge Flag.webp){: w="200"}

**Bachelor of Science in Computer Information Systems (CIS)**, [**Al-Ahgaff University**](https://ahgaff.edu), 2019 – 2023.  
GPA: **4.12 / 5**. Excellence Certificate for the second-highest GPA among my peers.

## Certifications & Memberships

- **Saudi Engineers Association**: registered member, Allied Engineering Specialist.
- **Gold Medal, Research and Innovation Poster Competition (RIPC), 2023**: for the [ACTS](/posts/ACTS) project, among 174 projects from different countries.
- **Claude 101**, **Claude Code 101**, and **Claude Code in Action**: Anthropic Academy courses, 2026.
- **AI ERA NEON Bootcamp, Artificial Intelligence Path** (Neon with IBM SkillsBuild): participant, 2026.
- **AWS Cloud Practitioner Essentials**: AWS Skill Builder course, 2026.

## Languages

- **Arabic**: native
- **English**: fluent

## Skills

{% capture site_tags %}
{% for tag in site.tags %}
{{ tag | first }}
{% unless forloop.last %},{% endunless %}
{% endfor %}
{% endcapture %}
{% assign tags_list = site_tags | split:',' | sort_natural %}

<div>
{% for item in (0..site.tags.size) %}{% unless forloop.last %}
{% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
<a href="/tags/{{ this_word | replace: ' ', '-' | replace: '.', '-' | replace: '#', '' }}" class="tag" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Used in {{site.tags[this_word].size }} Projects"><span class="tag-name">{{ this_word }}</span>&nbsp;<span class="count">{{ site.tags[this_word].size }}</span></a>
{% endunless %}{% endfor %} 
</div>


