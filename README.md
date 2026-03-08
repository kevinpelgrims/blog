# Blog

Personal blog built with [Eleventy (11ty)](https://www.11ty.dev/) and hosted on Firebase.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

## Getting started

```bash
git clone https://github.com/kevinpelgrims/blog.git
cd blog
cd src
npm install
npm start
```

This will build the site and start a local development server with live reload.
The site will be available at `http://localhost:8080`.

## Build

To generate a production build:

```bash
npm run build
```

The output will be in `src/_site/`.

## Deployment

Deployment to Firebase happens automatically through GitHub workflows.
