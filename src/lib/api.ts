import axios from 'axios';
import { getStrapiURL } from './utils';

export const fetchTithesData = async () => {
    try {
        const response = await axios.get(`${getStrapiURL()}/api/tithes`);
        // Transform the data to match the format needed by the chart
        const transformedData = response.data.data.map((item: any) => ({
            label: item.attributes.label,
            value: item.attributes.value,
            date: item.attributes.date || '', // Add the date property with a fallback value
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching tithes data:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchOfferingsData = async () => {
    try {
        const response = await axios.get(`${getStrapiURL()}/api/offerings`);
        // Transform the data to match the format needed by the chart
        const transformedData = response.data.data.map((item: any) => ({
            label: item.attributes.label,
            value: item.attributes.value,
            date: item.attributes.date || '', // Add the date property with a fallback value
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching offerings data:', error.response?.data || error.message);
        throw error;
    }
};
