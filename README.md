# Is the Earth 6000 Years Old?

Code base for [istheearth6000yearsold.com](https://www.istheearth6000yearsold.com).

---

## Architecture

A minimal Node.js/Express server that renders a single Handlebars template. There is no database — curated article links are stored in `sources.json` and loaded once at startup.

```
earth6k/
├── server.js           # Express app — middleware, routing, server startup
├── config.js           # App config (port)
├── routes/
│   └── index.js        # Single route: loads sources.json, renders index view
├── views/
│   └── index.hbs       # Handlebars template — the entire page
├── public/
│   ├── css/style.css   # Styles (mobile-first, CSS custom properties, dark mode)
│   ├── js/script.js    # Opens all links in a new tab
│   ├── img/            # Favicon and social share image
│   ├── library/        # FontAwesome (copied here by npm run build)
│   ├── robots.txt
│   └── sitemap.xml
└── sources.json        # Curated article links rendered in the footer
```

**Request flow:**
1. `GET /` hits `routes/index.js`
2. Route passes the current year and the pre-loaded `sources` array to the template
3. Handlebars renders `views/index.hbs` and Express sends the response

**Analytics:** [Umami](https://umami.is) (privacy-focused, no cookies).

---

## Local Development

**Prerequisites:** Node.js 22

```bash
# Install dependencies
npm install

# Copy FontAwesome assets into public/library/
npm run build

# Start the dev server with auto-reload
npm run dev
```

The site is available at `http://localhost:3000`.

To add or update articles in the "Read More" footer section, edit `sources.json`. Each entry takes this shape:

```json
{
  "url": "https://example.com/article",
  "text": "Article title or description",
  "source": "Publication Name",
  "date": "Month YYYY"
}
```

---

## Digital Ocean Setup

The site runs on a Digital Ocean App Platform app, deployed automatically whenever the `master` branch is pushed to GitHub.

### First-time setup

1. In the [Digital Ocean control panel](https://cloud.digitalocean.com/apps), create a new App and connect it to this GitHub repository.
2. Configure the app:
   - **Branch:** `master`
   - **Run command:** `npm start`
   - **Build command:** `npm install && npm run build`
   - **HTTP port:** `3000`
3. Deploy.

### Deploying an update

```bash
# Merge your changes into master
git checkout master
git merge develop
git push origin master
```

Digital Ocean detects the push and triggers a new build automatically. The build runs `npm install && npm run build` before starting the server with `npm start`.

### Environment variables

No environment variables are required. The port defaults to `3000` and is overridden by `process.env.PORT` if set by the platform.
