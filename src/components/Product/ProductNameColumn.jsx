import { Tag, Typography, Space } from 'antd';
const { Text } = Typography;
const ProductNameColumn = ({ data }) => {
    let text = '';
    data.attributeValue.map((value) => {
        text += value.name;
    });
    return (
        <Space direction="vertical" size={0}>
            <Tag color={data.subcategory.tagColor}>{data.subcategory.name}</Tag>
            <Text>{data.brand.name}</Text>
            <Text strong>{data.name}</Text>
            <Text>{data.barcode}</Text>
            <Text>{text}</Text>
        </Space>
    );
};

export default ProductNameColumn;
