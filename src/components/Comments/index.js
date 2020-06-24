import React from "react"
import ReactDisqusComments from "react-disqus-comments"
import propTypes from "prop-types"

import * as S from "./styled"

const Comments = ({ url, title }) => {
  const completeURL = `https://deoliveiralucas.net${url}`

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comments</S.CommentsTitle>
      <ReactDisqusComments
        shortname="deoliveiralucas"
        identifier={completeURL}
        title={title}
        url={completeURL}
      />
    </S.CommentsWrapper>
  )
}

Comments.propTypes = {
  url: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
}

export default Comments
