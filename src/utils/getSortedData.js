export const getSortedData = (data, sortField, sortOrder = "asc") => {
  if (!sortField) return data;

  const result = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return result;
};