import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import About from "../components/About"

import * as S from "../components/ListWrapper/styled"
import Footer from "../components/Footer"

const BlogList = () => (
  <Layout>
    <SEO title="Home" />
    <S.Title>About</S.Title>
    <About />
    <Footer />
  </Layout>
)

export default BlogList
