import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      style={{ color: "var(--texts)", marginTop: "20px", textAlign: "center" }}
    >
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness. :(</p>
    </div>
  </Layout>
)

export default NotFoundPage
