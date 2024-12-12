import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { divisionName, districtName, branchName, branchCode, password, status } = body;

    // Basic validation
    if (!divisionName || !districtName || !branchName || !branchCode || !password) {
      return NextResponse.json({ errors: 'All fields are required' }, { status: 400 });
    }

    const users = await prisma.branchList.findMany({
      where: {branchCode: branchCode},
   
    });
    if (users) {
      return NextResponse.json({ errors: `Brach Code ${branchCode} already exist`  }, { status: 400 });
    }

    // Save branch data to the database
    const branch = await prisma.branchList.create({
      data: {
        divisionName,
        districtName,
        branchName,
        branchCode,
        password,
        status: status || 'pending', // Default to 'pending' if not provided
      },
    });

    return NextResponse.json({ message: 'Branch added successfully', branch }, { status: 200 });
  } catch (error) {
    console.error('Error adding branch:', error);
    return NextResponse.json({ errors: 'Internal server error' }, { status: 500 });
  }
}
