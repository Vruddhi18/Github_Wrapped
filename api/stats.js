export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = req.query.username;
    
    if (!token) {
      return res.status(401).json({ error: 'GITHUB_TOKEN missing from .env/Vercel' });
    }
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'GitHub-Wrapped/1.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `User not found or private` });
    }

    const user = await response.json();
    
    res.status(200).json({
      username: user.login,
      totalRepos: user.public_repos,
      followers: user.followers,
      year: new Date().getFullYear()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
