import { getChain } from "@alchemy/aa-core";

export async function POST(req: Request) {
  const id = req.url?.split("/").pop();

  const chain = getChain(parseInt(id as string));
  if (!chain) {
    return new Response(`Chain not found: ${chain}`, {
      status: 404,
    });
  }
  const rpcUrl = chain.rpcUrls.alchemy.http[0];

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return new Response("ALCHEMY_API_KEY is not set", {
      status: 500,
    });
  }

  const body = await req.json();

  try {
    const apiResponse = await fetch(`${rpcUrl}/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorResult = await apiResponse.json().catch(() => ({ message: "Failed to fetch data" }));
      return Response.json(errorResult);
    }

    const result = await apiResponse.json();
    return Response.json(result);
  } catch (error) {
    return new Response("Server error occurred", {
      status: 500,
    });
  }
}
