import React from 'react';
import TithesAndOfferingsChart from '@/components/TithesAndOffering';

interface TithesProps {
    tithesAndOfferingsData: { label: string; value: number }[];
}

const Tithes: React.FC<TithesProps> = ({ tithesAndOfferingsData }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tithes and Offerings Chart</h1>
            <TithesAndOfferingsChart tithesData={tithesAndOfferingsData} offeringsData={tithesAndOfferingsData} />
        </div>
    );
};

export default Tithes;