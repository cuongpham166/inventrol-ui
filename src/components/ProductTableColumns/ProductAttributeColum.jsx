import { Link } from 'react-router-dom';
import { Space, Tag } from 'antd';

const ListElement = ({ data }) => {
    return (
        <>
            <Link to={'/attribute-value/' + data.id} key={data.name}>
                <Tag key={data.id} color={data.attribute.tagColor}>
                    {data.name}
                </Tag>
            </Link>
        </>
    );
};

const ProductAttributeColum = ({ data }) => {
    if (data.length > 1) {
        data.sort((a, b) => {
            return a.attribute.id - b.attribute.id;
        });
    }
    return (
        <>
            {data.map((attr) => {
                return <ListElement data={attr} key={attr.name} />;
            })}
        </>
    );
};

export default ProductAttributeColum;
