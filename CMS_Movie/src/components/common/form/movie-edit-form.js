import React, { useEffect, useState } from "react";
import { listGenre, listCategories } from "../../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { clientAxios } from "../../../config/axios.config";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Checkbox,
  Row,
  Col,
  Image,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { updateMovie } from "../../../actions/movieAction";
import { PaperClipOutlined } from "@ant-design/icons";

const { Option } = Select;
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

const MovieEditForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const CategoriesList = useSelector((state) => state.categoryList?.categories);
  const GenreList = useSelector((state) => state.genreList?.genries);

  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [imageFilePath, setImageFilePath] = useState("");
  const [tempImageFilePath, setTempImageFilePath] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [tempVideoPath, setTempVideoPath] = useState("");
  const [selectedGenreMap, setSelectedGenreMap] = useState(null);


  useEffect(() => {
    dispatch(listCategories());
    dispatch(listGenre());
    if (props.data) {
      const selectedGenreIds = props.data.genres.map(
        (genre) => genre.categoryId
      );
      setSelectedCategoryId(props.data.category.id);
      setImageFilePath(props.data.imagePath);
      setTempImageFilePath(props.data.imagePath);
      setVideoPath(props.data.videoGridFs);
      setTempVideoPath(props.data.videoGridFs);
      setSelectedCategoryId(props.data.category.id);
      setSelectedGenres(selectedGenreIds);
      

      form.setFieldsValue({
        category: props.data.category.id,
        genre: selectedGenreIds,
        UploadImage: props.data.imagePath,
        description: props.data.overview,
        price: 10,
        name: props.data.title,
        video: props.data.videoGridFs,
      });
    }
  }, [form, props.data]);

  const onFinish = (values) => {
 
    const movie = {
      categoryId: selectedCategoryId,
      genreListIds: selectedGenres,
      id: props.id,
      imagePath: imageFilePath,
      overview: values.description,
      price: 10,
      title: values.name,
      videoPath: videoPath,
    };
    console.log(movie);
    dispatch(updateMovie(movie));
    props.toggleEdit();
    props.onLoading();
  };

  const onReset = () => {
    form.resetFields();
    props.toggleEdit();
  };

  const onCategoryChange = (value) => {
    setSelectedCategoryId(value);
  };

  const onGenreChange = (checkedValues) => {
    setSelectedGenres(checkedValues);
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

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  

  const handleOnChangeImage = () => {
    setImageFilePath("");
  };

  const handleOnChangeVideo = () =>{
    setVideoPath("");
  }

  const handleCancelChangeImage = () => {
    setImageFilePath(tempImageFilePath);
  };

  const handleCancelChangeVideo = () => {
    setVideoPath(tempVideoPath);
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
        label="Movie name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Category */}
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a category"
          onChange={onCategoryChange}
          allowClear
        >
          {CategoriesList &&
            CategoriesList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      {/* Genre */}
      {selectedCategoryId ? (
        <Form.Item
          name="genre"
          label="Genre"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox.Group
            value={selectedGenres}
            onChange={onGenreChange}
            style={{
              width: "100%",
            }}
          >
            <Row>
              {GenreList &&
                GenreList.map((item) => (
                  <Col span={8} key={item.id}>
                    <Checkbox
                      value={item.id}
                      style={{ lineHeight: "32px" }}
                      checked={selectedGenreMap}
                    >
                      {item.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
      ) : (
        <Form.Item
          name="genre"
          label="Genre"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox.Group
            value={selectedGenres}
            onChange={onGenreChange}
            disabled
            style={{
              width: "100%",
            }}
          >
            <Row>
              {GenreList &&
                GenreList.map((item) => (
                  <Col span={8} key={item.id}>
                    <Checkbox value={item.id} style={{ lineHeight: "32px" }}>
                      {item.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
      )}

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

      <Form.Item name="UploadImage" label="Upload Image">
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
                objectFit: "fill",
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
              <Button type="primary" danger onClick={handleCancelChangeImage}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>

      {
        selectedCategoryId !=1 ? (<Form.Item name="UploadVideo" label="Upload Video">

          <Form.Item
            name="dragger"
            valuePropName="filelist"
            getValueFromEvent={normFile}
            noStyle
          >
            {videoPath ? (
              <div className="w-full p-3 rounded-md bg-[#C7C8CC]  flex  justify-between items-center h-full">
                <div className="flex gap-2">
                  <PaperClipOutlined />
                  <a className="h-full truncate" href={videoPath}>
                    {videoPath.split("/").pop()}
                  </a>
                </div>
  
                <div className="flex justify-end">
                  <Button type="primary" onClick={handleOnChangeVideo}>Change Video</Button>
                </div>
              </div>
            ) : (
              <div>
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
                <div className="flex justify-end mt-3">
                  <Button type="primary" danger onClick={handleCancelChangeVideo}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Form.Item>
        </Form.Item>) : (<div></div>)
      }

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
export default MovieEditForm;
