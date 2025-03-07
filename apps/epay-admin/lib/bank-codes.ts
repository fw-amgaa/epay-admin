const bankMap: Record<string, string> = {
  '0001': 'Монголбанк',
  '0003': 'Капитал банк ЭХА',
  '0004': 'Худалдаа хөгжлийн банк',
  '0005': 'Хаан банк',
  '0015': 'Голомт банк',
  '0018': 'Хадгаламж банк ЭХА',
  '0019': 'Тээвэр хөгжлийн банк',
  '0021': 'Ариг банк',
  '0024': 'Зоос банк',
  '0025': 'Анод банк',
  '0029': 'Үндэсний хөрөнгө оруулалтын банк',
  '0030': 'Капитрон банк',
  '0032': 'Хас банк',
  '0033': 'Чингис хаан банк',
  '0034': 'Төрийн банк',
  '0036': 'Хөгжлийн банк',
  '0038': 'Богд банк',
  '0039': 'М банк',
  '0050': 'Мобифинанс ББСБ',
  '0051': 'Хай пэймэнт солюшнс',
  '0052': 'Ард кредит ББСБ',
  '0053': 'Инвескор Хэтэвч ББСБ',
  '0054': 'Нэткапитал Финанс Корпораци ББСБ',
  '0055': 'Дата бэйнк',
  '0056': '360 Файнанс ББСБ',
  '0057': 'Супер ап хэтэвч',
  '0058': 'Токи ББСБ',
  '0059': 'Сэнд Эм Эн ББСБ',
  '0090': 'Сангийн яам (Төрийн сан)',
  '0094': 'Монголын үнэт цаасны клирингийн төв',
  '0095': 'Үнэт цаасны төвлөрсөн хадгаламжийн төв',
  '0201': 'Бонум',
  '0202': 'KKTT'
};

export const getBankName = (code: string): string => bankMap[code] || 'Unknown';

export const bankOptions = Object.entries(bankMap).map(([code, name]) => ({
  value: code,
  label: name
}));
