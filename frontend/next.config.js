module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:3001/api/graphql',
      },
    ]
  },
}
