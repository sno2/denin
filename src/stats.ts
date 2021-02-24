import { API_URL, HEADERS } from "./_utils/const.ts";
import { DataResponse } from "./_utils/base.ts";

export interface RecentlyAdded {
  name: string;
  description: string;
  // deno-lint-ignore camelcase
  star_count: number;
  // deno-lint-ignore camelcase
  created_at: Date;
}

export interface RecentlyUploaded {
  name: string;
  version: string;
  // deno-lint-ignore camelcase
  created_at: Date;
}

export interface StatsData extends DataResponse {
  data: {
    // deno-lint-ignore camelcase
    total_count: number;
    // deno-lint-ignore camelcase
    total_versions: number;
    // deno-lint-ignore camelcase
    recently_added_modules: RecentlyAdded[];
    // deno-lint-ignore camelcase
    recently_uploaded_versions: RecentlyUploaded[];
  };
}

/**
 * Fetchs the latest stats from https://api.deno.land/stats.
 * 
 * @param init The `RequestInit` to use when fetching.
 */
export async function fetchStats(
  init?: RequestInit,
): Promise<StatsData> {
  const res = await fetch(
    `${API_URL}/stats`,
    {
      ...init,
      method: "GET",
      headers: HEADERS,
    },
  );
  return await res.json() as StatsData;
}
