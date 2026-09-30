import type {AuthUser, LoginRequest} from "../types/auth.ts";

const API_BASE_URL = 'http://localhost:3000/auth';

const isAuthUser = (value: unknown): value is AuthUser => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return ('id' in value && typeof value.id === 'string');
};

export const login = async (request: LoginRequest): Promise<AuthUser> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }

  const data: unknown = await response.json();
  if (!isAuthUser(data)) {
    throw new Error('로그인 응답 형식이 올바르지 않습니다.');
  }

  return data;
};

export const getMe = async (): Promise<AuthUser | null> => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    credentials: 'include',
  });
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error('로그인 사용자 정보를 확인하지 못했습니다.');
  }

  const data: unknown = await response.json();
  if (!isAuthUser(data)) {
    throw new Error('사용자 정보 응답 형식이 올바르지 않습니다.');
  }

  return data;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    return new Error('로그아웃에 실패했습니다.');
  }
};