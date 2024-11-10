import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getStudent = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data[0]);
      const { password, ...info } = data[0];
      return res.json(info);
    });
};

export const joinClass = (req, res) => {
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");
  //check if user is already in group
  const memberQ = "SELECT * FROM `studentClassesRelation` WHERE `studentId` = ? AND `classId` = ?";
  db.query(memberQ, [userInfo.id, req.body.classId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already in Class!");
          
      //add user to group
      const q =
      "INSERT INTO `studentClassRelation` (`sid`, `cid`) VALUES (?, ?)";

      db.query(q, [userInfo.id, req.body.classId], (err, data) => {
          if (err) return res.status(500).json(err);
          if(data.affectedRows == 0) return res.status(409).json("Class does not exist");
          return res.status(200).json("Class added.");
      });
  });
});
};

export const getStudentClasses = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT c.cl, c.className, c.subject FROM `classes` AS c INNER JOIN `studentClassRelation` AS r ON r.cid = c.classId WHERE r.userId = ?";

    db.query(q, userInfo.studentId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};

export const getStudentStudyGroups = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT c.className, c.subject,  FROM `studentGroupRelation` AS r INNER JOIN studyGroup AS sg ON sg.groupId = r.studyGroupId INNER JOIN `classes` AS c ON r.cid = c.classId WHERE r.userId = ?";

    db.query(q, userInfo.studentId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};

export const getStudentAvailability = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT * FROM `availability` AS a WHERE a.userId = ?";

    db.query(q, userInfo.studentId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};
