function App() {

  return (
    <>
      <main className={"min-h-screen bg-slate-100 text-slate-900"}>
        <section className={"mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-12"}>
          <div className={"rounded-2xl bg-white p-9 shadow-sm ring-1 ring-slate-200"}>
            <p className={"text-sm font-semibold text-blue-600"}>
              Board Project
            </p>

            <h1 className={"mt-3 text-3xl font-bold tracking-tight"}>
              React 게시판 프로젝트 시작
            </h1>

            <p className={"mt-4 text-base leading-7 text-slate-600"}>
              이 화면은 React, TypeScript, Vite, Tailwind CSS 기반으로 실행되는 첫 번째 web 앱입니다.
            </p>

            <div className={"mt-8 grid gap-4 sm:grid-cols-3"}>
              <div className={"rounded-xl border border-slate-200 p-4"}>
                <h2 className={"font-semibold"}>
                  React
                </h2>
                <p className={"mt-2 text-sm text-slate-600"}>
                  state를 기준으로 UI를 렌더링합니다.
                </p>
              </div>

              <div className={"rounded-xl border border-slate-200 p-4"}>
                <h2 className={"font-semibold"}>
                  TypeScript
                </h2>
                <p className={"mt-2 text-sm text-slate-600"}>
                  컴파일 타임에 타입을 검사합니다.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <h2 className="font-semibold">Tailwind</h2>
                <p className="mt-2 text-sm text-slate-600">
                  utility class로 스타일을 구성합니다.
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
