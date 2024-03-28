import { AppShell, Breadcrumbs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import Link from "next/link";
import { IconHome, IconInfoCircle, IconPuzzle } from "@tabler/icons-react";
import { Header, Navbar } from "./layoutComponents";
import BreadCrumbsItem from "./layoutComponents/BreadCrumbsItem";
import { IconCategory } from "@tabler/icons-react";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const APP_NAME = "Qizz";

interface UserLayoutProps {
  title?: string;
  breadcrumbs?: BreadCrumbsItem[];
  children: React.ReactNode;
}

const navbarItems = [
  {
    title: "Home",
    link: "/",
    icon: <IconHome size="1rem" stroke={1.5} />,
  },
  {
    title: "Category",
    link: "/category",
    icon: <IconCategory size="1rem" stroke={1.5} />,
  },
  {
    title: "User",
    link: "/user",
    icon: <FaRegUser size="0.8rem" stroke={1.5} />,
  },
  {
    title: "Bank",
    link: "/bank",
    icon: <IconPuzzle size="1rem" stroke={1.5} />,
  },
  {
    title: "Notification",
    link: "/notification",
    icon: <IoMdNotificationsOutline size="1rem" stroke={1} />,
  },
];

const UserLayout = ({ title, breadcrumbs, children }: UserLayoutProps) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      </Head>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: {
            mobile: !mobileOpened,
            desktop: !desktopOpened,
          },
        }}
        padding="md"
      >
        <Header
          burger
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
        />
        <Navbar navbarItems={navbarItems} />
        <AppShell.Main>
          {breadcrumbs && (
            <Breadcrumbs mb={"sm"}>
              {breadcrumbs.map((item, index) => (
                <Link key={index} href={item.link || "#"}>
                  {item.title}
                </Link>
              ))}
            </Breadcrumbs>
          )}
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default UserLayout;
