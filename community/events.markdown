---
layout: default
title:  Events
title_tag: Go CD Events & Learning Sessions
meta_tag_description: Go CD events and learning sessions
meta_tag_keywords: go events, learning session, continuous delivery, open source, go cd
---

#### Upcoming Events

{% for event in site.data.events %}
- <a href="{{ event.url }}">{{ event.title }}</a> - {{ event.date }} - {{ event.description }}
{% endfor %}