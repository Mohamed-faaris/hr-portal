import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EnquiryEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const BRAND_NAME = "Dharvista HR Portal";
const BRAND_TAGLINE = "Connecting Talent with Opportunity";
const BRAND_COLOR = "#1f3f8f";
const LOGO_URL = "https://hr-portal-steel.vercel.app/favicon.jpg";

export const EnquiryEmail = ({
  name,
  email,
  phone,
  subject,
  message,
}: EnquiryEmailProps) => (
  <Html>
    <Head />
    <Preview>New Enquiry: {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={eyebrow}>New Website Enquiry</Text>
          <Img
            src={LOGO_URL}
            alt={BRAND_NAME}
            width="48"
            height="48"
            style={logo}
          />
          <Text style={brandName}>{BRAND_NAME}</Text>
          <Text style={brandTagline}>{BRAND_TAGLINE}</Text>
        </Section>
        <Section style={box}>
          <Text style={heading}>New Enquiry Received</Text>
          <Text style={subheading}>
            A new message has been submitted through the website contact form.
          </Text>
          <Hr style={hr} />
          <Section style={infoBox}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            {phone && (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}
            <Text style={label}>Subject</Text>
            <Text style={valueLast}>{subject}</Text>
          </Section>
          <Text style={label}>Message</Text>
          <Text style={messageStyle}>{message}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            This enquiry was submitted via the {BRAND_NAME} contact form.
          </Text>
        </Section>
        <Section style={footerSection}>
          <Text style={footerBrand}>{BRAND_NAME}</Text>
          <Text style={footerText}>{BRAND_TAGLINE}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EnquiryEmail;

const main = {
  backgroundColor: "#eef2f9",
  fontFamily:
    '"Avenir Next","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
  margin: "0",
  padding: "28px 12px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "640px",
  border: "1px solid #dbe3f3",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
};

const headerSection = {
  backgroundColor: BRAND_COLOR,
  backgroundImage:
    "linear-gradient(135deg, #193878 0%, #1f3f8f 55%, #315bb9 100%)",
  padding: "30px 36px 34px",
  textAlign: "center" as const,
};

const eyebrow = {
  color: "#dbe7ff",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  margin: "0 0 14px 0",
};

const logo = {
  margin: "0 auto 14px auto",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.35)",
};

const brandName = {
  color: "#ffffff",
  fontSize: "27px",
  fontWeight: "700",
  lineHeight: "33px",
  margin: "0 0 6px 0",
};

const brandTagline = {
  color: "#d6e3ff",
  fontSize: "13px",
  margin: "0",
};

const box = {
  padding: "34px 36px 30px",
};

const hr = {
  borderColor: "#e5e9f3",
  margin: "22px 0",
};

const heading = {
  color: "#111f45",
  fontSize: "26px",
  fontWeight: "700",
  lineHeight: "32px",
  margin: "0 0 6px 0",
  padding: "0",
};

const subheading = {
  color: "#4f5f82",
  fontSize: "15px",
  lineHeight: "23px",
  margin: "0",
};

const infoBox = {
  backgroundColor: "#f8fafe",
  border: "1px solid #e0e8f8",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "22px",
};

const label = {
  color: "#5c6f97",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.4px",
  textTransform: "uppercase" as const,
  marginBottom: "4px",
};

const value = {
  color: "#13244d",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 14px 0",
};

const valueLast = {
  ...value,
  marginBottom: "0",
};

const messageStyle = {
  color: "#27375f",
  fontSize: "16px",
  lineHeight: "26px",
  backgroundColor: "#fbfcff",
  padding: "18px",
  borderRadius: "12px",
  border: "1px solid #e2e8f8",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  color: "#6f7b95",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0",
};

const footerSection = {
  backgroundColor: "#f8fafe",
  padding: "22px 36px",
  textAlign: "center" as const,
  borderTop: "1px solid #e0e8f8",
};

const footerBrand = {
  color: "#152a59",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 4px 0",
};

const footerText = {
  color: "#617196",
  fontSize: "12px",
  margin: "0",
};
