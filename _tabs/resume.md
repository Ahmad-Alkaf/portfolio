---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
title: Resume
img_path: ../../assets/img/resume
toc: true
---

<div class="d-flex justify-content-center mb-2">
    <img class="border border-success rounded-circle overflow-hidden" width="250px" src="University personal photo 6x6 (HD).jpg" alt="Graduation Avatar" />
</div>

I'm Ahmad Hashem Alkaf Alhashemi. A recent graduate of **Computer Information Systems** with experience working across the full stack of software development. Excited to learn and innovate, and I always strive to improve my skills and experiences as a programmer. I have skills in problem-solving, communication, and teamwork. I participated in several projects including developing a system for a charity organization.

## Education

### Al-Ahgaff University

![Al-Ahgaff University Logo](Colloge Flag.png){: w="200"}

Graduate with a **bachelor's degree** from [**Al-Ahgaff University**](http://ahgaff.edu) in **Computer Information Systems (CIS)** with a **GPA of 4.12** between **2019 - 2023**.

#### Graduation Certificate
![Graduation Certificate photo](Graduation certificate.jpg){:w="400"}

Eager to learn new technologies and apply my skills in problem-solving,
communication, and teamwork to create innovative solutions. Looking for a role where I can grow and learn from experienced team members.

## Projects

- [Autism Children Technical System (ACTS)](/posts/ACTS)
- [Schedule Builder](/posts/Schedule-Builder)
- [Check Tasks](/posts/Check-Tasks)
- [Alhajarayn Guide Transactions](/posts/Alhajarayn-Guide-Transactions)
- [Laptop Accounting](/posts/Laptop-Accounting)

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
<a href="/tags/{{ this_word | replace: ' ', '-' }}" class="tag" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Used in {{site.tags[this_word].size }} Projects"><span class="tag-name">{{ this_word }}</span>&nbsp;<span class="count">{{ site.tags[this_word].size }}</span></a>
{% endunless %}{% endfor %}
</div>


