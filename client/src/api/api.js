import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://student-result-system.onrender.com/api";

/* ----------- Subjects API ----------- */

export const getSubjects = async () => {
  const res = await axios.get(`${BASE_URL}/subjects`);
  return res.data;
};

export const createSubject = async (data) => {
  const res = await axios.post(`${BASE_URL}/subjects`, data);
  return res.data;
};

export const updateSubject = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/subjects/${id}`, data);
  return res.data;
};

export const deleteSubject = async (id) => {
  const res = await axios.delete(`${BASE_URL}/subjects/${id}`);
  return res.data;
};

/* ----------- Students API ----------- */
export const getStudents = async () => {
  const res = await axios.get(`${BASE_URL}/students`);
  return res.data;
};

export const getStudentFullDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/students/${id}`);
  return res.data;
};

export const createStudent = async (data) => {
  const res = await axios.post(`${BASE_URL}/students`, data);
  return res.data;
};

/* ----------- Marks API ----------- */
export const getStudentMarks = async () => {
  const res = await axios.get(`${BASE_URL}/marks`);
  return res.data;
};

export const addMark = async (data) => {
  const res = await axios.post(`${BASE_URL}/marks`, data);
  return res.data;
};

export const deleteMarkById = async (id) => {
  const res = await axios.delete(`${BASE_URL}/marks/${id}`);
  return res.data;
};

/* -------------   overview API   ------------ */

export const fetchOverview = async () => {
  const res = await axios.get(`${BASE_URL}/overview`);
  return res.data;
};
