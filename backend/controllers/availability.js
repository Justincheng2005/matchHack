import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getAvailabilityAtTime = (req, res) => {
    const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Not logged in!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q = "SELECT * FROM `availability` AS a WHERE endTime <= ? AND startTime >= ?";

        db.query(q, req.body.dateTime, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addAvailability = (req, res) => {
    const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Not logged in!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q = "INSERT INTO `availability` (`userId`, `startTime`, `endTime`) VALUES (?, ?, ?)";

        db.query(q, [userInfo.id, req.body.startTime, req.body.endTime], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Availability added.");
        });
    });
};

export const deleteAvailability = (req, res) => {
    const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Not logged in!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q = "DELETE FROM `availability` WHERE availabilityId = ?";
        db.query(q, req.body.availabilityId, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Availability added.");
        });
    });
};
