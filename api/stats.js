// api/stats.js
export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    // Basic public profile (works even without token, but token improves rate limits)
    const userResp = await fetch(`https://api.github.com/users/${username}`, {
      headers: token
        ? { Authorization: `token ${token}`, 'User-Agent': 'github-wrapped' }
        : { 'User-Agent': 'github-wrapped' }
    });

    if (!userResp.ok) {
      return res.status(userResp.status).json({ error: 'User not found or private' });
    }

    const user = await userResp.json();

    // Fetch public repos (pagination: first page only for now; can extend later)
    const reposResp = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: token
          ? { Authorization: `token ${token}`, 'User-Agent': 'github-wrapped' }
          : { 'User-Agent': 'github-wrapped' }
      }
    );

    const repos = await reposResp.json();

    // Aggregate languages and top repos
    const languageTotals = {};
    const publicRepos = Array.isArray(repos) ? repos : [];

    publicRepos.forEach((repo) => {
      if (repo.language) {
        languageTotals[repo.language] = (languageTotals[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const topRepos = publicRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        stars: r.stargazers_count,
        html_url: r.html_url,
        language: r.language
      }));

    res.status(200).json({
      username: user.login,
      avatar_url: user.avatar_url,
      name: user.name,
      followers: user.followers,
      public_repos: user.public_repos,
      year: new Date().getFullYear(),
      topLanguages,
      topRepos
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
