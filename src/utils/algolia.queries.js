const PostQuery = `{
  posts: allMarkdownRemark(
    sort: { fields: frontmatter___date, order: DESC }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          background
          category
          date_timestamp: date
          date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
          description
          title
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    date_timestamp: parseInt(
      (new Date(frontmatter.date_timestamp).getTime() / 1000).toFixed(0)
    ),
    ...rest,
  }))

const queries = [
  {
    query: PostQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: "Posts",
    settings: {
      attributesToSnippet: ["excerpt:20"],
    },
  },
]

module.exports = queries
