import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"
import Pagination from "../components/Pagination"
import About from "../components/About"

import * as S from "../components/ListWrapper/styled"

const BlogList = props => {
  const postList = props.data.allMarkdownRemark.edges

  const { currentPage, numberPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numberPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="Home" />
      <S.Title>About</S.Title>
      <About />
      <S.Title>Posts</S.Title>
      <S.ListWrapper>
        {postList.map(
          (
            {
              node: {
                frontmatter: { date, description, title },
                timeToRead,
                fields: { slug },
              },
            },
            index
          ) => (
            <PostItem
              key={index}
              slug={slug}
              date={date}
              timeToRead={timeToRead.toString()}
              title={title}
              description={description}
            />
          )
        )}
      </S.ListWrapper>
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        current={currentPage}
        numberPages={numberPages}
        prev={prevPage}
        next={nextPage}
      />
    </Layout>
  )
}

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            background
            category
            date(locale: "en", formatString: "MMMM DD[,] YYYY")
            description
            title
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`

export default BlogList
