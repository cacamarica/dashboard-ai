import { NextResponse } from 'next/server';
import { n8nService } from '@/services/n8nService';

export async function GET() {
  try {
    // Fetch from Supabase database via n8nService
    const data = await n8nService.fetchReorderAlerts();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in reorder API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reorder alerts' },
      { status: 500 }
    );
  }
}
