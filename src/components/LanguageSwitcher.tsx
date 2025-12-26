import type { Language } from '../lib/i18n/translations';

// Language Switcher Component
export function LanguageSwitcher(props: { current: Language }) {
  return (
    <div class="flex items-center space-x-2">
      <a 
        href="?lang=ko" 
        class={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
          props.current === 'ko' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        한국어
      </a>
      <a 
        href="?lang=en" 
        class={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
          props.current === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </a>
    </div>
  );
}
