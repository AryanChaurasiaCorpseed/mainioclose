import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Select,
  Upload,
  Modal,
  Typography,
  Col,
  Switch,
  Card,
  Space,
  Spin,
  Badge,
  Divider,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { getSingleProductByProductId } from "../../../Toolkit/Slices/ProductSlice";
import {
  editLeadPropposal,
  getAllContactDetails,
  leadProposalSentRequest,
} from "../../../Toolkit/Slices/LeadSlice";
import { createContacts } from "../../../Toolkit/Slices/CommonSlice";
import dayjs from "dayjs";
import "./EstimateDesignPage.scss";
import { maskEmail, maskMobileNumber } from "../../Common/Commons";
import logo from "../../../Images/CORPSEED.webp";
import numWords from "num-words";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box } from "@mui/material";
const { Text, Title } = Typography;

const Proposal = ({ leadid }) => {
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const productList = useSelector((state) => state.product.productData);
  const contactList = useSelector((state) => state?.leads?.allContactList);
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData);
  const companyUnits = useSelector((state) => state?.leads?.companyUnits);
  const details = useSelector((state) => state.leads.proposalDetails);
  const proposalLoading = useSelector((state) => state.leads.proposalLoading);
  const companyDetails = useSelector(
    (state) => state?.leads?.companyDetailsById
  );
  const [productData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProposal, setEditProposal] = useState(false);
  const [productFees, setProductFees] = useState({
    professionalFees: 0,
    serviceCharge: 0,
    otherFees: 0,
    govermentfees: 0,
    profesionalGst: 0,
    serviceGst: 0,
    govermentGst: 0,
    otherGst: 0,
  });

  useEffect(() => {
    if (Object.keys(companyDetails) > 0) {
      form.setFieldsValue({
        companyId: companyDetails?.name,
        isUnit: false,
      });
    }
  }, [companyDetails, form]);

  const handleFinishContact = (values) => {
    dispatch(createContacts(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Contact created successfully !." });
          setOpenModal(false);
          contactForm.resetFields();
          dispatch(getAllContactDetails());
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function getFileName(file) {
    if (file) {
      let temp = file?.split("/");
      return temp[temp?.length - 1];
    }
  }

  const handleGetProduct = (e) => {
    dispatch(getSingleProductByProductId(e)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        setProductData(resp?.payload?.productAmount);
        const data = resp?.payload?.productAmount;
        data?.forEach((item) => {
          if (item?.name === "Government") {
            form.setFieldsValue({
              govermentfees: item?.fees,
              govermentCode: item?.hsnNo,
              govermentGst: item?.taxAmount,
            });
            setProductFees((prev) => ({
              ...prev,
              govermentfees: item?.fees,
              govermentGst: item?.taxAmount,
            }));
          }
          if (item?.name === "Professional fees") {
            form.setFieldsValue({
              professionalFees: item?.fees,
              professionalCode: item?.hsnNo,
              profesionalGst: item?.taxAmount,
            });
            setProductFees((prev) => ({
              ...prev,
              professionalFees: item?.fees,
              profesionalGst: item?.taxAmount,
            }));
          }
          if (item?.name === "Service charges") {
            form.setFieldsValue({
              serviceCharge: item?.fees,
              serviceCode: item?.hsnNo,
              serviceGst: item?.taxAmount,
            });
            setProductFees((prev) => ({
              ...prev,
              serviceCharge: item?.fees,
              serviceGst: item?.taxAmount,
            }));
          }

          if (item?.name === "Other fees") {
            form.setFieldsValue({
              otherFees: item?.fees,
              otherCode: item?.hsnNo,
              otherGst: item?.taxAmount,
            });
            setProductFees((prev) => ({
              ...prev,
              otherFees: item?.fees,
              otherGst: item?.taxAmount,
            }));
          }
        });
      }
    });
  };

  const handleEditProposal = useCallback(() => {
    form.setFieldsValue({
      admin: details?.admin,
      cc: details?.cc,
      companyId: details?.companyId,
      companyName: details?.companyName,
      isUnit: details?.isUnit,
      unitId: details?.unitId,
      unitName: details?.unitName,
      panNo: details?.panNo,
      gstType: details?.gstType,
      companyAge: details?.companyAge,
      gstNo: details?.gstNo,
      gstDocuments: [
        {
          uid: "-1",
          name: getFileName(details?.gstDocuments),
          status: "done",
          response: details?.gstDocuments,
        },
      ],
      salesType: details?.salesType,
      secondaryContact: details?.secondaryContact?.id,
      primaryContact: details?.primaryContact?.id,
      productId: details?.product?.id,
      professionalFees: details?.professionalFees,
      professionalCode: details?.professionalCode,
      profesionalGst: details?.profesionalGst,
      serviceCharge: details?.serviceCharge,
      serviceCode: details?.serviceCode,
      serviceGst: details?.serviceGst,
      govermentfees: details?.govermentfees,
      govermentCode: details?.govermentCode,
      govermentGst: details?.govermentGst,
      otherFees: details?.otherFees,
      otherCode: details?.otherCode,
      otherGst: details?.otherGst,
      assigneeId: details?.assigneeId,
      orderNumber: details?.orderNumber,
      purchaseDate: dayjs(details?.purchaseDate),
      invoiceNote: details?.invoiceNote,
      remarksForOption: details?.getRemarkForOperation,
      address: details?.address,
      city: details?.city,
      state: details?.state,
      country: details?.country,
      primaryPinCode: details?.primaryPinCode,
      secondaryAddress: details?.secondaryAddress,
      secondaryCity: details?.secondaryCity,
      secondaryState: details?.secondaryState,
      secondaryPinCode: details?.secondaryPinCode,
      isConsultant: details?.isConsultant,
      originalCompanyName: details?.consultantByCompany?.name,
      originalContact: details?.consultantByCompany?.originalContact,
      originalEmail: details?.consultantByCompany?.originalEmail,
      originalAddress: details?.consultantByCompany?.address,
    });
    setEditProposal((prev) => !prev);
  }, [details, form]);

  const validateGreaterThanOrEqual = (initialValue) => ({
    validator(_, value) {
      if (value === undefined || value >= initialValue) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(`Value must be greater than or equal to ${initialValue}`)
      );
    },
  });

  const handleFinish = useCallback(
    (values) => {
      values.leadId = leadid;
      values.gstDocuments = values?.gstDocuments?.[0]?.response;
      if (editProposal) {
        values.id = details?.id;
        dispatch(editLeadPropposal(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Proposal updated successfully !.",
              });
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          );
      } else {
        dispatch(leadProposalSentRequest(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Proposal sent successfully !.",
              });
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          );
      }
    },
    [leadid, details, editProposal, dispatch]
  );

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pageHeight = 297;
    let yPosition = 0;

    while (yPosition < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
      if (yPosition + pageHeight < imgHeight) {
        pdf.addPage();
      }
      yPosition += pageHeight;
    }
    pdf.save("proposal.pdf");
  };

  return (
    <Spin size="large" spinning={proposalLoading === "pending" ? true : false}>
      <Box
        style={{
          maxHeight: "84vh",
          overflow: "auto",
          marginTop: "12px",
          padding: "24px",
        }}
      >
        <Box style={{ width: "60%" }} >
          <Box ref={pdfRef}>
            
          </Box>
        </Box>
      </Box>
    </Spin>
  );
};

export default Proposal;
