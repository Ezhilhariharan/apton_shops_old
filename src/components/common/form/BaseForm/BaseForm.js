import React from 'react';
import { Form } from 'antd';
export const BaseForm = ({ onFinishFailed, layout = 'vertical', ...props }) => {
    const onFinishFailedDefault = (error) => {
        console.log(error.errorFields[0].errors)
    }
    return <Form onFinishFailed={onFinishFailed || onFinishFailedDefault} layout={layout} {...props}/>;
};
