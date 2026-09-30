import {type ActionFunctionArgs, redirect} from "react-router";
import type {LoginRequest} from "../types/auth.ts";
import {login} from "../api/authApi.ts";
import {store} from "../store/store.ts";
import {setUser} from "../store/authSlice.ts";

export type LoginActionData = {
  message: string | null;
};

export const loginAction = async ({request}: ActionFunctionArgs): Promise<LoginActionData | Response> => {
  const formData = await request.formData();

  const idValue = formData.get('id');
  const passwordValue = formData.get('password');

  const loginRequest: LoginRequest = {
    id:
      typeof idValue === 'string'
        ? idValue.trim()
        : '',
    password:
      typeof passwordValue === 'string'
        ? passwordValue.trim()
        : '',
  };

  if (loginRequest.id === '' || loginRequest.password === '') {
    return {
      message: '아이디와 비밀번호를 입력해주세요.',
    };
  }

  try {
    const user = await login(loginRequest);

    store.dispatch(setUser(user));

    return redirect(`/posts`);
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : '로그인에 실패했습니다.',
    }
  }

};