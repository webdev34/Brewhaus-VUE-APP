export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};
