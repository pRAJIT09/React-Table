export const getFilteredData = (data, search) => {
    if (!search) return data;
    return data.filter(
      (row) =>
        row.id.toLowerCase().includes(search.toLowerCase()) ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.role.toLowerCase().includes(search.toLowerCase())
    );
  };