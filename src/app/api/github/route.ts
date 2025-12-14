import { NextRequest, NextResponse } from 'next/server';
import  getGithubData  from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username');
    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const data = await getGithubData(username);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
