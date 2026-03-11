import ExcelJS from "exceljs";

export const generateExcel = async (transactions) => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions");

  worksheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Title", key: "title", width: 20 },
    { header: "Type", key: "type", width: 15 },
    { header: "Amount", key: "amount", width: 15 }
  ];

  transactions.forEach(t => {
    worksheet.addRow({
      date: new Date(t.date).toLocaleDateString(),
      title: t.title,
      type: t.type,
      amount: t.amount
    });
  });

  return workbook;
};