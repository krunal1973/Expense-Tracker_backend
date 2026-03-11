import Transaction from "../models/transaction.model.js";
import ExcelJS from "exceljs";

export const exportMonthlyExcel = async (req, res) => {

  const { year, month } = req.query;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const transactions = await Transaction.find({
    user: req.user._id,
    date: { $gte: startDate, $lte: endDate }
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Transactions");

  sheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Title", key: "title", width: 25 },
    { header: "Type", key: "type", width: 15 },
    { header: "Amount", key: "amount", width: 15 }
  ];

  transactions.forEach((t) => {
    sheet.addRow({
      date: new Date(t.date).toLocaleDateString(),
      title: t.title,
      type: t.type,
      amount: t.amount
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=transactions-${year}-${month}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
};