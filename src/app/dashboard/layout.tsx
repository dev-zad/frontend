import { Typography } from "@/components/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import 'remixicon/fonts/remixicon.css'


export default function DashboardLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-[240px,1fr] overflow-hidden">
      <nav className="border-r bg-gray-100/40 dark:bg-gray-800/40 overflow-y-auto">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/dashboard" className="flex flex-row gap-2">
              <i className="ri-dashboard-horizontal-fill flex items-center"></i>
              <Typography variant="paragraph" className="font-bold flex items-center text-[#3D3D3D]">Dashboard</Typography>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-md font-medium">
              <Link
                href="/dashboard/account"
                className="flex items-center  gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <i className="ri-account-circle-line"></i>
                Account
              </Link>
              <Link
                href="/dashboard/connects"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <i className="ri-links-line"></i>
                Connects
              </Link>
              <Link
                href="/dashboard/posts"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <i className="ri-chat-thread-line"></i>
                Post
              </Link>
              <Link
                href="/dashboard/events"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <i className="ri-calendar-event-line"></i>
                Events
              </Link>
              <Link
                href="/dashboard/record"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <i className="ri-folder-music-line"></i>
                Records
              </Link>
            </nav>
          </div>
        </div>
      </nav>
      <main className="flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
