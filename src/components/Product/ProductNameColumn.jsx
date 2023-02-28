import { Tag, Typography, Space } from 'antd';
const { Text } = Typography;
const ProductNameColumn = ({ data }) => {
    return (
        <Space direction="vertical" size={0}>
            <Tag color={data.subcategory.tagColor}>{data.subcategory.name}</Tag>
            <Text>{data.brand.name}</Text>
            <Text strong>
                {data.name} - {data.attributeValue[0].name}
            </Text>
        </Space>
    );
};

export default ProductNameColumn;
