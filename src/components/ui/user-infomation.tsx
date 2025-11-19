import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function UserInfomation() {
    const { user, logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <div className="flex gap-4 px-4 py-2 items-center w-full">
                    <Avatar>
                        <AvatarImage src={user?.user_metadata?.avatar_url ?? ""} alt={user?.email ?? "User"} />
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div >
                        <p className="text-sm font-medium">{user?.email}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
