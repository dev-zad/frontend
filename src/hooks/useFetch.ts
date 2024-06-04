import { useState, useEffect } from 'react';
import axios from 'axios';

interface HomeData {
    data: {
        attributes: {
            title: string;
            description: string;
            blocks: {
                __component: string;
                id: number;
                heading?: string;
                subHeading?: string;
                image?: {
                    data: {
                        attributes: {
                            url: string;
                        };
                    };
                };
                title?: string;
                description?: string;
                feature?: {
                    id: number;
                    heading: string;
                    subHeading: string;
                    icon: string;
                }[];
            }[];
        };
    };
}

const useFetch = (url: string) => {
    const [data, setData] = useState<HomeData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<HomeData>(url);
                // console.log("Fetched Data:", response.data);
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, isLoading };
};

export default useFetch;
