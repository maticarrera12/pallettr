import { ThemeWrapper } from "../components/ThemeWrapper";

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
