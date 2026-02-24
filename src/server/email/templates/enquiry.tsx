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
const BRAND_COLOR = "#5469d4";
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
            <Text style={value}>{subject}</Text>
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
  backgroundColor: "#f3f3f5",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  marginBottom: "64px",
  borderRadius: "8px",
  overflow: "hidden",
};

const headerSection = {
  backgroundColor: BRAND_COLOR,
  padding: "32px 48px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 16px auto",
  borderRadius: "8px",
};

const brandName = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
};

const brandTagline = {
  color: "#e0e7ff",
  fontSize: "14px",
  margin: "0",
};

const box = {
  padding: "32px 48px",
};

const hr = {
  borderColor: "#e7e7e7",
  margin: "20px 0",
};

const heading = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px 0",
  padding: "0",
};

const infoBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
};

const label = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  marginBottom: "4px",
};

const value = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "12px",
};

const messageStyle = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const footer = {
  color: "#999999",
  fontSize: "12px",
  lineHeight: "15px",
};

const footerSection = {
  backgroundColor: "#f9fafb",
  padding: "24px 48px",
  textAlign: "center" as const,
  borderTop: "1px solid #e5e7eb",
};

const footerBrand = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 4px 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0",
};
