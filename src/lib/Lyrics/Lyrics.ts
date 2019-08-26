import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default class Lyrics {
  accessToken: string;
  constructor(accessToken:string) {
    this.accessToken = accessToken;
  }

  private async _request(path:string) {
    const url = `https://api.genius.com/${path}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    // Fetch result and parse it as JSON
    const body = await fetch(url, { headers });
    const result = await body.json();

    // Handle errors
    if (result.error) {
      throw new Error(`${result.error}: ${result.error_description}`);
    }
    if (result.meta.status !== 200) {
      throw new Error(`${result.meta.status}: ${result.meta.message}`);
    }

    return result.response;
  }

  async search(query:string, { page = 1 }) : Promise<SearchResult[]> {
    if (!query) throw new Error("No query was given");

    const response = await this._request(`search?q=${query}&page=${page}`);

    return response.hits.map((hit:any) => hit.result);
  }

  async song(id:number, { fetchLyrics = false, textFormat = "dom" } : { fetchLyrics?: boolean, textFormat: string}) {
    if (!id) throw new Error("No id was given");


    const { song } = await this._request(`songs/${id}?text_format=${textFormat}`);

    const lyrics = fetchLyrics ? await this._scrapeLyrics(song.url) : null;

    return Object.assign({ lyrics }, song);
  }

  private async _scrapeLyrics(url:string) {
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    return $('.lyrics')
      .text()
      .trim();
  }
}

interface SearchResult {
  annotation_count: number;
  api_path: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count?: any;
  song_art_image_thumbnail_url: string;
  stats: {
      hot: boolean;
      unreviewed_annotations: number;
      pageviews: number;
  };
  title: string;
  title_with_featured: string;
  url: string;
  primary_artist: ArtistBrief;
}

interface ArtistBrief {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
}