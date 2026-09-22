-------------------------------ok this old repo can go public-------------------------------
![ecommerce frontend screenshot](ecommerce_frontend_screenshot.png)

# Scraper E-commerce

A Node.js/Express service that uses [Puppeteer](https://pptr.dev/) (with stealth plugin) to scrape product listings from major Indonesian e-commerce marketplaces — **Shopee**, **Tokopedia**, **Lazada**, and **Blibli** — then deduplicates, cleans, and downloads product images for the results.

## Features

- **Multi-marketplace scraping**: dedicated scraper modules for Shopee, Tokopedia, Lazada, and Blibli (`fungsi/*.js`), driven from category/brand search URLs (e.g. laptop, SSD, RAM, smartphone by brand).
- **Duplicate tracking**: `cekduplikat.js` merges new results into a running `TERBARU/cekduplikat.json` file and increments a `statusScrape` counter for products no longer seen.
- **Automatic cleanup**: `bersihkan.js` removes stale products (past a max `statusScrape` threshold), filters out irrelevant results (e.g. accessories matched under a "LAPTOP" category, or a rival brand's name showing up in another brand's listing), and normalizes product title capitalization.
- **Image downloader**: `downloadgambar.js` downloads product images per marketplace into `hasil/GAMBAR/{t,l,b,s}`.
- **Timestamped snapshots**: every scrape run writes its raw output to a new `hasil/YYYY-MM-DD HH/` folder, in addition to updating the merged `hasil/TERBARU/*.json` files.
- **Email notifications**: sends a notification email (via Nodemailer/Ethereal) after each stage (scrape, dedupe, cleanup, image download) completes or fails.
- **Anti-detection**: uses `puppeteer-extra-plugin-stealth` and a persistent Chrome user profile to reduce bot detection.

## Tech stack

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Puppeteer](https://pptr.dev/) / `puppeteer-extra` / `puppeteer-extra-plugin-stealth`
- [Nodemailer](https://nodemailer.com/) for email notifications
- [request-promise](https://github.com/request/request-promise) for auxiliary HTTP requests
- [dotenv](https://github.com/motdotla/dotenv) for configuration
- [nodemon](https://nodemon.io/) for local development

## Project structure

```
scraper.js              # Express app: HTTP endpoints that orchestrate a full scrape run
fungsi/
  shopee.js              # Scrapes Shopee search results
  tokopedia.js           # Scrapes Tokopedia search results
  lazada.js              # Scrapes Lazada search results
  blibli.js              # Scrapes Blibli search results
  cekduplikat.js         # Merges results and tracks duplicates across runs
  bersihkan.js           # Removes stale/irrelevant products, normalizes titles
  downloadgambar.js      # Downloads product images
hasil/                   # Scrape output (gitignored, generated at runtime)
  YYYY-MM-DD HH/          # Per-run snapshot of raw scrape results
  TERBARU/                # Latest merged results per marketplace
  GAMBAR/                 # Downloaded product images
```

## Prerequisites

- Node.js and npm
- Google Chrome installed at the default location for your OS:
  - macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- A Chrome user data directory the app can reuse (paths are currently hardcoded per machine in `scraper.js` — update them to match your local user profile path)

## Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/dimasab/scraper-ecommerce.git
   cd scraper-ecommerce
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm start      # node scraper.js
   npm run dev    # nodemon scraper.js (auto-restart on change)
   ```

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/scrapesemua` | Runs the full pipeline: kill running Chrome instances, scrape all four marketplaces, dedupe, clean up stale products, and download images. Optional `?hanyaecommerce=` query param to target a single marketplace. |
| `GET` | `/bersihkanproduk` | Runs only the cleanup step against the existing `TERBARU` result files. |
| `GET` | `/downloadgambar` | Runs only the image download step against the existing `TERBARU` result files. |

## Notes

- Search targets (products/brands/price ranges) are defined as URL lists inside each `fungsi/*.js` scraper — edit those arrays to change what gets scraped.
- Scrape output under `hasil/` is git-ignored; only the folder structure is kept in version control.
- Email notification credentials are currently hardcoded in `scraper.js` — consider moving them to `.env` before deploying anywhere shared.
