import {
  Link,
  Outlet,
  useRouteLoaderData,
  useMatches,
  useLocation,
} from "react-router";
import type { Route } from "./+types/protected-sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "app/components/ui/sidebar";
import { NavMain } from "app/components/nav-main";
import { NavProjects } from "app/components/nav-projects";
import { NavSecondary } from "app/components/nav-secondary";
import { NavUser } from "app/components/nav-user";
import { ChefHat } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "app/components/ui/breadcrumb";
import { Separator } from "app/components/ui/separator";
import { sidebarData } from "app/data/sidebar-data"; // Move sidebarDAta to this file

export default function ProtectedSidebar({ loaderData }: Route.ComponentProps) {
  const protectedLayoutData = useRouteLoaderData("protectedLayout");
  const { user } = protectedLayoutData || {};
  const matches = useMatches();
  const location = useLocation();

  const getCurrentPageTitle = () => {
    console.log("matches", matches);
    const lastMatch = matches[matches.length - 1];
    if (lastMatch) {
      const routeParts = lastMatch.id.split("/");
      const pageName = routeParts[routeParts.length - 1];

      return pageName
        .replace(/\.tsx$/, "") // Remove .tsx extension
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
    }
    return "Data Fetching";
  };
  return (
    <SidebarProvider>
      {/* Sidebar component */}
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="bg-primary text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                    <ChefHat className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Honey Trip 🍯</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarData.navMain} />
          <NavProjects projects={sidebarData.projects} />
          <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>

      {/* Main content area */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {getCurrentPageTitle() !== "Dashboard" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{getCurrentPageTitle()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
