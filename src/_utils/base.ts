/** The base of every response from https://api.deno.land. */
export interface BaseResponse {
  success: boolean;
}

/** The base of every error response from https://api.deno.land. */
export interface ErrorResponse extends BaseResponse {
  error: string;
}

/** The base of every data response from https://api.deno.land. */
export interface DataResponse extends BaseResponse {
  data: Record<string, unknown>;
}
