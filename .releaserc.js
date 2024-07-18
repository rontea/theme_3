module.exports = {
    branches: [
      'main',
      { name: 'next', prerelease: false }
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      ...(process.env.NPM_PUBLISH === 'true' ? ['@semantic-release/npm'] : []),
      '@semantic-release/github',
      '@semantic-release/git'
    ]
};