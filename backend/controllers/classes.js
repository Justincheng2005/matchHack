import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getClassStudents = (req, res) => {
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      const q = "SELECT * FROM `student` AS s INNER JOIN `studentClassRelation` AS r ON r.sid = s.studentId WHERE r.cid = ?";

      db.query(q, req.body.classId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
  });
};

export const getClassGroups = (req, res) => {
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      const q = "SELECT c.className, c.subject, sg.time FROM `studyGroup` AS sg INNER JOIN `classes` AS c ON c.classId = sg.classId WHERE sg.groupId = ?";

      db.query(q, req.body.classId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
  });
};