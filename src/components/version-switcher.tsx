import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex p-4 gap-4 items-center">
        <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <img src="/logo.png" alt="Quin logo" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-medium">Quin Quin</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
