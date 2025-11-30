"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VIEW_ANGLES } from "@/features/object6Views/angles";

interface AngleResult {
  status: "idle" | "loading" | "success" | "error";
  url?: string;
  error?: string;
}

const DEFAULT_DESCRIPTION =
  "现代极简风格的双人沙发，浅灰色布艺面料，搭配细长的金属脚，整体线条流畅且富有高级感。";

const SAMPLE_PROMPTS = [
  "融入轻奢金属装饰的奶油风沙发",
  "北欧原木脚、浅米色布艺、带圆角扶手的沙发",
  "科技感强、具备几何切面的未来主义座椅",
];

export default function ObjectSixViewsPage() {
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, AngleResult>>(
    () =>
      VIEW_ANGLES.reduce(
        (prev, angle) => ({
          ...prev,
          [angle.id]: { status: "idle" },
        }),
        {} as Record<string, AngleResult>,
      ),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState("");

  const angleCompletionCount = useMemo(
    () =>
      Object.values(results).filter((res) => res.status === "success").length,
    [results],
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImage(reader.result?.toString() ?? null);
    };
    reader.readAsDataURL(file);
  };

  const resetResults = () => {
    setResults(
      VIEW_ANGLES.reduce(
        (prev, angle) => ({
          ...prev,
          [angle.id]: { status: "idle" },
        }),
        {} as Record<string, AngleResult>,
      ),
    );
    setProgressText("");
  };

  const generateForAngles = async () => {
    if (!description.trim()) {
      setProgressText("请输入物体描述后再尝试生成～");
      return;
    }
    resetResults();
    setIsGenerating(true);
    setProgressText("正在调用 Nano Banana 模型生成 6 个视角...");

    for (const angle of VIEW_ANGLES) {
      setResults((prev) => ({
        ...prev,
        [angle.id]: { status: "loading" },
      }));
      setProgressText(`正在生成 ${angle.title} ...`);

      const prompt = `${description.trim()}

${angle.promptHint}

请确保生成的是 ${angle.title}，背景保持干净简洁，画面分辨率不少于 1024px。`;

      try {
        const response = await fetch("/api/nano-banana/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, referenceImage }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = (await response.json()) as {
          url: string | null;
          base64: string | null;
          error?: string;
        };

        if (data.error) {
          throw new Error(data.error);
        }

        const imageUrl =
          data.url ??
          (data.base64 ? `data:image/png;base64,${data.base64}` : null);

        if (!imageUrl) {
          throw new Error("API 未返回图片 URL 或 base64 数据");
        }

        setResults((prev) => ({
          ...prev,
          [angle.id]: { status: "success", url: imageUrl },
        }));
      } catch (error) {
        setResults((prev) => ({
          ...prev,
          [angle.id]: {
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "生成失败，请稍后重试",
          },
        }));
      }
    }

    setIsGenerating(false);
    setProgressText("全部视角生成完成 ✅");
  };

  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-white px-6 py-10 shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-5">
              <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Object · 6 Views
              </p>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  物体 6 视图 · Nano Banana 生成实验室
                </h1>
                <p className="mt-4 text-slate-500">
                  使用你提供的物体描述（或示例），自动调用 Nano Banana
                  模型生成前、后、左、右、上、下六个视角的图像，帮助快速完成产品或家具建模参考。
                </p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                <Stat label="模型" value="nano-banana-2" />
                <Stat label="分辨率" value="≥ 1024px" />
                <Stat label="完成数量" value={`${angleCompletionCount} / 6`} />
              </dl>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-900/90 px-6 py-6 text-white shadow-lg">
              <p className="text-sm font-semibold text-white/70">
                环境变量校验
              </p>
              <EnvBadge
                label="TUZI_API_KEY"
                valid={false}
                helper="请在 .env.local 中配置后端可用的 API Key"
              />
              <EnvBadge
                label="TUZI_API_BASE"
                valid
                helper="默认为 https://api.tu-zi.com/v1，可按需覆盖"
              />
              <EnvBadge
                label="TUZI_IMAGE_MODEL"
                valid
                helper="默认使用 gemini-3-pro-image-preview"
              />
              <Link
                href="/"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                返回首页
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                  描述区
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  物体特点 & 提示词
                </h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300"
                onClick={() => setDescription(DEFAULT_DESCRIPTION)}
              >
                恢复默认
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="text-sm font-medium text-slate-600">
                描述你希望生成的物体
              </label>
              <textarea
                className="h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="例：柔和米白色的现代沙发，带木质脚和轻盈的靠背..."
              />

              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setDescription(prompt)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  上传参考图片（可选）
                </label>
                <p className="text-xs text-slate-400">
                  上传后会一并发送给 Nano Banana 的 Image Edit 接口，作为生成 6
                  个视角的参考素材。
                </p>
                {!referenceImage ? (
                  <p className="text-xs text-amber-600">
                    未上传时将仅根据文字描述生成，结果可能与目标物体不一致。
                  </p>
                ) : null}
                <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-center text-slate-500 transition hover:border-sky-400 hover:bg-slate-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-8 w-8 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V8.25M3 8.25a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V10.5M3 8.25l5.159 4.721a2.25 2.25 0 0 0 2.978 0L15 9m3 3 3 3m0 0-3 3m3-3h-9"
                    />
                  </svg>
                  <span className="mt-3 text-sm font-medium text-slate-600">
                    点击上传或拖拽图片
                  </span>
                  <span className="text-xs text-slate-400">
                    支持 PNG / JPG，不超过 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {referenceImage ? (
                <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  <Image
                    src={referenceImage}
                    alt="参考图片"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => setReferenceImage(null)}
                    className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    移除
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    提示
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    未来版本将支持将参考图发送给 Nano Banana
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    包括指示图像编辑（Edit
                    API）与参考图建模。当前版本聚焦文本描述 → 六视角生成。
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={generateForAngles}
                disabled={isGenerating}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "生成中..." : "开始生成 6 视图"}
              </button>
              <button
                type="button"
                onClick={resetResults}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400"
              >
                重置
              </button>
              <p className="text-sm text-slate-500">{progressText}</p>
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              角度提示库
            </p>
            <h2 className="mt-2 text-2xl font-semibold">生成策略</h2>
            <p className="mt-3 text-sm text-white/70">
              每个视角都会额外拼接一条提示词以强化角度指令，亦可根据项目需求自定义。
            </p>
            <ul className="mt-6 space-y-4">
              {VIEW_ANGLES.map((angle) => (
                <li
                  key={angle.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {angle.title}
                  </p>
                  <p className="text-xs text-white/60">{angle.subtitle}</p>
                  <p className="mt-3 text-xs text-white/70">{angle.promptHint}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                结果展示
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                6 视图生成结果
              </h2>
              <p className="text-sm text-slate-500">
                每张图片生成时间约 5~10 秒，若有失败可单独重试。
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300"
              onClick={generateForAngles}
              disabled={isGenerating}
            >
              {isGenerating ? "生成中..." : "重新生成全部"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VIEW_ANGLES.map((angle) => {
              const result = results[angle.id];
              return (
                <div
                  key={angle.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50"
                >
                  <div className="relative h-60 w-full bg-slate-100">
                    {result?.status === "success" && result.url ? (
                      <Image
                        src={result.url}
                        alt={angle.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : result?.status === "loading" ? (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        正在生成...
                      </div>
                    ) : result?.status === "error" ? (
                      <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-sm text-rose-500">
                        <span>生成失败</span>
                        <span className="mt-1 text-xs text-rose-400">
                          {result.error}
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        待生成
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                      {angle.id}
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {angle.title}
                    </p>
                    <p className="text-sm text-slate-500">{angle.subtitle}</p>
                    <button
                      type="button"
                      className="mt-3 text-sm font-semibold text-sky-600"
                      onClick={() => regenerateAngle(angle.id)}
                      disabled={isGenerating}
                    >
                      {result?.status === "loading"
                        ? "生成中..."
                        : "单独重试"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );

  async function regenerateAngle(angleId: string) {
    const angle = VIEW_ANGLES.find((item) => item.id === angleId);
    if (!angle) return;

    setResults((prev) => ({
      ...prev,
      [angleId]: { status: "loading" },
    }));
    setProgressText(`正在单独生成 ${angle.title} ...`);

    const prompt = `${description.trim()}

${angle.promptHint}

请确保生成的是 ${angle.title}，背景保持干净简洁，画面分辨率不少于 1024px。`;

    try {
      const response = await fetch("/api/nano-banana/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, referenceImage }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as {
        url: string | null;
        base64: string | null;
        error?: string;
      };

      if (data.error) {
        throw new Error(data.error);
      }

      const imageUrl =
        data.url ?? (data.base64 ? `data:image/png;base64,${data.base64}` : null);

      if (!imageUrl) {
        throw new Error("API 未返回图片 URL 或 base64 数据");
      }

      setResults((prev) => ({
        ...prev,
        [angleId]: { status: "success", url: imageUrl },
      }));
      setProgressText(`${angle.title} 生成完成 ✅`);
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [angleId]: {
          status: "error",
          error:
            error instanceof Error ? error.message : "生成失败，请稍后重试",
        },
      }));
      setProgressText(`${angle.title} 生成失败 ❌`);
    }
  }
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function EnvBadge({
  label,
  valid,
  helper,
}: {
  label: string;
  valid: boolean;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
      <div className="flex items-center justify-between gap-2 text-sm font-semibold">
        <span>{label}</span>
        <span
          className={`h-2 w-2 rounded-full ${
            valid ? "bg-emerald-400" : "bg-rose-400"
          }`}
        />
      </div>
      {helper ? (
        <p className="mt-1 text-xs text-white/70">{helper}</p>
      ) : null}
    </div>
  );
}

