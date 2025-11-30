import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

const API_BASE = process.env.TUZI_API_BASE ?? "https://api.tu-zi.com/v1";
const IMAGE_MODEL =
  process.env.TUZI_IMAGE_MODEL ?? "gemini-3-pro-image-preview";

export async function POST(request: Request) {
  if (!process.env.TUZI_API_KEY) {
    return NextResponse.json(
      { error: "缺少 TUZI_API_KEY，无法调用 Nano Banana 接口" },
      { status: 500 },
    );
  }

  const { prompt, referenceImage } = await request.json().catch(() => ({}));

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "请求参数缺少 prompt" },
      { status: 400 },
    );
  }

  try {
    const response = referenceImage
      ? await callEditEndpoint(prompt, referenceImage)
      : await callGenerateEndpoint(prompt);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "Nano Banana 接口调用失败",
          details: errorText,
        },
        { status: response.status },
      );
    }

    const json = (await response.json()) as {
      data?: Array<{ url?: string; b64_json?: string }>;
    };

    const firstResult = json?.data?.[0];

    if (!firstResult?.url && !firstResult?.b64_json) {
      return NextResponse.json(
        { error: "API 未返回有效的图片数据" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: firstResult.url ?? null,
      base64: firstResult.b64_json ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "调用 Nano Banana 接口时出现异常",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

async function callGenerateEndpoint(prompt: string) {
  return fetch(`${API_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TUZI_API_KEY}`,
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      response_format: "url",
    }),
  });
}

async function callEditEndpoint(prompt: string, dataUrl: string) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    throw new Error("参考图片格式错误，无法解析 Base64 数据");
  }

  const formData = new FormData();
  formData.append("model", IMAGE_MODEL);
  formData.append("prompt", prompt);
  formData.append(
    "image",
    new Blob([parsed.buffer], { type: parsed.mimeType }),
    `reference.${parsed.extension}`,
  );

  return fetch(`${API_BASE}/images/edits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TUZI_API_KEY}`,
    },
    body: formData,
  });
}

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!match) return null;

  const mimeType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");
  const extension = mimeType.split("/")[1] ?? "png";

  return { buffer, mimeType, extension };
}

