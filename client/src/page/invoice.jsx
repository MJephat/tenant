import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { axiosInstance } from "../assets/axios";

const fetchPayments = async () => {
  const response = await axiosInstance.get("/payment");
  return response.data.payments;
};

const Invoice = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });

  const payments = Array.isArray(data) ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading payments</div>;
  }

  // Generate PDF Function
  const generatePDF = (payment) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Monthly Rent Payment Invoice", 60, 20);

    doc.setFontSize(12);
    doc.text(`Tenant Name: ${payment.tenantId?.name}`, 140, 30);
    doc.text("Dandora Phase 1, 953", 140, 36);
    doc.text("Nairobi, Kenya", 140, 42);
    doc.text(`Room Number: ${payment.tenantId?.roomNumber || "N/A"}`, 140, 48);
    doc.text(`Transaction ID: ${payment.transactionId}`, 14, 60);
    doc.text(
      `Invoice Date: ${new Date(payment.createdAt).toLocaleDateString("en-GB")}`,
      14,
      66
    );
    doc.text(`Processed By: ${payment.paidBy?.username || "Admin"}`, 14, 72);

    autoTable(doc, {
      startY: 76,
      head: [["Item", "Rate", "Amount"]],
      body: [
        ["Monthly Rent", `Ksh. ${payment.rentAmount}`, `Ksh. ${payment.amountPaid}`],
        ["Electricity Bill", ` `, `Ksh. ${payment.electricityBill}`],
        ["Balance" , `Ksh. ${payment.balance}`],
        ["Total", "", `Ksh. ${payment.amountPaid }`],
      ],
    });

    const finalY = doc.lastAutoTable.finalY || 80;

    doc.setFontSize(14);
    doc.text(
      `Total PAID: Ksh. ${payment.amountPaid}`,
      110,
      finalY + 10
    );

    if (payment.balance <= 0) {
      doc.setTextColor(0, 128, 0);
      doc.text("Status: PAID ", 14, finalY + 20);
    } else {
      doc.setTextColor(255, 0, 0);
      doc.text("Status: PARTIALLY PAID", 14, finalY + 20);
    }

    doc.save(`Invoice-${payment.transactionId}.pdf`);
  };

  return (
    <div style={styles.body}>
      <div style={styles.invoiceBox}>
        {payments.map((payment) => (
          <div key={payment._id} style={{ marginBottom: "50px" }}>
            <div style={styles.topSection}>
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/invoice.png"
                  alt="Logo"
                  width="40"
                />
                <p>
                  Dandora Phase 1, 953<br />
                  Dandora, Nairobi<br />
                  Tel: +254 (713) 805349
                </p>
              </div>
              <div>
                <strong>Billed to:</strong>
                <br />
                {payment.tenantId?.name}
                <br />
                Dandora, Area 1
                <br />
                Nairobi, Kenya
              </div>
            </div>

            <div style={styles.invoiceInfo}>
              <div style={styles.invoiceTitle}>
                Invoice no: <strong>{payment.transactionId}</strong>
              </div>
              <div>
                Invoice date:{" "}
                <strong>
                  {new Date(payment.createdAt).toLocaleDateString("en-GB")}
                </strong>
              </div>

              {/* Paid Badge */}
              {payment.balance <= 0 && (
                <div style={styles.paidBadge}>PAID</div>
              )}
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  {/* <th>Qty</th> */}
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Rent</td>
                  {/* <td>1</td> */}
                  <td>Ksh. {payment.rentAmount}</td>
                  <td>Ksh. {payment.amountPaid}</td>
                </tr>
                <tr>
                  <td>Electricity Bill</td>
                  {/* <td>1</td> */}
                  <td>Ksh. {payment.electricityBill}</td>
                  <td> {}</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  {/* <td>1</td> */}
                  <td> {}</td>
                  <td>Ksh. {payment.balance}</td>
                </tr>
                <tr style={styles.totalRow}>
                  <td colSpan="3" style={{ textAlign: "right" }}>
                    Total
                  </td>
                  <td>Ksh. {payment.amountPaid}</td>
                </tr>
              </tbody>
            </table>

            <div style={styles.footer}>
              <strong>Thank you!</strong>
              <br />
              For billing inquiries contact:
              <br />
              <em>+254713805349</em>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button style={styles.printButton} onClick={() => window.print()}>
                Print
              </button>
              <button style={styles.pdfButton} onClick={() => generatePDF(payment)}>
                Download PDF
              </button>
            </div>

            <hr style={{ margin: "40px 0" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    color: "#333",
  },
  invoiceBox: {
    maxWidth: "800px",
    margin: "auto",
    border: "1px solid #eee",
    padding: "30px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  invoiceInfo: {
    marginTop: "20px",
    position: "relative",
  },
  invoiceTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  totalRow: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: "40px",
  },
  printButton: {
    marginTop: "20px",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  pdfButton: {
    marginTop: "20px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  paidBadge: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    position: "absolute",
    top: "0",
    right: "0",
  },
};

export default Invoice;
