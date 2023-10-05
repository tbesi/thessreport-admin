import React from "react";
import { Report } from "../types";
import { updateReportStatus } from "../api/reports";
import moment from "moment-timezone";

const ReportDetails: React.FC<{
  report: Report;
}> = ({ report }) => {
  const date = moment(report.date);
  const formattedDate = date.tz("Europe/Athens").format("DD/MM/YYYY, HH:mm");
  return (
    <div className="report_container">
      <p>{formattedDate}</p>
      <p style={{ fontWeight: "bold" }}>{report.category}</p>
      <p key={report.id}>
        {report.description ? report.description : "<Χωρίς περιγραφή>"}
      </p>
      <p>{report.address}</p>
      {report.ownerFirstName && report.ownerLastName ? (
        <p>
          Καταχωρήθηκε από: {report.ownerFirstName} {report.ownerLastName}
        </p>
      ) : (
        <p>Καταχωρήθηκε Ανώνυμα</p>
      )}
      <img
        alt="reportImage"
        style={{ objectFit: "contain", maxHeight: 300, borderRadius: 10 }}
        src={`http://3.71.48.208:8080/api/reports/getImage?reportId=${report.id}`}
      />
      {report.status === "Pending" && (
        <div>
          <button
            style={{
              backgroundColor: "#4C565A",
              color: "#ffffff",
              borderRadius: "10px",
              borderWidth: 0,
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => updateReportStatus(report.id, "inprogress")}
          >
            ΣΕ ΕΞΕΛΙΞΗ
          </button>
          <button
            style={{
              backgroundColor: "#4C565A",
              color: "#ffffff",
              borderRadius: "10px",
              borderWidth: 0,
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => updateReportStatus(report.id, "reject")}
          >
            ΑΠΟΡΡΙΨΗ
          </button>
        </div>
      )}
      {report.status === "In Progress" && (
        <div>
          <button
            style={{
              backgroundColor: "#4C565A",
              color: "#ffffff",
              borderRadius: "10px",
              borderWidth: 0,
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => updateReportStatus(report.id, "pending")}
          >
            ΣΕ ΕΚΚΡΕΜΟΤΗΤΑ
          </button>
          <button
            style={{
              backgroundColor: "#4C565A",
              color: "#ffffff",
              borderRadius: "10px",
              borderWidth: 0,
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => updateReportStatus(report.id, "resolve")}
          >
            ΕΠΙΛΥΣΗ
          </button>
          <button
            style={{
              backgroundColor: "#4C565A",
              color: "#ffffff",
              borderRadius: "10px",
              borderWidth: 0,
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => updateReportStatus(report.id, "reject")}
          >
            ΑΠΟΡΡΙΨΗ
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
