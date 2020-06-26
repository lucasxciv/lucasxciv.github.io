import React from "react"
import presentations from "./content"

import * as S from "./styled"

const Presentations = () => (
  <S.ListWrapper>
    {presentations.map((presentation, i) => (
      <S.Link
        href={presentation.url}
        target="_blank"
        rel="noopener noreferrer"
        key={i}
      >
        <S.Item>
          <S.Title>{presentation.title}</S.Title>
          <S.Date>{presentation.date}</S.Date>
        </S.Item>
      </S.Link>
    ))}
  </S.ListWrapper>
)

export default Presentations
