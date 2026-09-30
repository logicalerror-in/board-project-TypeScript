import {Form, useActionData, useNavigation} from "react-router";
import type {LoginActionData} from "../router/loginAction.ts";

export const LoginPage = () => {
  const actionData = useActionData<LoginActionData>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="mx-auto max-w-md p-6">
      <h2 className="mb-6 text-2xl font-bold">
        로그인
      </h2>

      <Form
        method="post"
        className="space-y-4"
        noValidate
      >
        <div>
          <label
            htmlFor="id"
            className="mb-1 block"
          >
            아이디
          </label>

          <input
            id="id"
            name="id"
            type="text"
            disabled={isSubmitting}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block"
          >
            비밀번호
          </label>

          <input
            id="password"
            name="password"
            type="password"
            disabled={isSubmitting}
            className="w-full rounded border p-2"
          />
        </div>

        {actionData?.message && (
          <p className="text-sm">
            {actionData.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded border px-4 py-2"
        >
          {isSubmitting
            ? "로그인 중..."
            : "로그인"}
        </button>
      </Form>
    </main>
  );
};