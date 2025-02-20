export function formatDate(date, options = {}) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-ZW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  })
} 