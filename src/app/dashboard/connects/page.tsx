"use client";
import LifeButton from '@/components/ui/lgButton';
import { DataTable } from '@/screens/connects/data-table';
import ProfileFormContent from '@/screens/connects/modal/ProfileFormContent';
import React, { useState, useEffect } from 'react';
import { columns, Connected } from '@/screens/connects/column';

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



export default async function HomeRoute() {
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
        <div className="grid grid-cols-1 lg:grid-cols gap-4 px-10 py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}