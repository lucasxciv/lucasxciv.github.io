import React from "react"
import propTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import getThemeColor from "../../utils/getThemeColor"

import * as S from "./styled"

const Pagination = ({ isFirst, isLast, current, numberPages, prev, next }) => (
  <S.PaginationWrapper>
    {!isFirst && (
      <AniLink
        cover
        direction="left"
        bg={getThemeColor()}
        duration={0.6}
        to={prev}
      >
        ← previous page
      </AniLink>
    )}
    <p>
      {current} of {numberPages} pages
    </p>
    {!isLast && (
      <AniLink
        cover
        direction="right"
        bg={getThemeColor()}
        duration={0.6}
        to={next}
      >
        next page →
      </AniLink>
    )}
  </S.PaginationWrapper>
)

Pagination.protoTypes = {
  isFirst: propTypes.bool.isRequired,
  isLast: propTypes.bool.isRequired,
  current: propTypes.number.isRequired,
  numberPages: propTypes.number.isRequired,
  prev: propTypes.string,
  next: propTypes.string,
}

export default Pagination
