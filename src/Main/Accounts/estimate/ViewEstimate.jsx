import { Badge, Button, Card, Divider, Flex, Space, Typography } from "antd";
import dayjs from "dayjs";
import React, { useRef } from "react";
import numWords from "num-words";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import logo from "../../../Images/CORPSEED.webp";
const { Text, Title } = Typography;

const ViewEstimate = () => {
  const pdfRef = useRef();
  const details = useSelector((state) => state.leads.estimateDetail);

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
    pdf.save("estimate.pdf");
  };
  return (
    <>
      <Flex style={{ width: "100%" }} justify="flex-end">
        <Button onClick={generatePDF}>Export as pdf </Button>
      </Flex>
      <Flex
        style={{
          maxHeight: "84vh",
          width:'100%',
          overflow: "auto",
          marginTop: "12px",
          padding: "24px",
        }}
      >
        <Flex style={{ width: "100%" }} gap={24} vertical>
          {details?.productName && (
            <Flex gap={4} align="center">
              <Text className="heading-text">Product name</Text>
              <Text className="heading-text">:</Text>
              <Text>{details?.productName}</Text>
            </Flex>
          )}
          <Flex gap={60}>
            {details?.primaryContact && (
              <Card style={{ width: "100%" }}>
                <Flex vertical gap={12}>
                  <Text className="heading-text">Primary contact detail</Text>
                  <Flex vertical>
                    <Space>
                      <Text type="secondary">Name</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.primaryContact?.name}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Email</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.primaryContact?.emails}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Contact number</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.primaryContact?.contactNo}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Whatsapp number</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.primaryContact?.whatsappNo}</Text>
                    </Space>
                  </Flex>
                </Flex>
              </Card>
            )}

            {details?.secondaryContact && (
              <Card style={{ width: "100%" }}>
                <Flex vertical gap={12}>
                  <Text className="heading-text">Secondary contact detail</Text>
                  <Flex vertical>
                    <Space>
                      <Text type="secondary">Name</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.secondaryContact?.name}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Email</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.secondaryContact?.emails}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Contact number</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.secondaryContact?.contactNo}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary">Whatsapp number</Text>
                      <Text type="secondary">:</Text>
                      <Text>{details?.secondaryContact?.whatsappNo}</Text>
                    </Space>
                  </Flex>
                </Flex>
              </Card>
            )}
          </Flex>
          <Flex ref={pdfRef}>
            <Badge.Ribbon text="Estimate" placement="start" color="green">
              <Flex
                vertical
                style={{
                  padding: "60px",
                  boxShadow:
                    "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                  borderRadius: "4px",
                }}
                gap={24}
              >
                <Flex justify="space-between">
                  <Flex vertical>
                    <Flex>
                      <img src={logo} alt="corpseed" />
                    </Flex>
                    <Flex vertical>
                      {" "}
                      <Text type="secondary">
                        Corpseed Ites Private Limited
                      </Text>
                      <Text>CN U74999UP2018PTC101873</Text>
                      <Text>2nd floor, A-154A, A Block, sector 63</Text>
                      <Text>Noida, Uttar Pradesh - 2013</Text>
                    </Flex>
                  </Flex>
                  <Flex vertical gap={24}>
                    <Flex vertical>
                      <Title style={{ color: "#41d744" }} level={4}>
                        Estimate
                      </Title>
                      <Text strong>{`#ESTD0${details?.id}`}</Text>
                    </Flex>
                    <Flex vertical>
                      <Title style={{ color: "#41d744" }} level={4}>
                        Order No.
                      </Title>
                      <Text strong>{details?.orderNumber}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex vertical>
                  <Text type="secondary">Bill To : </Text>
                  <Flex vertical>
                    {details?.companyName && (
                      <Text style={{ fontWeight: "bold" }}>
                        {details?.companyName}
                      </Text>
                    )}
                    {details?.address && <Text>{details?.address}</Text>}
                    <Flex vertical>
                      <Flex>
                        {details?.city && <Text>{details?.city},</Text>}
                        {details?.state && <Text>{details?.state},</Text>}
                        {details?.country && <Text>{details?.country}</Text>}
                      </Flex>
                    </Flex>
                    {details?.primaryPinCode && (
                      <Text>{details?.primaryPinCode}</Text>
                    )}
                  </Flex>
                </Flex>
                <Flex justify="space-between">
                  <Flex vertical gap={8}>
                    <Text type="secondary">Ship To : </Text>
                    <Flex vertical>
                      {details?.companyName && (
                        <Text>{details?.companyName}</Text>
                      )}
                      <Flex vertical>
                        {details?.secondaryAddress && (
                          <Text>{details?.secondaryAddress}</Text>
                        )}

                        <Flex>
                          {details?.secondaryCity && (
                            <Text>{details?.secondaryCity},</Text>
                          )}
                          {details?.secondaryState && (
                            <Text>{details?.secondaryState},</Text>
                          )}
                          {details?.secondaryCountry && (
                            <Text>{details?.secondaryCountry}</Text>
                          )}
                        </Flex>
                      </Flex>
                      {details?.secondaryPinCode && (
                        <Text>{details?.secondaryPinCode}</Text>
                      )}
                    </Flex>
                  </Flex>
                  <Flex vertical gap={8}>
                    <Flex gap={8}>
                      <Text type="secondary">Estimate Date</Text>
                      <Text type="secondary">:</Text>
                      <Text>
                        {dayjs(details?.estimateDate).format("DD-MM-YYYY")}
                      </Text>
                    </Flex>
                    <Flex gap={8}>
                      <Text type="secondary">Order Date</Text>
                      <Text type="secondary">:</Text>
                      <Text>
                        {dayjs(details?.createDate).format("DD-MM-YYYY")}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex vertical gap={16}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item and description</th>
                        <th>HSN</th>
                        <th>Rate</th>
                        <th>GST %</th>
                        <th>GST amount</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <Text style={{ fontWeight: "bold" }}>
                            {details?.productName}
                          </Text>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      {details?.govermentCode && (
                        <tr>
                          <td></td>
                          <td>Government fee</td>
                          <td>{details?.govermentCode}</td>
                          <td>{""}</td>
                          <td>{details?.govermentGst}</td>
                          <td>{""}</td>
                          <td>{details?.govermentFees}</td>
                        </tr>
                      )}
                      {details?.profesionalCode !== null && (
                        <tr>
                          <td></td>
                          <td>Professional fee</td>
                          <td>{details?.profesionalCode}</td>
                          <td>{""}</td>
                          <td>{details?.profesionalGst}</td>
                          <td>{""}</td>
                          <td>{details?.professionalFees}</td>
                        </tr>
                      )}
                      {details?.serviceCode !== null && (
                        <tr>
                          <td></td>
                          <td>Service fee</td>
                          <td>{details?.serviceCode}</td>
                          <td>{""}</td>
                          <td>{details?.serviceGst}</td>
                          <td>{""}</td>
                          <td>{details?.serviceCharge}</td>
                        </tr>
                      )}
                      {details?.otherCode !== null && (
                        <tr>
                          <td></td>
                          <td>Other fee</td>
                          <td>{details?.otherCode}</td>
                          <td>{""}</td>
                          <td>{details?.otherGst}</td>
                          <td>{""}</td>
                          <td>{details?.otherFees}</td>
                        </tr>
                      )}
                      <tr
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "1px solid black",
                        }}
                      >
                        <td></td>
                        <td>
                          <Text strong>Total Qty. : 1</Text>
                        </td>
                        <td>{""}</td>
                        <td>{""}</td>
                        <td>{""}</td>
                        <td>{""}</td>
                        <td>
                          <Text strong>{details?.totalAmount}</Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {details?.totalAmount > 0 && (
                    <Flex justify="flex-end" gap={4}>
                      <Text type="secondary">Total in words</Text>
                      <Text>:</Text>
                      <Text>{numWords(details?.totalAmount)}</Text>
                    </Flex>
                  )}
                  <Flex vertical>
                    <Text>Text details</Text>
                    <table className="gst-table">
                      <thead>
                        <tr>
                          <th>HSN</th>
                          <th>SGST %</th>
                          <th>CGST %</th>
                          <th>IGST %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details?.profesionalCode !== null && (
                          <tr>
                            <td>{details?.profesionalCode}</td>
                            <td>0.0 %</td>
                            <td>0.0 %</td>
                            <td>{details?.profesionalGst}</td>
                          </tr>
                        )}
                        {details?.serviceCode !== null && (
                          <tr>
                            <td>{details?.serviceCode}</td>
                            <td>0.0 %</td>
                            <td>0.0 %</td>
                            <td>{details?.serviceGst}</td>
                          </tr>
                        )}
                        {details?.govermentCode !== null && (
                          <tr>
                            <td>{details?.govermentCode}</td>
                            <td>0.0 %</td>
                            <td>0.0 %</td>
                            <td>{details?.govermentGst}</td>
                          </tr>
                        )}
                        {details?.otherCode !== null && (
                          <tr>
                            <td>{details?.otherCode}</td>
                            <td>0.0 %</td>
                            <td>0.0 %</td>
                            <td>{details?.otherGst}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Flex>
                </Flex>
                <Flex vertical gap={8}>
                  <Flex vertical gap={6}>
                    <Text strong>Notes :</Text>
                    <Text type="secondary">
                      This Estimate & price quotation is valid for 7 calendar
                      days from the date of issue .
                    </Text>
                    <Text type="secondary">{details?.invoiceNote} </Text>
                    <Text type="secondary">
                      Remark : {details?.getRemarkForOperation}
                    </Text>
                  </Flex>
                  <Divider style={{ margin: "0px 0px" }} />
                  <Flex>
                    <Text type="secondary">
                      Note : Government fee and corpseed professional fee may
                      differ depending on any additional changes advised the
                      client in the application or any changesin government
                      policies.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Badge.Ribbon>
          </Flex>

          <Flex align="center">
            {details?.companyName && (
              <Space>
                <Text type="secondary">companyName</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.companyName}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.createdDate && (
              <Space>
                <Text type="secondary">Created date</Text>
                <Text type="secondary">:</Text>
                <Text>{dayjs(details?.createDate).format("YYYY-MM-DD")}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.unitName && (
              <Space>
                <Text type="secondary">Unit name</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.unitName}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.panNo && (
              <Space>
                <Text type="secondary">Pan no.</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.panNo}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.gstNo && (
              <Space>
                <Text type="secondary">Gst no.</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.panNo}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.companyAge && (
              <Space>
                <Text type="secondary">Company age</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.companyAge}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.invoiceNote && (
              <Space>
                <Text type="secondary">Invoice note</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.invoiceNote}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.address && (
              <Space>
                <Text type="secondary">Address</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.address}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.city && (
              <Space>
                <Text type="secondary">City</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.city}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.state && (
              <Space>
                <Text type="secondary">State</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.state}</Text>
              </Space>
            )}
          </Flex>
          <Flex>
            {details?.country && (
              <Space>
                <Text type="secondary">Country</Text>
                <Text type="secondary">:</Text>
                <Text>{details?.country}</Text>
              </Space>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ViewEstimate;
