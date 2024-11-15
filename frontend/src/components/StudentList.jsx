// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(apiUrl, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
<div className="flex justify-center items-center mt-10">
<Card style={{ width: '600px', margin: '0 auto' }} color="transparent" shadow={true} className="border border-gray-300 mt-4">
<div className="p-4">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Student Form
        </Typography>
        <form className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              placeholder="Name"
              value={name}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Age
            </Typography>
            <Input
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Grade
            </Typography>
            <Input
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={saveStudent}>
            {editingId ? "Update Student" : "Add Student"}
          </Button>
        </form>
      </div>
      <Card style={{ width: '600px', margin: '0 auto' }} color="transparent" shadow={true} className="border border-gray-300 mt-4">
    <div className="p-4">
      <ul className="mt-4">
        {students.map(student => (
          <li key={student._id} className="flex justify-between items-center py-2">
            <span>
              {student.name} - Age: {student.age}, Grade: {student.grade}
            </span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button onClick={() => editStudent(student)}>Edit</Button>
              <Button onClick={() => deleteStudent(student._id)} color="red">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Card>
    </Card>
    </div>

  );
}

export default StudentList;