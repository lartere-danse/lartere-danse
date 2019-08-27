// vendors
import React from "react"
import { css } from "@emotion/core"
import VisuallyHidden from "@reach/visually-hidden"

// components
import Layout from "../components/Layout"
import SEO from "../components/Seo"

import Cress from "../images/vector-header.svg"
import Logo from "../images/logo-lartere.svg"
import IconFacebook from "../images/icon-facebook.svg"
import { colors } from "../styles/variables"
import mediaQuery from "../utils/media-query"
import wrapper from "../utils/wrapper"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />

    <div
      css={css`
        ${wrapper.bolt()}
        display: grid;
        margin-top: ${(135 / 1920) * 100}vw;
        margin-bottom: ${(135 / 1920) * 100}vw;

        ${mediaQuery.greaterThen(475)} {
          grid-template-columns: repeat(2, auto);
        }

        ${mediaQuery.greaterThen(1920)} {
          margin-top: 135px;
          margin-bottom: 135px;
        }
      `}
    >
      <img
        src={Cress}
        alt="Logo en forme de A dansant."
        css={css`
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
          margin-bottom: ${(150 / 1920) * 100}vw;

          ${mediaQuery.greaterThen(475)} {
            grid-column: 1 / span 2;
            grid-row: 1 / span 1;
          }

          ${mediaQuery.greaterThen(1920)} {
            margin-bottom: 150px;
          }
        `}
      />

      <h1
        css={css`
          width: ${(1280 / 1920) * 100}vw;
          grid-column: 1 / span 1;
          grid-row: 5 / span 1;
          color: ${colors.PaleCerulean};
          text-transform: uppercase;
          max-width: 1280px;

          ${mediaQuery.greaterThen(475)} {
            grid-column: 1 / span 2;
            grid-row: 4 / span 1;
          }
        `}
      >
        <img
          src={Logo}
          alt="L'artère"
          css={css`
            width: ${876 / 33}rem;
            margin-top: ${(436 / 1920) * 100}vw;

            ${mediaQuery.greaterThen(1920)} {
              margin-top: 436px;
            }
          `}
        />
      </h1>

      <p
        css={css`
          color: ${colors.PortlandOrange};
          font-size: ${122 / 33}em;
          letter-spacing: ${55 / 1000}em;
          grid-column: 1 / span 1;
          grid-row: 2 / span 1;
          text-transform: lowercase;
          margin: 0;

          ${mediaQuery.greaterThen(475)} {
            grid-column: 1 / span 1;
            grid-row: 2 / span 1;
            margin-bottom: ${(378 / 1920) * 100}vw;
          }

          ${mediaQuery.greaterThen(1920)} {
            margin-bottom: 378px;
          }
        `}
      >
        Art de la danse
      </p>
      <p
        css={css`
          color: ${colors.PortlandOrange};
          font-size: ${122 / 33}em;
          letter-spacing: ${55 / 1000}em;
          text-transform: lowercase;
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
          margin-top: 0;
          margin-bottom: ${(378 / 1920) * 100}vw;

          ${mediaQuery.greaterThen(475)} {
            margin-bottom: 0;
            grid-column: 2 / span 1;
            grid-row: 3 / span 1;
            writing-mode: tb;
            writing-mode: sideways-rl;
          }

          ${mediaQuery.greaterThen(1920)} {
            margin-bottom: 378px;
          }
        `}
      >
        {" "}
        Et du mouvement
      </p>

      <p
        className="h3"
        css={css`
          grid-column: 1 / span 1;
          grid-row: 4 / span 1;
          max-width: 1280px;

          ${mediaQuery.greaterThen(475)} {
            width: ${(1280 / 1920) * 100}vw;
            grid-column: 1 / span 1;
            grid-row: 3 / span 1;
            margin-top: 0;
          }
        `}
      >
        L’Artère est un organisme à but non lucratif œuvrant à faire rayonner
        l’art de la danse et du mouvement sur le territoire de la
        Capitale-Nationale. Sa mission est de soutenir le développement
        artistique et professionnel des artistes en danse contemporaine en
        offrant une programmation de stages et de services à la fine pointe de
        la pratique actuelle de l’art de la danse et du mouvement, contribuant
        ainsi à la rétention d’artistes de grand talent sur le territoire.
      </p>

      <div
        css={css`
          grid-column: 1 / span 1;
          grid-row: 6 / span 1;
          display: flex;
          color: ${colors.PortlandOrange};
          font-size: ${21 / 33}rem;
          line-height: ${28 / 21};

          p {
            margin: ${28 / 21}em 0;
          }

          a {
            color: ${colors.PortlandOrange};
            text-decoration: none;
          }

          ${mediaQuery.greaterThen(475)} {
            grid-column: 1 / span 1;
            grid-row: 5 / span 1;
          }
        `}
      >
        <div
          css={css`
            margin-right: ${(150 / 1920) * 100}vw;

            ${mediaQuery.greaterThen(1920)} {
              margin-left: 150px;
            }
          `}
        >
          <a href="https://www.facebook.com/artereQC">
            <img
              src={IconFacebook}
              alt="Lien vers la page facebook de L'artère"
              css={css`
                width: ${37 / 33}rem;
                display: block;
              `}
            />
          </a>
        </div>

        <div>
          <VisuallyHidden>
            <p>Addresse courriels</p>
          </VisuallyHidden>

          <ul
            css={css`
              list-style: none;
              margin: 0;
              padding: 0;
            `}
          >
            <li>
              <a href="mailto:artere@larteredanse.ca">artere@larteredanse.ca</a>
            </li>
            <li>
              <a href="mailto:direction@larteredanse.ca">
                direction@larteredanse.ca
              </a>
            </li>
            <li>
              <a href="mailto:inscription@larteredanse.ca">
                inscription@larteredanse.ca
              </a>
            </li>
          </ul>

          <p css={{ textTransform: `uppercase` }}>
            Téléphone: <a href="tel:+14185231777">418 523-1777</a>
          </p>
        </div>
      </div>

      <address
        css={css`
          font-style: normal;
          grid-column: 1 / span 1;
          grid-row: 7 / span 1;
          color: ${colors.PortlandOrange};
          font-size: ${21 / 33}rem;
          line-height: ${28 / 21};

          margin-left: calc(${(150 / 1920) * 100}vw + ${37 / 33}rem);

          ${mediaQuery.greaterThen(475)} {
            margin-left: 0;
            grid-column: 2 / span 1;
            grid-row: 5 / span 1;
          }

          ${mediaQuery.greaterThen(1920)} {
            margin-left: calc(150px + ${37 / 33}rem);
          }
        `}
      >
        336, rue du roi, suite 120
        <br />
        Québec, QC{"  "}G1K 2W5
      </address>
    </div>
  </Layout>
)

export default IndexPage
