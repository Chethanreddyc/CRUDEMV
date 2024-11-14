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
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;


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
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };



  return (
<div className="flex justify-center items-center mt-10">
<Card style={{ width: '600px', margin: '0 auto' }} color="transparent" shadow={true} className="border border-gray-300 mt-4">
<div className="p-4">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Faculty Form
        </Typography>
        <form className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
               Name
            </Typography>
            <Input
              placeholder="Name"
              value={name}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Age
            </Typography>
            <Input
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
               feedback
            </Typography>
            <Input
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={saveStudent}>
            {editingId ? "Update Student" : "Add details"}
          </Button>
        </form>
      </div>
    </Card>
    </div>

  );
}

export default StudentList;