import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.dtb_posts.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const post = await prisma.dtb_posts.create({
      data: {
        content: body.content,
        area_id: body.area_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}