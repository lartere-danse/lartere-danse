// vendors
/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { css } from "@emotion/react"

// components
import Layout from "../components/Layout"
import TextColumns from "../components/TextColumns/TextColumns"
import wrapper from "../utils/wrapper"
import { graphql } from "gatsby"
import Calendar from "../components/Calendar"
import { between } from "polished"
import mediaQuery from "../utils/media-query"
import getWeeklyDateBetweenDate from "../utils/getWeeklyDateBetweenDate"
import SEO from "../components/Seo/Seo"
import ActivitySection from "../views/ActivitySection"

import dateStillAvailable from "../utils/datesStillAvailable"
import EventTargetAudienceLegend from "../components/EventTargetAudienceLegend"

const getClosestDate = (dates = []) => {
  return dates.reduce(
    (acc, cur) => (Date.parse(acc.from) < Date.parse(cur.from) ? acc : cur),
    {}
  )
}

const ActivitesPage = ({ data }) => {
  const activites = data.activites.group.reduce(
    (acc, cur) => [...acc, ...cur.nodes],
    []
  )

  const activityTypes = (data.activityTypes.edges || []).map(({ node }) => node)

  const getActivitesByTypeSlug = (slug) => {
    const activitiesGroupedBySlug =
      (data.activites.group.find(({ fieldValue }) => slug === fieldValue) || [])
        .nodes || []

    const activitiesWithCustomDate = activitiesGroupedBySlug.filter(
      ({ date }) => date.filter((d) => d._type === "customEvent").length > 0
    )

    const activitiesWithDate = activitiesGroupedBySlug
      .filter(({ date }) => dateStillAvailable(date))
      .sort((a, b) => {
        const closestA = getClosestDate(a.date)
        const closestB = getClosestDate(b.date)

        return Date.parse(closestA.from) - Date.parse(closestB.from)
      })

    return [...activitiesWithDate, ...activitiesWithCustomDate]
  }

  const calendarEvents = activites.reduce((acc, cur) => {
    const stillActive = dateStillAvailable(cur.date)

    const slug = cur.slug ? cur.slug.current : ""

    const link = stillActive ? `/activites#${slug}` : `/archives/${slug}`

    const dates = cur.date
      .filter((date) => date._type !== "customEvent")
      .reduce((datesAcc, date) => {
        const { day = [] } = date
        return [
          ...datesAcc,
          ...getWeeklyDateBetweenDate(date.from, date.to, day),
        ]
      }, [])
      .map((date) => {
        return {
          slug,
          link,
          title: cur.title,
          date,
          targetAudience: cur.targetAudience,
        }
      })

    // if (cur.eventType.name === "Stages intensifs") {
    //   console.log(dates.length === 0)
    //   // console.log(cur.eventType.name === "Stages intensifs")
    // }

    if (dates.length === 0) {
      // console.log(cur.date)
    }
    return [...acc, ...dates]
  }, [])

  return (
    <Layout>
      <SEO
        title="Activités"
        description="Consultez le calendrier complet des activités de L’Artère, art de la danse et du mouvement : Stages intensifs, Classes de maître, Ateliers de création, Sorties d’ateliers, SIA ╱ Session d’improvisation de L’Artère, Lieux communs, Causeries ╱ 5 à 7."
      />
      <article
        css={css`
          ${wrapper.bolt()}
        `}
      >
        <VisuallyHidden>
          <h1>Activités</h1>
        </VisuallyHidden>

        <section id="intro">
          <TextColumns className="h3 color-orange">
            <p className="prevent-column-break">
              Tout·e acteur·rice du milieu est essentiel·le au
              dévelop&shy;pement de l’art de la danse et du mouvement à Québec,
              car il·elle fait partie intégrante de celui-ci. L’investissement
              et l’inspiration insufflés dans la pratique de chaque artiste sur
              le territoire a des retombées notoires sur la vitalité de tout un
              milieu.
            </p>

            <p className="prevent-column-break">
              Toutes ces formations offertes par L’Artère permettent à nos
              artistes de briller dans leur parcours individuel et stimulent les
              échanges au sein et à l’extérieur du milieu de l’art de la danse
              et du mouvement de Québec.
            </p>
          </TextColumns>

          <div className="h3">
            <p>
              Calendrier des activités
              {/* pour les{" "}
              <span className="color-orange">
                professionnel·le·s des arts de la danse et du mouvement.
              </span> */}
            </p>

            {/* <p>
              Activités ouvertes aux{" "}
              <span className="color-canary">
                bougeur·se·s expérimenté·e·s (cirque, arts martiaux, danse,
                etc.)
              </span>{" "}
              <span className="color-pale-cerulean">
                aux artistes des arts de la scène (théâtre, musique,
                performance, cinéma),
              </span>{" "}
              <span className="color-grey">et au le grand public</span>.
            </p> */}
          </div>

          <EventTargetAudienceLegend />

          <Calendar switcher events={calendarEvents} />

          <nav>
            <ul
              className="h2"
              css={css`
                max-width: 1340px;
                list-style: none;
                padding: 0;

                li {
                  font-size: ${between("25px", "96px", "375px", "1920px")};
                  margin-bottom: ${between("12.5px", "0px", "375px", "1920px")};

                  :last-child {
                    margin-bottom: 0;
                  }

                  ${mediaQuery.greaterThen(1920)} {
                    font-size: 96px;
                    margin-bottom: 0px;
                  }
                }

                a {
                  text-decoration: none;
                }
              `}
            >
              {activityTypes.map(({ name, slug: { current }, alwaysOn }) => {
                return (
                  (alwaysOn || getActivitesByTypeSlug(current).length > 0) && (
                    <li key={current}>
                      <a href={`#${current}`}>{name}</a>
                    </li>
                  )
                )
              })}
            </ul>
          </nav>
        </section>

        <div>
          {activityTypes.map(
            ({
              name,
              slug: { current },
              alwaysOn,
              _rawDescription,
              display,
              order,
            }) =>
              (alwaysOn || getActivitesByTypeSlug(current).length > 0) && (
                <ActivitySection
                  activities={getActivitesByTypeSlug(current)}
                  description={_rawDescription}
                  title={name}
                  id={current}
                  grid={display === "grid"}
                  sortOrder={order}
                  key={current}
                />
              )
          )}
        </div>
      </article>
    </Layout>
  )
}

export default ActivitesPage

export const query = graphql`
  query ActivitesPageQuery {
    activityTypes: allSanityEventType(sort: { fields: order, order: ASC }) {
      edges {
        node {
          name
          order
          alwaysOn
          display
          _rawDescription
          slug {
            current
          }
        }
      }
    }

    activites: allSanityEvent {
      group(field: eventType___slug___current) {
        fieldValue
        totalCount
        nodes {
          eventType {
            name
            slug {
              current
            }
            order
          }
          slug {
            current
          }
          targetAudience
          title
          _rawDescription
          _rawAdditionalInformation
          featuredImage {
            alt
            asset {
              url
              gatsbyImageData(width: 480)
            }
            hotspot {
              x
              y
            }
          }
          date {
            ... on SanityDaily {
              _key
              _type
              from
              to
              fromTime {
                hour
                minute
              }
              toTime {
                hour
                minute
              }
            }
            ... on SanitySingleEvent {
              _key
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
              _key
              _type
              from
              day
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
            ... on SanityCustomEvent {
              _key
              _type
              _rawCustomDate
            }
          }
          venue {
            city
            local
            name
            street
            zip
          }
          rate {
            ... on SanityFree {
              voluntaryContribution
              _type
            }
            ... on SanityRegularRate {
              _type
              amount
              by
              member
            }
          }
          registration {
            ... on SanityRegistrationEmail {
              _type
              email
            }
            ... on SanityRegistrationLink {
              _type
              url
            }
          }
        }
      }
    }
  }
`
