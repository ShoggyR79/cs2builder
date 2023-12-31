import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from './loading';
import InventoryColumns from './inventoryColumns';

export const Landing = () => {
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div className="flex justify-center h-screen bg-[#40413c] overflow-hidden">
            {loading && <Loading />}
            <InventoryColumns setLoading={setLoading} id={id}/>
        </div>
    );
};
