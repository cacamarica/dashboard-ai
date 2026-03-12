import { NextRequest, NextResponse } from 'next/server';
import { n8nService } from '@/services/n8nService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Fetch from Supabase database via n8nService
    const data = await n8nService.fetchTopMovingMaterials(limit);

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No data available' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in top-moving API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top moving materials' },
      { status: 500 }
    );
  }
}
