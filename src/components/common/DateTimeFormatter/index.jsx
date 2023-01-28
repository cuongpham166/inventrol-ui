import { Space, Tooltip, Typography } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import * as dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const { Text } = Typography;
const DateTimeFormatter = ({ data }) => {
    let dateElement;
    if (data != null) {
        dateElement = (
            <Space direction="vertical" size={0}>
                <Text>{dayjs().to(dayjs(data))}</Text>
                <Text type="secondary">{dayjs(data).format('LLLL')}</Text>
            </Space>

            /*<Space>
                <span>{dayjs().to(dayjs(data))}</span>
                <Tooltip title={dayjs(data).format('LLLL')}>
                    <span>
                        <ClockCircleFilled />
                    </span>
                </Tooltip>
            </Space>*/
        );
    } else {
        dateElement = <></>;
    }
    return <>{dateElement}</>;
};

export default DateTimeFormatter;
