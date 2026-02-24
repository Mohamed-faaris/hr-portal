import { EnquiryEmail } from "./templates/enquiry";
import { renderEmailTemplate } from "./render";
import { sendEmail } from "./transporter";
import { env } from "~/env";

export async function sendEnquiryEmail(options: {
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const name = options.name || "Anonymous";
  const subject = options.subject || "General Enquiry";

  const html = await renderEmailTemplate(
    <EnquiryEmail
      name={name}
      email={options.email}
      phone={options.phone}
      subject={subject}
      message={options.message}
    />,
  );

  return sendEmail({
    to: env.EMAIL_FROM,
    subject: `New Enquiry: ${subject}`,
    html,
    text: `New Enquiry from ${name}\n\nEmail: ${options.email}\nPhone: ${options.phone || "Not provided"}\nSubject: ${subject}\n\nMessage:\n${options.message}`,
  });
}
