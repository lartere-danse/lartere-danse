// vendors
/** @jsx jsx */
import { graphql } from "gatsby"
import { jsx } from "@emotion/react"
import { css } from "@emotion/react"
import { hideVisually, between } from "polished"

// components
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Calendar from "../components/Calendar"
import EventTargetAudienceLegend from "../components/EventTargetAudienceLegend"

// views
import NewsletterForm from "../views/NewsletterForm"

// utils
import mediaQuery from "../utils/media-query"
import wrapper from "../utils/wrapper"
import dateStillAvailable from "../utils/datesStillAvailable"
import getWeeklyDateBetweenDate from "../utils/getWeeklyDateBetweenDate"

// images
import Cress from "../images/vector-header.svg"

// styles
import { colors } from "../styles/variables"

const now = new Date()
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
const twoMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1)

const IndexPage = ({ data }) => {
  const activites = (data.activites.edges || [])
    .map(({ node }) => node)
    .filter((node) => {
      const oldest = node.date.reduce(
        (acc, cur) => (Date.parse(acc.to) > Date.parse(cur.to) ? acc : cur),
        {}
      )

      return (
        Date.parse(now.getFullYear(), now.getMonth(), 1) < Date.parse(oldest.to)
      )
    })
    .reduce((acc, cur) => {
      const stillActive = dateStillAvailable(cur.date)

      const slug = cur.slug ? cur.slug.current : ""

      const link = stillActive ? `/activites#${slug}` : `/archives/${slug}`
      const dates = cur.date
        .reduce((datesAcc, date) => {
          const { day = [] } = date
          return [
            ...datesAcc,
            ...getWeeklyDateBetweenDate(date.from, date.to, day),
          ]
        }, [])
        .map((date) => {
          return {
            link,
            slug,
            title: cur.title,
            date,
            targetAudience: cur.targetAudience,
          }
        })

      return [...acc, ...dates]
    }, [])

  return (
    <Layout>
      <SEO />

      {/* <section
        css={css`
          position: sticky;
          top: ${between("180px", "428px", "768px", "1920px")};
          z-index: 1;

          background-color: ${colors.PortlandOrange};

          ${mediaQuery.greaterThen(1920)} {
            top: 428px;
          }
        `}
      >
        <div
          css={css`
            ${wrapper.bolt()};
            display: flex;
            justify-content: center;

            padding: 16px;
          `}
        >
          <p
            css={css`
              margin: 0;
              text-align: center;
              color: ${colors.Jet};
            `}
          >
            Campagne de sociofinancement en cours /{" "}
            <a
              href="https://laruchequebec.com/fr/projet/lartere-seclate-depuis-20-ans"
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                &:hover,
                &:focus {
                  color: ${colors.Isabelline};
                }
              `}
            >
              Soutenez L'Artère!
            </a>
          </p>
        </div>
      </section> */}

      <section
        id="intro"
        css={css`
          position: relative;
          z-index: 2;

          background-color: ${colors.Jet};

          // fix z-index for sticky element on safari
          // https://www.scottohara.me/note/2019/03/26/fix-sticky.html
          transform: translate3d(0, 1px, 0);

          &::before {
            margin-top: 0;
            height: 100px;
          }
        `}
      >
        <h2 css={hideVisually}>Introduction</h2>

        <div
          css={css`
            ${wrapper.bolt()}

            display: grid;
            padding-top: ${(135 / 1920) * 100}vw;
            padding-bottom: ${(135 / 1920) * 100}vw;

            ${mediaQuery.greaterThen(475)} {
              grid-template-columns: repeat(2, auto);
            }

            ${mediaQuery.greaterThen(1920)} {
              padding-top: 135px;
              padding-bottom: 135px;
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
                color: ${colors.text};
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
                margin-bottom: 0;
                align-self: end;
              }
            `}
          >
            L’Artère est un organisme à but non lucratif œuvrant à faire
            rayonner l’art de la danse et du mouvement sur le territoire de la
            Capitale-Nationale. Sa mission est de soutenir le dévelop&shy;pement
            artistique et professionnel des artistes en danse en offrant une
            program&shy;mation de formations et de services à la fine pointe de
            la pratique actuelle de l’art de la danse et du mouvement,
            contribuant ainsi à la rétention d’artistes de grand talent sur le
            territoire.
          </p>
        </div>
      </section>

      <section
        css={css`
          position: sticky;
          top: 0;
          z-index: 1;

          background-color: ${colors.PortlandOrange};
        `}
      >
        <h2 css={hideVisually}>S'abonner à l'infolettre de L'Artère</h2>

        <div
          css={css`
            ${wrapper.bolt()}

            padding: ${285 / 33}em 0;
          `}
        >
          <NewsletterForm />
        </div>
      </section>

      <section
        id="activites"
        css={css`
          position: relative;
          z-index: 2;

          background-color: ${colors.Jet};

          // fix z-index for sticky element on safari
          // https://www.scottohara.me/note/2019/03/26/fix-sticky.html
          transform: translate3d(0, 1px, 0);

          &::before {
            margin-top: 0;
            height: 100px;
          }
        `}
      >
        <h2
          className="h3"
          css={css`
            ${wrapper.bolt()}
          `}
        >
          Calendrier des activitées
        </h2>

        <div
          css={css`
            ${wrapper.bolt()}

            > * + * {
              margin-top: 2.5em;
            }
          `}
        >
          <EventTargetAudienceLegend />

          <Calendar
            month={now.getUTCMonth() + 1}
            year={now.getUTCFullYear()}
            events={activites}
          />
          <Calendar
            month={nextMonth.getUTCMonth() + 1}
            year={nextMonth.getUTCFullYear()}
            events={activites}
          />
          <Calendar
            month={twoMonth.getUTCMonth() + 1}
            year={twoMonth.getUTCFullYear()}
            events={activites}
          />
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    activites: allSanityEvent {
      edges {
        node {
          date {
            ... on SanityDaily {
              _type
              from
              to
              fromTime {
                hour
                minute
              }
              toTime {
                minute
                hour
              }
            }
            ... on SanitySingleEvent {
              _type
              from
              fromTime {
                hour
                minute
              }
              to
              toTime {
                hour
                minute
              }
            }
            ... on SanityWeekly {
              _type
              day
              from
              fromTime {
                hour
                minute
              }
              to
              toTime {
                hour
                minute
              }
            }
          }
          slug {
            current
          }
          title
          targetAudience
        }
      }
    }
  }
`
