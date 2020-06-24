import React from "react"

import { useStaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const About = () => {
  const {
    site: {
      siteMetadata: { description },
    },
  } = useStaticQuery(graphql`
    query MyDescription {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  return (
    <S.AboutWrapper
      dangerouslySetInnerHTML={{ __html: description }}
    ></S.AboutWrapper>
  )
}

export default About
