// lib/api/client.ts
class APIClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = process.env.API_URL! || process.env.NEXT_PUBLIC_API_URL!;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN
      } `,
      api_token:
        (process.env.API_TOKEN as string) ||
        (process.env.NEXT_PUBLIC_API_TOKEN as string),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api/${endpoint}`;

    // Start with defaults
    let headers: HeadersInit = { ...this.defaultHeaders, ...options.headers };

    // 🚨 If sending FormData, remove Content-Type (browser will set it with boundary)
    if (options.body instanceof FormData) {
      const { ["Content-Type"]: _, ...rest } = headers as Record<
        string,
        string
      >;
      headers = rest;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", ...options });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    let body: BodyInit | undefined;

    if (data instanceof FormData) {
      body = data;
    } else if (data) {
      body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, {
      method: "POST",
      body,
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    let body: BodyInit | undefined;

    if (data instanceof FormData) {
      body = data;
    } else if (data) {
      body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, {
      method: "PUT",
      body,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", ...options });
  }
}

export const apiClient = new APIClient();
