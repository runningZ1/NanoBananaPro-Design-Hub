import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Feature, type SubCategory, type Category } from "@/data/features";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-16 sm:px-8 lg:px-10">
        <section className="rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 px-8 py-12 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <p className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-sm font-medium tracking-wide">
                全新 Web 版本 · AI 图片编辑专家
              </p>
              <div>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  NanoBananaPro 全能 AI 图片处理
                </h1>
                <p className="mt-4 text-white/80">
                  专业向 · 实用向 · 有趣向 —— 满足全方位图片处理需求
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/nano-banana"
                  className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  开始 AI 图片编辑
                </Link>
              </div>
            </div>
            <div className="flex w-full flex-1 items-center justify-center lg:w-auto">
              <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="rounded-2xl bg-white/90 p-5 text-slate-900 shadow-2xl">
                  <p className="text-sm font-medium text-slate-500">示例提示词</p>
                  <p className="mt-2 text-lg font-semibold">
                    “请分析这张家具图片，从六个角度描述结构与材质。”
                  </p>
                  <div className="mt-6 space-y-3">
                    <PromptSkeleton label="图片上传" />
                    <PromptSkeleton label="AI分析中" active />
                    <PromptSkeleton label="结果流式输出" />
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/20 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 space-y-20">
          {CATEGORIES.map((category) => (
            <section key={category.name} id={category.name} className="space-y-8">
              <header className="space-y-2 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-bold text-slate-900">
                  {category.name}
                </h2>
                <p className="max-w-3xl text-lg text-slate-500">
                  {category.description}
                </p>
              </header>

              <div className="space-y-12">
                {category.subCategories.map((subCategory) => (
                  <div key={subCategory.name} className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                      <span className="h-6 w-1 rounded-full bg-sky-500"></span>
                      {subCategory.name}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {subCategory.features.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 text-white shadow-inner">
      <dt className="text-xs uppercase tracking-[0.2em] text-white/70">
        {label}
      </dt>
      <dd className="mt-2 text-2xl font-semibold">{value}</dd>
    </div>
  );
}

function PromptSkeleton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-2 w-2 rounded-full ${active ? "bg-sky-500 animate-pulse" : "bg-slate-300"
          }`}
      />
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {feature.icon ? (
              <span className={`text-2xl ${feature.icon}`} />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <h4 className="font-semibold text-slate-900 line-clamp-1" title={feature.name}>
              {feature.name}
            </h4>
          </div>
          {feature.isNew && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
              New
            </span>
          )}
        </div>

        {feature.description && (
          <p className="text-xs text-slate-500 line-clamp-2" title={feature.description}>
            {feature.description}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          {feature.comingSoon ? (
            <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-500/10">
              即将上线
            </span>
          ) : (
            <Link
              href={feature.link || "#"}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
            >
              立即体验 &rarr;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

