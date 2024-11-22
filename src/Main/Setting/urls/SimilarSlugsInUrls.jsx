import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../components/CommonTable";
import {
  Button,
  Flex,
  Form,
  Modal,
  notification,
  Select,
  Typography,
} from "antd";
import {
  addSimilarSlugByUrls,
  getSimilarSlugByUrlId,
} from "../../../Toolkit/Slices/LeadUrlSlice";
const { Text } = Typography;

const SimilarSlugsInUrls = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const similarSlugList = useSelector(
    (state) => state.leadurls.similarSlugList
  );
  const { allUrlList } = useSelector((prev) => prev?.leadurls);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "name",
      title: "Name",
    },
  ];

  const handleFinish = useCallback(
    (values) => {
      values.id = data?.id;
      dispatch(addSimilarSlugByUrls(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Urls added in similar slug" });
            dispatch(getSimilarSlugByUrlId(data?.id));
            setOpenModal(false);
            form.resetFields();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [data, dispatch, form]
  );

  return (
    <>
      <Flex justify="space-between">
        <Text>Url name : {data?.urlsName}</Text>
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Add similar slugs
        </Button>
      </Flex>
      <CommonTable
        columns={columns}
        data={similarSlugList}
        scroll={{ y: 480 }}
      />
      <Modal
        title="Add similar urls"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Select urls"
            name="urlSlugIds"
            rules={[{ required: true, message: "please select urls" }]}
          >
            <Select
              mode="multiple"
              options={allUrlList?.map((item) => ({
                label: item?.urlsName,
                value: item?.id,
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SimilarSlugsInUrls;
