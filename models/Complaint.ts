/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

export interface Complaint {
  com_id: number;
  user_id: string;
  timestamp: string;

  id: string;
  complaintType: string;
  location: string;
  locationDescription: string;
  problemDescription: string;
  timeOfAvailability: string;

  status: string;
  complaint_id: string;
  remarks: string;
}

export const complaintFromJSON = (complaint: any): Complaint => ({
  ...complaint,
  id: complaint.complaint_id,
  complaintType: complaint.type,
  location: complaint.location,
  locationDescription: complaint.location_details,
  problemDescription: complaint.problem_details,
  timeOfAvailability: complaint.pref_time,

  timestamp: complaint.date_n_time,
});

export const complaintToJSON = (complaint: Complaint): any => ({
  ...complaint,
  complaint_id: complaint.id,
  type: complaint.complaintType,
  location: complaint.location,
  location_details: complaint.locationDescription,
  problem_details: complaint.problemDescription,
  pref_time: complaint.timeOfAvailability,

  date_n_time: complaint.timestamp,
});
