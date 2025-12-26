import type { Language } from '../lib/i18n/translations'
import { getTranslation } from '../lib/i18n/translations'
import { LanguageSwitcher } from './LanguageSwitcher'

// Navigation Header Component
export function NavHeader(props: { active: 'dashboard' | 'projects' | 'reports'; lang: Language }) {
  const t = getTranslation(props.lang);
  
  return (
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <i class="fas fa-shield-alt text-3xl text-blue-600"></i>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{t.dashboard.title}</h1>
              <p class="text-xs text-gray-600">{t.dashboard.subtitle}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <nav class="flex space-x-6">
              <a href="/" class={props.active === 'dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
                <i class="fas fa-home mr-2"></i>{t.nav.dashboard}
              </a>
              <a href="/projects" class={props.active === 'projects' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
                <i class="fas fa-project-diagram mr-2"></i>{t.nav.projects}
              </a>
              <a href="/reports" class={props.active === 'reports' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
                <i class="fas fa-file-pdf mr-2"></i>{t.nav.reports}
              </a>
            </nav>
            <LanguageSwitcher current={props.lang} />
          </div>
        </div>
      </div>
    </header>
  )
}
