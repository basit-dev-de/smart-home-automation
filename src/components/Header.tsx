import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "@/context/LocaleContext";
import ThemeToggle from "./ThemeToggle";
import LocaleSelector from "./LocaleSelector";
import { Bell, Menu, Search, Settings, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [greeting, setGreeting] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for handling outside clicks
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting(t("dashboard.greeting.morning"));
      } else if (hour >= 12 && hour < 18) {
        setGreeting(t("dashboard.greeting.afternoon"));
      } else if (hour >= 18 && hour < 22) {
        setGreeting(t("dashboard.greeting.evening"));
      } else {
        setGreeting(t("dashboard.greeting.night"));
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [t]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      toast({
        title: t("search.title"),
        description: t("search.description", { query }),
      });
      setSearchOpen(false);
    }
  };

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: t("notifications.newDevice"),
      description: t("notifications.thermostatOnline"),
      time: t("time.fiveMinAgo"),
    },
    {
      id: 2,
      title: t("notifications.energyAlert"),
      description: t("notifications.unusualConsumption"),
      time: t("time.oneHourAgo"),
    },
    {
      id: 3,
      title: t("notifications.securityAlert"),
      description: t("notifications.motionDetected"),
      time: t("time.yesterday"),
    },
  ];

  // Navigation items for mobile menu
  const navItems = [
    { name: t("navigation.dashboard"), path: "/" },
    { name: t("navigation.settings"), path: "/settings" },
    { name: t("navigation.profile"), path: "/profile" },
  ];

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                        <span className="absolute animate-pulse-slow">H</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <h1 className="text-lg font-bold leading-none">
                          {t("app.title")}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                          {t("app.subtitle")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex-1">
                    <ul className="py-2">
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <button
                            onClick={() => handleMobileNavigation(item.path)}
                            className="flex w-full items-center px-4 py-3 hover:bg-secondary/50 transition-colors"
                          >
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="p-4 border-t flex items-center justify-between">
                    <ThemeToggle />
                    <LocaleSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              <span className="absolute animate-pulse-slow">H</span>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-bold leading-none">
                {t("app.title")}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {t("app.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <p className="text-sm font-medium">{greeting}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Button and Popover */}
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <button
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors duration-200"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[calc(100vw-2rem)] sm:w-80"
              align="end"
              alignOffset={-15}
              ref={searchRef}
            >
              <Command>
                <CommandInput
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>{t("search.noResults")}</CommandEmpty>
                  <CommandGroup heading={t("search.suggestions")}>
                    <CommandItem onSelect={() => navigate("/device/1")}>
                      {t("device.livingRoomLight")}
                    </CommandItem>
                    <CommandItem onSelect={() => navigate("/device/2")}>
                      {t("device.kitchenThermostat")}
                    </CommandItem>
                    <CommandItem onSelect={() => navigate("/device/3")}>
                      {t("device.bedroomSpeaker")}
                    </CommandItem>
                  </CommandGroup>
                  <div className="flex items-center justify-end p-2">
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="text-xs text-primary hover:underline"
                    >
                      {t("search.searchAll")}
                    </button>
                  </div>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Notifications Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[calc(100vw-2rem)] sm:w-80 p-0"
              align="end"
              alignOffset={-15}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">{t("notifications.title")}</h3>
                <button className="text-xs text-primary hover:underline">
                  {t("notifications.markAllRead")}
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b hover:bg-secondary/50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs mt-1">{notification.description}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center">
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={() => navigate("/notifications")}
                >
                  {t("notifications.viewAll")}
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle with fixed alignment */}
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>

          {/* Only show locale selector on desktop */}
          <div className="hidden sm:block">
            <LocaleSelector />
          </div>

          {/* Only show settings and profile on desktop */}
          {!isMobile && (
            <>
              <button
                onClick={() => navigate("/settings")}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors duration-200"
              >
                <Settings className="h-5 w-5" />
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 overflow-hidden"
              >
                <User className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
