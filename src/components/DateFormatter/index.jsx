import { Space, Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import * as dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const DateFormatter = ({ data }) => {
    let dateElement;
    if (data != null) {
        dateElement = (
            <Space>
                <span>{dayjs(data).format('DD/MM/YYYY')}</span>
                <Tooltip title={dayjs(data).format('LLLL')}>
                    <span>
                        <ClockCircleOutlined />
                    </span>
                </Tooltip>
            </Space>
        );
    } else {
        dateElement = <></>;
    }
    return <>{dateElement}</>;
};

export default DateFormatter;
