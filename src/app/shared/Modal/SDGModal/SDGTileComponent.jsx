import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Heading from "../..//Heading/HeadingComponent";
import Card from "../../Card/CardComponent";

const NavTile = styled(Card)`
  grid-area: ${props => props.gridarea};

  width: 100%;
  height: 100%;
  padding: 1.5em;
  border-radius: ${props => props.theme.app.border.radius};

  background-color: ${props => props.backgroundColor};
  filter: ${props => (props.disabled ? "grayscale(90%)" : "")};
`;

const NavTileLink = styled(Link)`
  grid-area: ${props => props.gridarea};
  text-decoration: none;
`;

export default ({
  value,
  label,
  color,
  backgroundColor,
  backgroundImg,
  gridArea,
  disabled,
  updateAppInfo,
  submitAppInfo
}) => {
/*  const augmentedLinkTo =
    typeof linkTo === "object"
      ? { ...linkTo, state: { ...linkTo.state, cameFromApp: true } }
      : { pathname: linkTo, state: { cameFromApp: true } }; */
  const [tileClicked, setClicked] = useState(false);

  if (tileClicked) setClicked(false);

  const tileClick = () => {
    setClicked(true)
    submitAppInfo(value, label)
    // submitAppInfo(value, label)
  }

  const Tile = (
    <NavTile
      gridarea={gridArea}
      backgroundColor={backgroundColor}
      backgroundImg={backgroundImg}
      disabled={disabled}
      onClickHandler={() => tileClick()}
    >
    </NavTile>
  );

  return disabled ? (
    Tile
  ) : (
    Tile
  );
};
