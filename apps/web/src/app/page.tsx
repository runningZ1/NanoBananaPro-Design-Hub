import Image from "next/image";
import Link from "next/link";
import { FEATURES, type Feature } from "@/data/features";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 sm:px-8 lg:px-10">
        <section className="rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 px-8 py-12 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <p className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-sm font-medium tracking-wide">
                全新 Web 版本 · AI 图片编辑专家
              </p>
              <div>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  20+ AI 图片编辑能力，一站式上线 Web
                </h1>
                <p className="mt-4 text-white/80">
                  继承原小程序的设计系统与交互逻辑，基于 Next.js + React
                  构建现代 Web 体验，快速接入真实 AI 服务。
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.miaoda.cn/projects/app-7vrr7h77m70h"
                  className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  查看原小程序
                </a>
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                <StatItem label="核心功能" value="20+" />
                <StatItem label="已接入AI" value="Nano BananaPro" />
                <StatItem label="技术栈" value="Next.js · React · Tailwind" />
              </dl>
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

        <section id="features" className="mt-12 space-y-6">
          <header className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-wider text-sky-600">
              功能矩阵
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  20 个 AI 图片处理入口
                </h2>
                <p className="text-slate-500">
                  UI 与交互源自原小程序，后续可逐步接入各类图像生成/编辑 API。
                </p>
              </div>
              <p className="text-sm text-slate-400">
                数据源：`src/data/features.ts`
              </p>
            </div>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </section>
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
        className={`h-2 w-2 rounded-full ${
          active ? "bg-sky-500 animate-pulse" : "bg-slate-300"
        }`}
      />
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        {feature.exampleImage ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={feature.exampleImage}
              alt={feature.name}
              fill
              className="object-cover transition duration-500 ease-out hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400">
            暂无示例
          </div>
        )}
        {feature.isNew ? (
          <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            New
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {feature.icon.replace("i-mdi-", "").replaceAll("-", " ")}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            {feature.name}
          </h3>
          <p className="text-sm text-slate-500">{feature.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {feature.prompts.slice(0, 2).map((prompt) => (
            <span
              key={prompt}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              {prompt}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-sm">
          {feature.id === "nano-banana" ? (
            <Link
              href="/nano-banana"
              className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              立即体验
            </Link>
          ) : (
            <span className="font-medium text-sky-600">即将上线</span>
          )}
          <span className="text-slate-400">#{feature.id}</span>
        </div>
      </div>
    </article>
  );
}
