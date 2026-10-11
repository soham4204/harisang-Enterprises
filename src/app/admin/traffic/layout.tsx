import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Traffic Portal | Confidential",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminTrafficLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
