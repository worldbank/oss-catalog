import fs from 'fs';
import fetch from 'node-fetch';

// Organizations to fetch repositories from
const ORGANIZATIONS = ['worldbank','dime-worldbank'];

async function fetchReposFromOrg(orgName) {
  let allRepos = [];
  let page = 1;
  let hasMore = true;
  
  console.log(`Fetching repositories from ${orgName}...`);
  
  while (hasMore) {
    const res = await fetch(`https://api.github.com/orgs/${orgName}/repos?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github.mercy-preview+json" }
    });
    if (!res.ok) {
      console.error(`Failed to fetch repositories from ${orgName}: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch repositories from ${orgName}`);
    }
    const data = await res.json();
    allRepos = allRepos.concat(data);
    if (data.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }
  
  console.log(`  Found ${allRepos.length} total repos in ${orgName}`);
  return allRepos;
}

async function fetchAllRepos() {
  // Read existing repos to preserve catalogAddedDate
  let existingRepos = [];
  try {
    const existingData = fs.readFileSync('public/repos.json', 'utf8');
    existingRepos = JSON.parse(existingData);
  } catch (err) {
    console.log('No existing repos.json found, will create new one.');
  }
  
  // Create a map of existing repos by ID with their catalogAddedDate
  const existingRepoMap = new Map();
  existingRepos.forEach(repo => {
    if (repo.id && repo.catalogAddedDate) {
      existingRepoMap.set(repo.id, repo.catalogAddedDate);
    }
  });
  
  // Fetch repos from all organizations
  let allRepos = [];
  for (const org of ORGANIZATIONS) {
    try {
      const orgRepos = await fetchReposFromOrg(org);
      allRepos = allRepos.concat(orgRepos);
    } catch (err) {
      console.error(`Error fetching from ${org}:`, err.message);
      // Continue with other organizations
    }
  }
  
  console.log(`\nTotal repos fetched from all organizations: ${allRepos.length}`);
  
  // Filter for repos with catalog=true custom property
  const catalogRepos = allRepos.filter(repo => {
    return repo.custom_properties && 
           repo.custom_properties.catalog === "true";
  });
  
  console.log(`Repos with catalog=true: ${catalogRepos.length}`);
  
  // Add catalogAddedDate to each repo
  const currentDate = new Date().toISOString();
  let newReposCount = 0;
  
  catalogRepos.forEach(repo => {
    if (existingRepoMap.has(repo.id)) {
      // Preserve existing catalogAddedDate
      repo.catalogAddedDate = existingRepoMap.get(repo.id);
    } else {
      // Add current date for new repos
      repo.catalogAddedDate = currentDate;
      newReposCount++;
      console.log(`  New repo: ${repo.full_name}`);
    }
  });
  
  fs.writeFileSync('public/repos.json', JSON.stringify(catalogRepos, null, 2));
  console.log(`\nSaved ${catalogRepos.length} catalog repos to public/repos.json`);
  console.log(`${newReposCount} new repos added to catalog with catalogAddedDate: ${currentDate}`);
}

fetchAllRepos().catch(err => {
  console.error(err);
  process.exit(1);
});
