export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Сегодня';
    if (diffInDays === 1) return 'Вчера';
    if (diffInDays < 7) return `${diffInDays} дней назад`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} недель назад`;
    return date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', year: 'numeric' });
  };