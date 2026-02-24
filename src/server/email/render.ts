import { render } from "@react-email/components";

export async function renderEmailTemplate(
  component: React.ReactElement,
): Promise<string> {
  const result = await render(component);
  if (typeof result === "string") {
    return result;
  }
  throw new Error("Failed to render email template");
}
