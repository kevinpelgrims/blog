---
title: "Syslogger"
description: "A Docker-based stack for collecting, storing, and visualizing syslog messages from network devices"
url: "https://github.com/kevinpelgrims/router-syslog"
image: "syslogger.png"
tags: ["docker", "timeseries", "grafana", "homelab"]
---

A Docker Compose configuration for collecting syslog messages through Vector, persisting them in Loki, and visualizing via Grafana. I built this to monitor and analyze logs from my home router.

<img src="/img/projects/syslogger.png" alt="Grafana Dashboard" style="max-width: 500px;">

## Architecture

<div class="feature-columns">
<div class="feature-column">

#### Vector

Receives syslog messages via UDP, parses them, and forwards to both console (for debugging) and Loki for storage.

</div>
<div class="feature-column">

#### Loki

Log serves as the storage layer. It is optimized for storing and querying log data efficiently.

</div>
<div class="feature-column">

#### Grafana

Provides the visualization interface with a dashboard template for analyzing log patterns and troubleshooting.

</div>
</div>

## Deployment

The stack can be launched with a single command and is compatible with Raspberry Pi for a low-power homelab setup.
