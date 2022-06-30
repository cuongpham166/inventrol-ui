import React from 'react';
import { useParams } from 'react-router-dom';

const SubcategoryDetail = (props) => {
    const { id } = useParams();
    return <div>SubcategoryDetail - ID:{id}</div>;
};

export default SubcategoryDetail;
