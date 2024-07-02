import React, { useEffect, useState } from "react";
import { createEpisode } from "../../../actions/episodeAction";
import { Button, Form, Input, Space, Image, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { clientAxios } from "../../../config/axios.config";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EpisodeRegisterForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [progress, setProgress] = useState(0);
  const [videoPath, setVideoPath] = useState("");

  const onFinish = (values) => {
    const episode = {
      url: videoPath,
      episodeNumber: values.episodeNumber,
      title: values.name,
      description: values.description,
      movieId: props.movieID,
    };
    dispatch(createEpisode(episode));
    props.toggleNew();
    props.onLoading();
  };
  const onReset = () => {
    form.resetFields();
    props.toggleNew();
  };

  const uploadVideo = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    // Check if the file is a video file
    if (!file.type.startsWith("video/")) {
      onError({ err: new Error("The uploaded file is not a video file") });
      return;
    }

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    fmData.append("bandwidth", "1080p");
    try {
      const res = await clientAxios.post(
        "/v1/file/upload-video/s3",
        fmData,
        config
      );
      onSuccess("Ok");
      console.log("server res: ", res);
      setVideoPath(res.data.data.videoPath);
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err: new Error("An error occurred during the video upload") });
    }
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
      {/* Episode Name */}
      <Form.Item
        name="name"
        label="Episode Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Episode Number*/}
      <Form.Item
        name="episodeNumber"
        label="Episode Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      {/* Description */}

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item name="UploadVideo" label="Upload Video">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="video"
            accept="video/*"
            customRequest={uploadVideo}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag video file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload of video files.
            </p>
          </Upload.Dragger>
        </Form.Item>
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
export default EpisodeRegisterForm;
