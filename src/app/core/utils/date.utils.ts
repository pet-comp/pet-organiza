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

