export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(401).json({ error: 'No GitHub token provided' });
    }

    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'GitHub-Wrapped'
      }
    });

    const user = await response.json();
    
    res.status(200).json({
      username: user.login,
      totalRepos: user.public_repos,
      followers: user.followers,
      year: new Date().getFullYear()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
