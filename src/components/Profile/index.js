import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import getThemeColor from "../../utils/getThemeColor"

import Avatar from "../Avatar"
import * as S from "./styled"

const Profile = () => {
  const {
    site: {
      siteMetadata: { title, position, description },
    },
  } = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
          position
          description
        }
      }
    }
  `)

  return (
    <S.ProfilerWrapper>
      <S.ProfileLink
        cover
        direction="left"
        bg={getThemeColor()}
        duration={0.6}
        to="/"
      >
        <Avatar />
        <S.ProfileAuthor>
          {title}
          <S.ProfilePosition>{position}</S.ProfilePosition>
        </S.ProfileAuthor>
      </S.ProfileLink>
      <S.ProfileDescription>{description}</S.ProfileDescription>
    </S.ProfilerWrapper>
  )
}

export default Profile
