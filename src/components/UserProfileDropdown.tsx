import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, Users, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface UserProfileDropdownProps {
  user: UserData;
  onSignOut: () => void;
}

const UserProfileDropdown = ({ user, onSignOut }: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Force blur the button when opening dropdown to remove focus styles
    if (open) {
      setTimeout(() => {
        (document.activeElement as HTMLElement | null)?.blur();
      }, 0);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAccountSettings = () => {
    // In a real app, this would navigate to account settings
    console.log("Navigate to Account Settings");
    handleOpenChange(false);
  };

  const handleViewAgents = () => {
    // In a real app, this would navigate to agents page
    console.log("Navigate to View Agents");
    handleOpenChange(false);
  };

  const handleSignOut = () => {
    onSignOut();
    handleOpenChange(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-11 px-3.5 border border-white/10 backdrop-blur-sm transition-all duration-300 rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0"
          onMouseEnter={(e) => {
            const button = e.currentTarget;
            button.style.borderColor = '#667eea';
            button.style.background = 'transparent';
          }}
          onMouseLeave={(e) => {
            const button = e.currentTarget;
            button.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            button.style.background = 'transparent';
          }}
        >
          <User 
            className="text-foreground hover:text-white transition-colors duration-300" 
            style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
          />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 bg-background/95 backdrop-blur-xl border-white/10 shadow-glass-hover p-3"
        align="end"
        sideOffset={8}
      >
        {/* User Info Section */}
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-3 border border-white/5">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-premium text-white font-semibold">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {user.name || "NITYAM"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-white/10 my-2" />

        {/* Menu Items */}
        <DropdownMenuItem 
          className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-200 focus:bg-white/5"
          onClick={handleAccountSettings}
        >
          <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10 my-2" />

        <DropdownMenuItem 
          className="p-3 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors duration-200 focus:bg-red-500/10 group"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-red-400" />
          <span className="text-sm font-medium text-foreground group-hover:text-red-400 flex items-center">
            Log Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileDropdown;
