import React, { useCallback, useEffect, useState } from "react";
import CommonTable from "../../../components/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Input, notification, Typography } from "antd";
import {
  getAllUrlAction,
  getChildSlugBySlugId,
  removeSlugFromUrls,
} from "../../../Toolkit/Slices/LeadUrlSlice";
import { Icon } from "@iconify/react";
const { Text } = Typography;

const SlugsInUrls = ({ data, paginationData }) => {
  const dispatch = useDispatch();
  const childSlugList = useSelector((state) => state.leadurls.childSlugList);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(childSlugList);
  }, [childSlugList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = childSlugList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

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

  const handleRemove = useCallback(() => {
    dispatch(
      removeSlugFromUrls({
        name: data?.urlsName,
        urlsId: data?.id,
        urlSlug: selectedRowKeys,
        quality: true,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "URL removed successfully !" });
          dispatch(getChildSlugBySlugId(data?.id));
          dispatch(
            getAllUrlAction({
              page: paginationData?.page,
              size: paginationData?.size,
            })
          );
          setSelectedRowKeys([]);
        } else {
          notification.error({
            message: "Failed to edit the URL. Please try again.",
          });
        }
      })
      .catch((error) =>
        notification.error({
          message: "Failed to edit the URL. Please try again.",
        })
      );
  }, [data, dispatch, selectedRowKeys]);

  return (
    <>
      <Flex justify="space-between">
        <Text>Url name : {data?.urlsName}</Text>
        <Button
          size="small"
          disabled={selectedRowKeys?.length === 0}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </Flex>
      <div className="flex-verti-center-hori-start mt-2">
        <Input
          value={searchText}
          size="small"
          onChange={handleSearch}
          style={{ width: "220px" }}
          placeholder="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      <CommonTable
        columns={columns}
        data={filteredData}
        rowSelection={true}
        rowKey={(row) => row?.id}
        onRowSelection={onSelectChange}
        selectedRowKeys={selectedRowKeys}
        scroll={{ y: 480 }}
      />
    </>
  );
};

export default SlugsInUrls;
