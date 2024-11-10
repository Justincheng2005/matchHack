import { db } from '../connect.js'

export const getStudyGroup = (req, res) => {
    const q = "SELECT studentId FROM studentGroupRelation as r JOIN student as s ON s.studentId = r.studentId WHERE r.groupId=?";
  
    db.query(q, [req.params.groupId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data[0]);
    });
}

export const joinStudyGroup = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO studentGroupRelation(`studyGroupId`, `studentId`) VALUES (?, ?)";
    
        db.query(q, [req.params.groupId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Joined group");
    });
    });
}

export const leaveStudyGroup = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM studentGroupRelation AS r WHERE r.groupId=? AND r.studentId=?";
    
        db.query(q, [req.params.groupId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.stauts(200).json("Left group");
        });
    });
}