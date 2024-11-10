import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getStudent = (req, res) => {
    const userId = req.body.userId;
    const q = "SELECT * FROM student WHERE studentId=?";
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
};

export const joinClass = (req, res) => {
  console.log(req.cookies.accessToken);
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");
  const memberQ = "SELECT * FROM `studentClassRelation` WHERE `sid` = ? AND `cid` = ?";
  db.query(memberQ, [userInfo.id, req.body.classId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already in Class!");
          
      const q =
      "INSERT INTO `studentClassRelation` (`sid`, `cid`) VALUES (?, ?)";

      db.query(q, [userInfo.studentId, req.body.classId], (err, data) => {
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
    
    const q = "SELECT c.className, c.subject FROM `classes` AS c INNER JOIN `studentClassRelation` AS r ON r.cid = c.classId WHERE r.sid = ?";

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
    
    const q = "SELECT c.className, c.subject, sg.time FROM `studentGroupRelation` AS r INNER JOIN studyGroup AS sg ON sg.groupId = r.studyGroupId INNER JOIN `classes` AS c ON sg.classId = c.classId WHERE r.studentId = ?";

    db.query(q, userInfo.studentId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};

export const getStudentAvailability = (req, res) => {
  // console.log(req);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT * FROM `availability` AS a WHERE a.studentId = ?";

    db.query(q, userInfo.studentId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};

export const studentLogin = (req, res) => {
  const q = "SELECT * FROM student WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = req.body.password === data[0].password;

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ studentId: data[0].studentId }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
      console.log(res.cookie.accessToken+"hi");
  });
};

export const studentLogout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};