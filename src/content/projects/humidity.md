---
title: "Humidity Sensor and Weather Tracker"
description: "A home humidity monitoring system that tracks indoor moisture levels and correlates them with local weather data"
url: "https://github.com/kevinpelgrims/humidity-sensor"
image: "humidity.png"
tags: ["arduino", "raspberry pi", "python", "web", "react", "firebase"]
---

A home humidity monitoring system designed to track indoor moisture levels and correlate them with local precipitation. I built this project to verify whether a water leak repair was successful by monitoring humidity in the affected area over time.

<img src="/img/projects/humidity.png" alt="Humidity Dashboard" style="max-width: 500px;">

## Architecture

The system consists of multiple components working together:

<div class="feature-columns">
<div class="feature-column">

#### Arduino

Reads temperature and humidity from a DHT-22 sensor and outputs JSON data serially every 5 seconds.

</div>
<div class="feature-column">

#### Raspberry Pi

A Python script collects the Arduino data over serial and posts readings to Firestore every 15 minutes.

</div>
<div class="feature-column">

#### Firebase

Stores data in Firestore, triggers Cloud Functions for automation, and hosts the React dashboard.

</div>
</div>

## Cloud Functions

Two automated functions trigger on new sensor readings:

- **fetchWeatherConditions** - Retrieves current weather data from the Open-Meteo API
- **sendHumidityAlert** - Triggers email notifications when humidity exceeds 70%

## Dashboard

The dashboard is built with React, Vite, and Tailwind CSS.
It displays current readings, weather conditions, and historical humidity-to-precipitation charts to help identify correlations between indoor humidity and outdoor weather.
