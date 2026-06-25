/* =====================================================================
   Camada de integração com o back-end (cadastro + autenticação).

   Os caminhos dos endpoints e o formato de request/response abaixo são
   PROVISÓRIOS — ajuste conforme o contrato real do back-end quando os
   endpoints forem definidos. A base da API vem da env `VITE_API_URL`
   (ex.: https://api.chsrc.dev). Sem ela, usa "/api" como padrão.
   ===================================================================== */

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

// Ajustar os caminhos conforme o back-end:
const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id?: string;
  name?: string;
  email: string;
};

/** Resposta esperada dos endpoints de auth. Ajustar ao contrato real. */
export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Falha de rede / back-end indisponível.
    throw new ApiError('Não foi possível conectar ao servidor.', 0);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data as { message?: string } | null)?.message ??
      'Ocorreu um erro. Tente novamente.';
    throw new ApiError(message, response.status);
  }

  return data as T;
}

/** Cadastra um novo usuário. */
export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>(ENDPOINTS.register, payload);
}

/** Autentica o usuário e retorna token + dados do usuário. */
export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>(ENDPOINTS.login, payload);
}
