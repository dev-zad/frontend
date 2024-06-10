"use client";
import { columns, Connected } from "./column"
import { DataTable } from "./data-table"
import React, { useEffect, useState } from 'react';

async function getData(): Promise<Connected[]> {
  try {
    const response = await fetch('/api/messages');
    if (!response.ok) {
      throw new Error('Failed to fetch connects');
    }
    const responseData = await response.json();
    const data = responseData.map((item: any) => item.attributes); // Extract data from "attributes" property
    return data;
  } catch (error) {
    console.error('Error fetching connects:', error);
    return [];
  }
}


export default function AdminPage() {
  const [data, setData] = useState<Connected[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const connects = await getData();
        setData(connects);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full">
      <main className="flex-1 bg-gray-100 w-full">
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
