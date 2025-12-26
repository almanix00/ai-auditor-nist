import { Context } from 'hono';
import type { Language } from './translations';

export function getLanguageFromCookie(c: Context): Language {
  const cookie = c.req.header('cookie') || '';
  const langMatch = cookie.match(/lang=(ko|en)/);
  return (langMatch?.[1] as Language) || 'ko';
}

export function setLanguageCookie(c: Context, lang: Language) {
  c.header('Set-Cookie', `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`);
}
