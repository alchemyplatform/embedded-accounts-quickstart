import { getChain } from "@alchemy/aa-core";
import { NextResponse } from "next/server";

// [!region chains-route]
export async function POST(req: Request) {
  const id = req.url?.split("/").pop();

  const chain = getChain(parseInt(id as string));
  if (!chain) {
    return new NextResponse(`Chain not found: ${chain}`, {
      status: 404,
    });
  }
  const rpcUrl = chain.rpcUrls.alchemy.http[0];

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return new NextResponse("ALCHEMY_API_KEY is not set", {
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
      const errorResult = await apiResponse
        .json()
        .catch(() => ({ message: "Failed to fetch data" }));
      return NextResponse.json(errorResult);
    }

    const result = await apiResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse("Server error occurred", {
      status: 500,
    });
  }
}
// [!endregion chains-route]
