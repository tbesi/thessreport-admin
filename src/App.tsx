import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Report } from "./types";
import { getAllReports } from "./api/reports";
import * as Realm from "realm-web";
import ReportDetails from "./components/ReportDetails";

const realm_app = new Realm.App({ id: "thessreport-opcka" });

function App() {
  const [reports, setReports] = useState<Report[]>();

  const pendingReports = useMemo(() => {
    return reports?.filter((r) => r.status === "Pending");
  }, [reports]);

  const inProgressReports = useMemo(() => {
    return reports?.filter((r) => r.status === "In Progress");
  }, [reports]);
  const resolvedReports = useMemo(() => {
    return reports?.filter((r) => r.status === "Resolved");
  }, [reports]);
  const rejectedReports = useMemo(() => {
    return reports?.filter((r) => r.status === "Rejected");
  }, [reports]);

  useEffect(() => {
    getAllReports().then((data) => setReports(data));
    const initdb = async () => {
      realm_app.logIn(Realm.Credentials.anonymous());
      const mongodb = realm_app.currentUser?.mongoClient("mongodb-atlas");
      const reports_collection = mongodb
        ?.db("thessreport")
        .collection("reports");

      if (reports_collection)
        for await (const change of reports_collection.watch()) {
          getAllReports().then((data) => setReports(data));
        }
    };
    initdb();
  }, []);

  return (
    <div className="App">
      <div id="pendingReports" className="reportsColumn">
        <h3>Εκκρεμείς Αναφορές</h3>
        {pendingReports &&
          pendingReports?.map((r) => {
            return (
              <ReportDetails key={r.id} report={r} setReports={setReports} />
            );
          })}
      </div>
      <div id="inProgressReports" className="reportsColumn">
        <h3>Αναφορές Σε Εξέλιξη</h3>
        {inProgressReports &&
          inProgressReports?.map((r) => {
            return (
              <ReportDetails key={r.id} report={r} setReports={setReports} />
            );
          })}
      </div>
      <div id="resolvedReports" className="reportsColumn">
        <h3>Επιλυμένες Αναφορές</h3>
        {resolvedReports &&
          resolvedReports?.map((r) => {
            return (
              <ReportDetails key={r.id} report={r} setReports={setReports} />
            );
          })}
      </div>
      <div id="rejectedReports" className="reportsColumn">
        <h3>Απορριφθείσες Αναφορές</h3>
        {rejectedReports &&
          rejectedReports?.map((r) => {
            return (
              <ReportDetails key={r.id} report={r} setReports={setReports} />
            );
          })}
      </div>
    </div>
  );
}

export default App;
