import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Upload } from "antd";
import { useDispatch } from "react-redux";
import { clientAxios } from "../../../config/axios.config";
import { InboxOutlined } from "@ant-design/icons";
import { updateActor } from "../../../actions/actorAction";

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ActorEditForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [imageFilePath, setImageFilePath] = useState("");
  const [tempImageFilePath, setTempImageFilePath] = useState("");
  const [progress, setProgress] = useState(0);
  const [accountID, setAccountID] = useState(null);

  useEffect(() => {
    if (props.data) {
      setAccountID(props.data.id);
      setImageFilePath(props.data.image);
      setTempImageFilePath(props.data.image);
      form.setFieldsValue({
        name: props.data.name,
        filmCharacter: props.data.filmCharacter,
        UploadAvatar: props.data.image,
      });
    }
  }, [form, props.data]);

  const onFinish = (values) => {
    const actor = {
      name: values.name,
      filmCharacter: values.filmCharacter,
      image: imageFilePath,
      kind: 1,
      id: props.data.id,
    };
    dispatch(updateActor(actor));
    props.toggleEdit();
    props.onLoading();

    // updateActor(actor)
  };
  const onReset = () => {
    form.resetFields();
    props.toggleEdit();
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    // Check if the file is an image file
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      onError({ err: new Error("The uploaded file is not an image file") });
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
    fmData.append("type", "image");
    try {
      const res = await clientAxios.post(
        "/v1/file/upload-file/s3",
        fmData,
        config
      );
      onSuccess("Ok");
      console.log("server res: ", res);
      setImageFilePath(res.data.data.filePath);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err: new Error("An error occurred during the image upload") });
    }
  };


  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  const handleOnChangeImage = () => {
    setImageFilePath("");
  };

  const handleOnCancelImage = () => {
    setImageFilePath(tempImageFilePath);
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
      {/* Name */}
      <Form.Item
        name="name"
        label="Name Actor's"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* film Character*/}
      <Form.Item
        name="filmCharacter"
        label="Firm Character"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="UploadAvatar" label="Upload Avatar">
        {imageFilePath && (
          <div>
            <img
              src={imageFilePath}
              style={{
                backgroundColor: "#C7C8CC",
                width: 350,
                height: 200,
                padding: 8,
                borderRadius: 12,
                objectFit: "fit",
              }}
            />
            <div className="flex justify-end px-3">
              <Button
                type="primary"
                style={{ marginTop: 6 }}
                onClick={handleOnChangeImage}
              >
                Change Image
              </Button>
            </div>
          </div>
        )}
        {!imageFilePath && (
          <div className="flex gap-4 items-center">
            <Upload
              accept="image/*"
              customRequest={uploadImage}
              onChange={handleOnChange}
              onPreview={handlePreview}
              listType="picture-card"
              defaultFileList={defaultFileList}
              className="image-upload-grid"
            >
              {defaultFileList.length >= 1 ? null : <div>Upload Image</div>}
            </Upload>
            <div>
              <Button type="primary" onClick={handleOnCancelImage} danger>
                Cancel
              </Button>
            </div>
          </div>
        )}
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
export default ActorEditForm;
