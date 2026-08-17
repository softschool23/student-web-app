const allowedImageHostnameSuffix = ".infosoftschoole.workers.dev";
const allowedImagePathPrefixes = ["/softschool-academics/", "/school/"];

const isAllowedImageUrl = (url: URL): boolean => {
  const isAllowedHostname =
    url.hostname === "infosoftschoole.workers.dev" ||
    url.hostname.endsWith(allowedImageHostnameSuffix);
  const isAllowedPath = allowedImagePathPrefixes.some((pathPrefix) =>
    url.pathname.startsWith(pathPrefix),
  );

  return (
    url.protocol === "https:" &&
    !url.username &&
    !url.password &&
    !url.port &&
    isAllowedHostname &&
    isAllowedPath
  );
};

const parseImageUrl = (value: string | null): URL | null => {
  if (!value) return null;

  try {
    const url = new URL(value);
    return isAllowedImageUrl(url) ? url : null;
  } catch {
    return null;
  }
};

export const GET = async (request: Request): Promise<Response> => {
  const imageUrl = parseImageUrl(new URL(request.url).searchParams.get("url"));

  if (!imageUrl) {
    return Response.json({ message: "Invalid image URL." }, { status: 400 });
  }

  try {
    const imageResponse = await fetch(imageUrl, {
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    const contentType = imageResponse.headers.get("content-type");

    if (
      !imageResponse.ok ||
      !contentType ||
      !contentType.toLowerCase().startsWith("image/")
    ) {
      return Response.json(
        { message: "Unable to retrieve the image." },
        { status: 502 },
      );
    }

    return new Response(imageResponse.body, {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      { message: "Unable to retrieve the image." },
      { status: 502 },
    );
  }
};
