import {Link, useLoaderData} from "react-router";
import type {announceListLoader} from "../router/announceListLoader.ts";

const AnnounceListPage = () => {
  const announcements = useLoaderData<typeof announceListLoader>();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            공지사항
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            API: GET /api/announcements
          </p>
        </div>

        <Link
          to="/announcements/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          공지 작성
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {announcements.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            등록된 공지사항이 없습니다.
          </p>
        )}

        {announcements.map(
          (announcement) => (
            <Link
              key={announcement.id}
              to={`/announcements/${announcement.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
            >
              <p className="text-sm text-slate-500">
                #{announcement.id}
              </p>

              <h3 className="mt-1 font-semibold">
                {announcement.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {announcement.createdAt}
              </p>
            </Link>
          ),
        )}
      </div>
    </section>
  );
};

export default AnnounceListPage;
