import React from "react";
import { createCategory } from "../../../actions/categoryAction";
import { Button, Form, Input, Space } from "antd";
import { useDispatch } from "react-redux";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


const GenreRegisterForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const category = {
        name: values.name,
        description: values.description,
        parentID: null,
        kind:1
    }
    dispatch(createCategory(category))
    props.toggleNew()
    props.onLoading()
    
  };
  const onReset = () => {
    form.resetFields();
    props.toggleNew()
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}

      style={{
        maxWidth: 600,
      }}
    >
      {/* Genre Name */}
      <Form.Item
        name="name"
        label="Genre name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Category Description */}
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

        {/* Handle form */}
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default GenreRegisterForm;
