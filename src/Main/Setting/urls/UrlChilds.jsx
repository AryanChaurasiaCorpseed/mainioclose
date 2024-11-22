import { Drawer, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SlugsInUrls from "./SlugsInUrls";
import SimilarSlugsInUrls from "./SimilarSlugsInUrls";
import { useDispatch } from "react-redux";
import { getChildSlugBySlugId, getSimilarSlugByUrlId } from "../../../Toolkit/Slices/LeadUrlSlice";

const UrlChilds = ({ children, data }) => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);


  const handleClick = useCallback(() => {
    dispatch(getChildSlugBySlugId(data?.id));
    dispatch(getSimilarSlugByUrlId(data?.id));
    setOpenDrawer(true);
  }, [dispatch, data]);
  return (
    <>
      <Link className="link-heading" onClick={handleClick}>
        {children}
      </Link>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        closeIcon={false}
        width={"70%"}
      >
        <Tabs
          items={[
            { label: "Slugs", key: "slugs", children: <SlugsInUrls data={data} /> },
            {
              label: "Similar Slugs",
              key: "similarSlugs",
              children: <SimilarSlugsInUrls data={data} />,
            },
          ]}
        />
      </Drawer>
    </>
  );
};

export default UrlChilds;
