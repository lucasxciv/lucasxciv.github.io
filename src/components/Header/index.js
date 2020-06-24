import React from "react"

import Profile from "../Profile"
import MenuLinks from "../MenuLinks"

import * as S from "./styled"

const Header = () => (
  <S.Header>
    <S.HeaderWrapper>
      <Profile />
      <MenuLinks />
    </S.HeaderWrapper>
  </S.Header>
)

export default Header
