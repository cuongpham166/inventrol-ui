import React from 'react';
import { Form as AntForm } from 'antd';
const Form = (props) => {
    return <AntForm>{props.formComponents.map((component) => {})}</AntForm>;
};

export default Form;
