import axios, { AxiosResponse } from "axios";
import { Report } from "../types";

const serverUrl = "http://3.71.48.208:8080";

export const getAllReports = async (): Promise<Report[] | undefined> => {
  try {
    const response: AxiosResponse<Report[]> = await axios.get(
      `${serverUrl}/api/reports/all`
    );
    if (response) {
      return response.data;
    }
  } catch (e) {
    return undefined;
  }
};

export const updateReportStatus = async (
  reportId: string,
  newStatus: string
): Promise<Report | undefined> => {
  try {
    const response: AxiosResponse<Report> = await axios.patch(
      `${serverUrl}/api/reports/${newStatus}?reportId=${reportId}`
    );
    if (response) {
      return response.data;
    }
  } catch (e) {
    return undefined;
  }
};
