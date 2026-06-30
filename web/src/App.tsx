import {useState, useEffect} from "react";

type HealthResponse = {
  status: "ok";
};

type ApiState<T> =
  | {
  status: "loading";
}
  | {
  status: "success";
  data: T;
}
  | {
  status: "error";
  message: string;
};

const isRecord = function (value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
};

const isHealthResponse = function (value: unknown): value is HealthResponse {
  return isRecord(value) && value.status === "ok";
};


const App = function () {

  const [healthState, setHealthState] = useState<ApiState<HealthResponse>>({
    status: "loading",
  });

  useEffect(() => {
    let ignore = false;

    const fetchHealth = async function () {
      try {
        const response = await fetch("/api/health");

        if (!response.ok) {
          throw new Error(`Health check failed. status: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!isHealthResponse(data)) {
          throw new Error("Health response shape is invalid.");
        }

        if (!ignore) {
          setHealthState({
            status: "success",
            data,
          });
        }
      } catch (error) {
        if (!ignore) {
          setHealthState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unknown health check error",
          });
        }
      }
    }

    void fetchHealth();

    return () => {
      ignore = true;
    };

  }, []);

  return (
    <>
      <main className={"min-h-screen bg-slate-100 text-slate-900"}>
        <section className={"mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-12"}>
          <div className={"rounded-2xl bg-white p-9 shadow-sm ring-1 ring-slate-200"}>
            <p className={"text-sm font-semibold text-blue-600"}>
              Board Project
            </p>

            <h1 className={"mt-3 text-3xl font-bold tracking-tight"}>
              React와 NestJS 연결 시작
            </h1>

            <p className={"mt-4 text-base leading-7 text-slate-600"}>
              이 화면은 React에서 NestJS health API를 호출하고, 그 결과를 React state로 관리하는 첫 번째 연결 예제입니다.
            </p>

            <section className={"mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5"}>
              <h2 className={"text-lg font-semibold"}>
                API 연결 상태
              </h2>

              {healthState.status === "loading" && (
                <p className={"mt-3 text-sm text-slate-600"}>
                  API 서버 상태를 확인하는 중입니다.
                </p>
              )}

              {healthState.status === "success" && (
                <div className={"mt-3 rounded-lg border border-green-200 bg-green-50 p-4"}>
                  <p className={"text-sm font-medium text-green-800"}>
                    API 연결 성공
                  </p>
                  <p className={"mt-1 text-sm text-gray-700"}>
                    서버 응답 상태: {healthState.data.status}
                  </p>
                </div>
              )}

              {healthState.status === "error" && (
                <div className={"mt-3 rounded-lg border border-red-200 bg-red-50 p-4"}>
                  <p className={"text-sm font-medium text-red-800"}>
                    API 연결 실패
                  </p>
                  <p className={"mt-1 text-sm text-red-700"}>
                    {healthState.message}
                  </p>
                </div>
              )}

            </section>

            <div className={"mt-8 grid gap-4 sm:grid-cols-3"}>
              <div className={"rounded-xl border border-slate-200 p-4"}>
                <h2 className={"font-semibold"}>
                  React
                </h2>
                <p className={"mt-2 text-sm text-slate-600"}>
                  API 결과를 state로 저장하고 다시 렌더링합니다.
                </p>
              </div>

              <div className={"rounded-xl border border-slate-200 p-4"}>
                <h2 className={"font-semibold"}>
                  fetch
                </h2>
                <p className={"mt-2 text-sm text-slate-600"}>
                  브라우저 표준 API로 HTTP request를 보냅니다.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <h2 className="font-semibold">
                  NestJS
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Controller가 HTTP request를 받아 JSON을 반환합니다.
                </p>
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}

export default App
