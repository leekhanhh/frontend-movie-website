import React, { useEffect } from "react";
import { updateCategory } from "../../../actions/categoryAction";
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

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CategoryEditForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({
        name: props.data.name,
        description: props.data.description,
      });
    }
  }, [form, props.data]);

  const onFinish = (values) => {
    const category = {
      name: values.name,
      description: values.description,
      id: props.data.id,
      ordering: 0,
    };
    dispatch(updateCategory(category));
    props.toggleEdit();
    props.onLoading();
  };

  const onReset = () => {
    form.resetFields();
    props.toggleEdit();
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
      {/* Category Name */}
      <Form.Item
        name="name"
        label="Category name"
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

export default CategoryEditForm;