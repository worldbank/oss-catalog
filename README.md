# Open Source Code Catalog

A modern web app for browsing, searching, and discovering open source projects in your established GitHub organization. The project is built with Next.js and React. The catalog features summary project cards for each repository, organization statistics, filtering, search and more.

<img width="2560" height="1401" alt="image" src="https://github.com/user-attachments/assets/a8191ca3-6127-490b-9b4b-a5e7fef39be5" />

## 1. Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/worldbank/oss-catalog.git
cd oss-catalog
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

The app is designed to work with GitHub Pages. Run the `nextjs.yml` workflow to deploy to your repository's GitHub Page.

### Static Data

The app sources open source projects using the GitHub API and populates `public/repos.json` with repository data. Update this file with repository data from your GitHub organization.

## 2. Documentation

### Project Structure

- `app/` — Main Next.js app directory
  - `components/` — Reusable React components (Header, Footer, ProjectCard, etc.)
  - `catalog/` — Catalog page with search, filter, and sort features
  - `page.tsx` — Homepage with featured projects and summary statistics
- `public/` — Static assets (images, `repos.json`)
- `package.json` — Project dependencies and scripts

### Features

- **Homepage:** Highlights featured projects, summary statistics, and latest news.
- **Catalog:** Browse all open source projects, filter by language/topic, search, and sort.
- **Easy Customization:** Update `public/repos.json` and images in `public/img/` as needed.

### Customization

- To add or update projects, directly update `public/repos.json` based upon the direct output from the GitHub API: https://api.github.com/orgs/INSERT_ORG_HERE/repos. You may also update `scripts/fetch_repos.js` to point to the correct GitHub organization, then run the `update-repos.yml` workflow to update `public/repos.json` manually or on a set schedule.
- To change branding or images, update files in `public/img/`.

## License
This project is licensed under the MIT License together with the [World Bank IGO Rider](https://github.com/worldbank/.github/blob/main/WB-IGO-RIDER.md). The Rider is purely procedural: it reserves all privileges and immunities enjoyed by the World Bank, without adding restrictions to the MIT permissions. Please review both files before using, distributing or contributing.
