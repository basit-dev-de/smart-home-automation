
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Check, Globe } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const LocaleSelector: React.FC = () => {
  const { locale, setLocale, t } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors duration-200"
          aria-label="Select language"
        >
          <Globe className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in">
        <DropdownMenuItem 
          onClick={() => setLocale('en')}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>{t('settings.language.english')}</span>
          {locale === 'en' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLocale('de')}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>{t('settings.language.german')}</span>
          {locale === 'de' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSelector;
