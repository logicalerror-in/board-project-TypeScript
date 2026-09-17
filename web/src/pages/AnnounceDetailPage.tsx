import {Link, useLoaderData} from "react-router";
import type {announceLoader} from "../router/announceLoader.ts";

const AnnounceDetailPage = () => {
  const announcement = useLoaderData<typeof announceLoader>();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-xl font-bold">
          공지사항 상세
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          API: GET
          /api/announcements/:announcementId
        </p>
      </div>

      <article className="mt-5 rounded-xl border border-slate-200 p-5">
        <p className="text-sm text-slate-500">
          #{announcement.id}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {announcement.title}
        </h3>

        <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
          {announcement.content}
        </p>

        <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-700">
              생성일
            </dt>
            <dd>
              {announcement.createdAt}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700">
              수정일
            </dt>
            <dd>
              {announcement.updatedAt}
            </dd>
          </div>
        </dl>

        <Link
          to="/announcements"
          className="mt-6 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          공지 목록으로
        </Link>
      </article>
    </section>
  );
};

export default AnnounceDetailPage;