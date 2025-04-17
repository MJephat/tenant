import React from "react";

const Invoice = () => {
  const invoiceData = {
    billedTo: {
      name: "John Doe",
      address: "953 Dandora Area 1",
      city: "Nairobi",
      state: "Kenya",
    },
    invoiceNo: "POL12345",
    invoiceDate: "06/03/2019",
    dueDate: "11/03/2019",
    items: [
      { name: "Monthly Rent", qty: 1, rate: 9 },
      { name: "Electricity Bill", qty: 3, rate: 100 },
      { name: "Parts for service", qty: 1, rate: 89 },
    ],
  };

  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  return (
    <div style={styles.body}>
      <div style={styles.invoiceBox}>
        <div style={styles.topSection}>
          <div>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/invoice.png"
              alt="Logo"
              width="40"
            />
            <p>
              Dandora Phase 1, 953
              <br />
              Dandora, Nairobi
              <br />
              tel: +254 (713) 805349
            </p>
          </div>
          <div>
            <strong>Billed to:</strong>
            <br />
            {invoiceData.billedTo.name}
            <br />
            {invoiceData.billedTo.address}
            <br />
            {invoiceData.billedTo.city}, {invoiceData.billedTo.state}
          </div>
        </div>

        <div style={styles.invoiceInfo}>
          <div style={styles.invoiceTitle}>
            Invoice no <strong>{invoiceData.invoiceNo}</strong>
          </div>
          <div>
            Invoice date: <strong>{invoiceData.invoiceDate}</strong>
          </div>
          <div>
            Due date: <strong>{invoiceData.dueDate}</strong>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>${(item.qty * item.rate).toFixed(2)}</td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td colSpan="3" style={{ textAlign: "right" }}>
                Total
              </td>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.footer}>
          <strong>Thank you!</strong>
          <br />
          If you encounter any issues related to the billing you can contact us at:
          <br />
          <em>+254713805349</em>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={styles.printButton} onClick={() => window.print()}>
            Print
          </button>
        </div>
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
};

export default Invoice;