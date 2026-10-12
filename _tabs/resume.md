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

I'm Ahmed Hashem Mohsen Alkaf Alhashemi, a full-stack software engineer with 4 years of experience. I build web applications with **TypeScript, React, Next.js, Node.js, Prisma, and PostgreSQL**, and deploy them with **Docker**.

<i class="fas fa-map-marker-alt fa-fw"></i> Jeddah, Saudi Arabia

## Projects

- [Autism Children Technical System (ACTS)](/posts/ACTS)
- [Schedule Builder](/posts/Schedule-Builder)
- [Etamyd](/posts/Etamyd)
- [QR Anvil](/posts/QR-Anvil)
- [PDF Anvil](/posts/PDF-Anvil)
- [SetupForge](/posts/SetupForge)
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


