import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as service from '../../api/services';

const SubcategoryDetail = (props) => {
    const { id } = useParams();

    const dataId = parseInt(id);
    const getResultById = async (dataId) => {
        const result = await service.getById('subcategory', dataId);
        console.log(result);
    };

    useEffect(() => {
        getResultById(dataId);
    }, []);
    return <div>SubcategoryDetail - ID:{id}</div>;
};

export default SubcategoryDetail;
