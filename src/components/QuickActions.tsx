
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { toast } from '@/components/ui/use-toast';
import { 
  Plus, Minus, Bot, Power, Bed, Home, Film, Laptop, Coffee 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuickAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

const QuickActions: React.FC = () => {
  const { t } = useLocale();
  const isMobile = useIsMobile();
  
  const handleAction = (actionName: string) => {
    toast({
      title: t("action.triggered"),
      description: t("action.activated", { name: actionName }),
    });
  };
  
  const quickActions: QuickAction[] = [
    {
      id: 'all-off',
      name: t('action.turnAllOff'),
      icon: <Power className="h-4 w-4" />,
      action: () => handleAction(t('action.turnAllOff')),
    },
    {
      id: 'all-on',
      name: t('action.turnAllOn'),
      icon: <Power className="h-4 w-4" />,
      action: () => handleAction(t('action.turnAllOn')),
    },
    {
      id: 'morning',
      name: t('action.morningMode'),
      icon: <Coffee className="h-4 w-4" />,
      action: () => handleAction(t('action.morningMode')),
    },
    {
      id: 'night',
      name: t('action.nightMode'),
      icon: <Bed className="h-4 w-4" />,
      action: () => handleAction(t('action.nightMode')),
    },
    {
      id: 'away',
      name: t('action.awayMode'),
      icon: <Home className="h-4 w-4" />,
      action: () => handleAction(t('action.awayMode')),
    },
    {
      id: 'movie',
      name: t('action.movieMode'),
      icon: <Film className="h-4 w-4" />,
      action: () => handleAction(t('action.movieMode')),
    },
  ];

  return (
    <>
      {/* Quick action buttons for desktop */}
      <div className="hidden md:flex items-center flex-wrap gap-2 animate-fade-in">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 text-sm transition-colors duration-200"
          >
            {action.icon}
            <span>{action.name}</span>
          </button>
        ))}
      </div>
      
      {/* Mobile-friendly scrollable action buttons */}
      <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex items-center gap-2 w-max">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 text-sm whitespace-nowrap transition-colors duration-200"
            >
              {action.icon}
              <span className="text-xs">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Floating action button for mobile - now as a backup */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="floating-action-button animate-float">
              <Plus className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {quickActions.map((action) => (
              <DropdownMenuItem
                key={action.id}
                onClick={action.action}
                className="flex items-center gap-2 cursor-pointer"
              >
                {action.icon}
                <span>{action.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default QuickActions;
