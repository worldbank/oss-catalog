import fs from 'fs';
import fetch from 'node-fetch';

async function fetchAllRepos() {
  let allRepos = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`https://api.github.com/orgs/worldbank/repos?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github.mercy-preview+json" }
    });
    if (!res.ok) throw new Error("Failed to fetch repositories");
    const data = await res.json();
    allRepos = allRepos.concat(data);
    if (data.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }
  
  // Filter for repos with catalog=true custom property
  const catalogRepos = allRepos.filter(repo => {
    return repo.custom_properties && 
           repo.custom_properties.catalog === "true";
  });
  
  fs.writeFileSync('public/repos.json', JSON.stringify(catalogRepos, null, 2));
  console.log(`Saved ${catalogRepos.length} catalog repos (out of ${allRepos.length} total) to public/repos.json`);
}

fetchAllRepos().catch(err => {
  console.error(err);
  process.exit(1);
});
