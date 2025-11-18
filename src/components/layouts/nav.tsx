import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const location = useLocation();
  const navBar = [
    {
      title: "Home",
      url: "/home",
    },
    {
      title: "About",
      url: "/about",
    },

    {
      title: "Experience",
      url: "/experience",
    },
    {
      title: "Project",
      url: "/project",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {navBar.map((item) => {
                if (item.url === location.pathname) {
                  return (
                    <BreadcrumbItem key={item.url}>
                      <BreadcrumbSeparator />
                      <BreadcrumbLink href={item.url}>
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  );
                }
                return null;
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>

      </SidebarInset>

    </SidebarProvider>
  );
}
