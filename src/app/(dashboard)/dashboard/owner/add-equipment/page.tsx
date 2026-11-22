import AddService from '@/components/dashboard/owner/AddService';
import React from 'react';

const OwnerAddEquipmentPage = () => {
    return (
        <div className='flex gap-3 items-center m-10'>
            <p>{`To add your equipment click "Add Equipment" Button`}</p>
            <AddService />
            
        </div>
    );
};

export default OwnerAddEquipmentPage;