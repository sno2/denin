import { API_URL, HEADERS } from "./_utils/const.ts";
import { DataResponse, ErrorResposne } from "./_utils/base.ts";

export interface ModuleData extends DataResponse {
  data: {
    name: string;
    description: string;
    // deno-lint-ignore camelcase
    star_count: number;
  };
}

/**
 * Fetch a single module from https://api.deno.land/modules by name.
 * 
 * To search for multiple modules use `fetchModules`.
 * 
 * @param name The name of the module to query.
 * @param init The `RequestInit` to use when fetching.
 */
export async function fetchModule(
  name: string,
  init?: RequestInit,
): Promise<ModuleData | ErrorResposne> {
  const res = await fetch(
    `${API_URL}/modules/${encodeURI(name.trim().replace(/\//g, ""))}`,
    {
      ...init,
      method: "GET",
      headers: HEADERS,
    },
  );
  const json = await res.json();

  if (res.ok) return json as ModuleData;
  else return json as ErrorResposne;
}

///////////////////////////////////////////////////////////////////////////////

export enum Sort {
  Stars = "stars",
  Newest = "newest",
  Oldest = "oldest",
  Random = "random",
  SearchOrder = "search_order",
}

export interface SearchOptions {
  limit: number;
  page: number;
  query?: string;
  sort?: Sort;
}

export interface SearchResult {
  name: string;
  description: string;
  // deno-lint-ignore camelcase
  star_count: number;
  // deno-lint-ignore camelcase
  search_score?: number;
}

export interface ModuleListData extends DataResponse {
  data: {
    // deno-lint-ignore camelcase
    total_count: number;
    options: SearchOptions;
    results: SearchResult[];
  };
}

/**
 * Fetchs multiple modules from https://api.deno.land/modules using the given
 * options.
 * 
 * To search for a single module use `fetchModule`.
 * 
 * @param options The options to use to search for modules.
 * @param init The `RequestInit` to use when fetching.
 */
export async function fetchModules(
  options: SearchOptions,
  init?: RequestInit,
): Promise<ModuleListData | ErrorResposne> {
  const params = new URLSearchParams();

  params.set("limit", `${options.limit}`);
  params.set("page", `${options.page}`);
  if (options.query) params.set("query", `${options.query}`);
  if (options.sort) params.set("sort", `${options.sort}`);

  const res = await fetch(
    `${API_URL}/modules?${params.toString()}`,
    {
      ...init,
      method: "GET",
      headers: HEADERS,
    },
  );
  const json = await res.json();

  if (res.ok) return json as ModuleListData;
  else return json as ErrorResposne;
}
