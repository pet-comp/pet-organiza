/**
 * Retorna a data atual no fuso horário local do dispositivo no formato 'YYYY-MM-DD'.
 * Evita o bug de UTC (onde a virada do dia ocorre às 21h em fusos como o de Brasília UTC-3).
 */
export function getLocalTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Normaliza qualquer formato de data salvo (YYYY-MM-DD, DD/MM/YYYY ou timestamp ISO)
 * para o formato padrão 'YYYY-MM-DD'.
 */
export function normalizeDateString(dateStr: string | null | undefined): string | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const trimmed = dateStr.trim();

  // Caso esteja no formato DD/MM/YYYY
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }

  // Caso esteja no formato YYYY-MM-DD ou ISO (com ou sem 'T')
  if (trimmed.includes('-')) {
    const datePart = trimmed.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }

  return trimmed;
}

/**
 * Verifica se a data fornecida é igual ao dia de hoje (no fuso local).
 */
export function isToday(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  const normalized = normalizeDateString(dateStr);
  const today = getLocalTodayString();
  return normalized === today;
}

/**
 * Verifica se o prazo já passou (data estritamente anterior ao dia de hoje no fuso local).
 */
export function isPastDate(dateStr: string | null | undefined): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const raw = dateStr.trim();
  if (!raw) return false;

  const lower = raw.toLowerCase();
  if (lower === 'hoje' || lower === 'amanhã' || lower === 'amanha') return false;
  if (lower === 'ontem') return true;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);
    return new Date(year, month - 1, day).getTime() < today;
  }

  const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
  if (slashMatch) {
    const day = parseInt(slashMatch[1], 10);
    const month = parseInt(slashMatch[2], 10);
    const year = slashMatch[3] ? parseInt(slashMatch[3], 10) : now.getFullYear();
    return new Date(year, month - 1, day).getTime() < today;
  }

  return false;
}

