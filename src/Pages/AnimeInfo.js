import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";

import YoutubeTrailer from "../Components/YoutubeTrailer";
import Description from "../Components/AnimeInfo/Description";
import Score from "../Components/AnimeInfo/Score";
import Genres from "../Components/AnimeInfo/Genres";
import Tags from "../Components/AnimeInfo/Tags";

import "../scss/animeInfo.scss";

function AnimeInfo() {
	const {id} = useParams();
	const [siteData, setSiteData] = useState(null);

	const query = `
	query media($id:Int, $type:MediaType) {
		Media (id: $id, type: $type) {
			id
			type
			format
			genres
			tags {
        name
        description
        category
        rank
        isMediaSpoiler
      }
			trailer {
				id
			}
			studios(isMain: true) {
        nodes {
          name
          siteUrl
        }
      }
			staff(sort: [RELEVANCE, ROLE, FAVOURITES]) {
        edges{
          node {
            siteUrl
            name {
              native
              userPreferred
            }
          }
          role
        }
      }
			stats {
        scoreDistribution {
          score
          amount
      	}
        statusDistribution {
          status
          amount
        }
      }
			popularity
			meanScore
			rankings {
        rank
        type
        allTime
      }
			title {
				romaji
				english
				native
				userPreferred
			}
			characterPreview:characters(perPage:12,sort:[ROLE,RELEVANCE,ID]) {
        edges {
          id 
          role 
          voiceActors(language:JAPANESE,sort:[RELEVANCE,ID]) {
            id 
            name {
              userPreferred
            }
            language:languageV2 
            image {
              large
            }
          }
          node {
            id 
            name {
              userPreferred }
            image {
              large
            }
          }
        }
      }
			relations {
        edges {
          id 
          relationType(version:2)
          node {
            id 
            title {
              userPreferred
            }
            format 
            type 
            status(version:2)
            bannerImage 
            coverImage {
              large
							medium
            }
          }
        }
      }
			bannerImage
			coverImage {
				extraLarge
			}
			description
			season
			startDate {
        year
      }
			endDate {
				year
			}
		}
	}`;

	const variables = {
		"id": id
	}

	useEffect(() => {
		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables
			})
			.then(({data: {data}}) => {
				setSiteData(data.Media);
				document.title = data.Media?.title?.english || data.Media?.title?.userPreferred
			});
	}, [id]);

	if(!siteData) return null;
	return (
		<div className="animeInfoBody" key={siteData?.id}>
			<div className="banner">
				<img src={siteData.bannerImage} key={siteData?.id}></img>
			</div>
			<div className="info">
				<div className="container">
					<div className="left">
						<a className="coverImage" href={`https://anilist.co/${siteData.type?.toLowerCase()}/${siteData?.id}`}>
							<img src={siteData?.coverImage?.extraLarge} key={siteData?.id}></img>
						</a>
						{siteData?.genres?.length && (<Genres genres={siteData?.genres} />)}
						{siteData?.tags?.length && (<Tags tags={siteData?.tags} />)}
					</div>

					<div className="right">
						<Score siteData={siteData}/>
						<Description title={siteData.title} description={siteData.description} />

						<YoutubeTrailer videoID={siteData?.trailer?.id} />

						<div className="relations">{siteData?.relations?.edges.map(data => (
							<div className="relation" key={data.id}>
								<img src={data.node.coverImage.large}></img>
								<p>{data.node.title.userPreferred}</p>
								<p>{data.relationType}</p>
							</div>
						))}</div>
						<div className="characters">{siteData?.characterPreview?.edges.map(data => (
							<div className="character" key={data.id}>
								<img src={data.node.image.large}></img>
								<p>{data.node.name.userPreferred}</p>
								<p>{data.role}</p>
							</div>
						))}</div>
					</div>
				</div>

				
			</div>
		</div>
	)
}

export default AnimeInfo;