import { Form, Input } from 'antd';

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    return (
        <>
            <Form.Item
                label="Name"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount />
            </Form.Item>
        </>
    );
};
