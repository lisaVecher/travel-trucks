import { API_BASE_URL, CAMPERS_PER_PAGE } from "@/lib/constants";

import type {
  BookingRequest,
  BookingResponse,
  CamperDetails,
  CamperFilters,
  CamperListResponse,
  FiltersResponse,
  Review,
} from "@/types/camper";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function hasErrorMessage(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  );
}

async function sendRequest(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    cache: options.cache ?? "no-store",
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody: unknown = await response.json();

      if (hasErrorMessage(errorBody)) {
        message = errorBody.message;
      }
    } catch {
      // Якщо сервер повернув не JSON, використовується стандартне повідомлення.
    }

    throw new ApiError(message, response.status);
  }

  return response;
}

async function requestJson<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await sendRequest(path, options);

  if (response.status === 204) {
    throw new ApiError(
      "API returned no content, but JSON was expected",
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("API returned invalid JSON", 502);
  }
}

function getCamperPath(camperId: string): string {
  const normalizedId = camperId.trim();

  if (!normalizedId) {
    throw new TypeError("Camper ID cannot be empty");
  }

  return `/campers/${encodeURIComponent(normalizedId)}`;
}

export async function getCampers(
  page: number,
  filters: CamperFilters,
): Promise<CamperListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(page));
  searchParams.set("perPage", String(CAMPERS_PER_PAGE));

  const location = filters.location.trim();

  if (location) {
    searchParams.set("location", location);
  }

  if (filters.form) {
    searchParams.set("form", filters.form);
  }

  if (filters.engine) {
    searchParams.set("engine", filters.engine);
  }

  if (filters.transmission) {
    searchParams.set("transmission", filters.transmission);
  }

  return requestJson<CamperListResponse>(`/campers?${searchParams.toString()}`);
}

export async function getAvailableFilters(): Promise<FiltersResponse> {
  return requestJson<FiltersResponse>("/campers/filters");
}

export async function getCamper(camperId: string): Promise<CamperDetails> {
  return requestJson<CamperDetails>(getCamperPath(camperId));
}

export async function getCamperReviews(camperId: string): Promise<Review[]> {
  return requestJson<Review[]>(`${getCamperPath(camperId)}/reviews`);
}

export async function createBookingRequest(
  camperId: string,
  data: BookingRequest,
): Promise<BookingResponse> {
  return requestJson<BookingResponse>(
    `${getCamperPath(camperId)}/booking-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
}
