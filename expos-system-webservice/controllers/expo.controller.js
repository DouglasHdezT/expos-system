const debug  = require("debug")("app:expo-controller");
const User = require('../models/User.model');
const Expo = require("../models/Expo.model");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const {
      team,
      project,
      capacity,
      date
    } = req.body;

    const { identifier } = req.params;

    let expo = await Expo.findById(identifier);

    if(!expo) {
      expo = new Expo();
    }

    expo["team"] = team;
    expo["project"] = project;
    expo["capacity"] = capacity;
    expo["date"] = date;

    const expoSaved = await expo.save();
    if(!expoSaved) {
      return res.status(409).json({ error: "Error creating expo" });
    }

    return res.status(201).json(expo);
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const expos = 
      await Expo.find({}, undefined, { sort: [{ date: 1 }] })
        .populate("subs", "username name")
        .populate("attendants", "username name");
    
    return res.status(200).json({ expos });
  } catch (error) {
    next(error);
  }
}

controller.findById = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const expo = 
      await Expo.findById(identifier)
        .populate("subs", "username name")
        .populate("attendants", "username name");

    if(!expo) {
      return res.status(404).json({ error: "Expo not found" });
    }

    return res.status(200).json(expo);
  } catch (error) {
    next(error);
  }
}

controller.findOwn = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const expos = 
      await Expo.find({ subs: userId }, undefined, { sort: [{ date: 1 }] })
        .populate("subs", "username name")
        .populate("attendants", "username name");
    
    return res.status(200).json({ expos });
  } catch (error) {
    next(error);
  }
} 

controller.delete = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const expo = await Expo.findByIdAndDelete(identifier);

    if(!expo) {
      return res.status(404).json({ error: "Expo not found" });
    }

    return res.status(200).json({ message: "Expo deleted" });
  } catch (error) {
    next(error);
  }
}

controller.toggleSub = async (req, res, next) => {
  try {
    const { _id: userId, team } = req.user;
    const { identifier } = req.params;

    const expo = await Expo.findById(identifier)
      .populate("attendants", "username name");
    
    if(!expo) {
      return res.status(404).json({ error: "Expo not found" });
    }

    let _subs = [...expo.subs];
    const alreadySub = _subs.findIndex(_s => _s.equals(userId)) >= 0;

    if(alreadySub) {
      _subs = _subs.filter(_s => !_s.equals(userId));
    } else {
      if( expo.capacity !== -1 && _subs.length >= expo.capacity) {
        return res.status(409).json({ error: "Expo capacity is full" })
      }

      if (expo.team["number"] === team?.number 
      && expo.team["section"] === team?.section) {
        return res.status(403).json({error: "Forbidden action"});
      }

      _subs = [..._subs, userId];
    }

    expo["subs"] = _subs;
    const expoSaved = await (await expo.save())
      .populate("subs", "username name");

    return res.status(200).json(expoSaved); 
  } catch (error) {
    next(error);    
  } 
}

controller.toggleAttendant = async (req, res, next) => {
  try {
    const { attendant } = req.body;
    const { identifier } = req.params;

    const expo = await Expo.findById(identifier)
      .populate("subs", "username name");
    
    if(!expo) {
      return res.status(404).json({ error: "Expo not found" });
    }

    const user = await User.findById(attendant);
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let _attendants = [...expo.attendants];
    const alreadyAttend = _attendants.findIndex(_a => _a.equals(user._id)) >= 0;

    if(alreadyAttend) {
      _attendants = _attendants.filter(_a => !_a.equals(user._id));
    } else {
      if (expo.team["number"] === user.team?.number 
      && expo.team["section"] === user.team?.section) {
        return res.status(403).json({error: "Forbidden action"});
      }

      _attendants = [..._attendants, attendant];
    }

    expo["attendants"] = _attendants;

    const expoSaved = await (await expo.save())
      .populate("attendants", "username name");

    return res.status(200).json(expoSaved);

  } catch (error) {
    next(error);
  }
}

controller.getStats = async (req, res, next) => {
  try {
    const expos = await Expo.find({})
      .populate("attendants", "username name team")

    const stats = {};
    expos.forEach(_e => {
      _e.attendants.forEach(_a => {
        let data = stats[_a._id];
        if(!data) {
          data = {
            user: _a,
            attends: []
          };
        }

        data.attends = [...data.attends, _e._id];
      })
    });

    return res.stats(200).json(stats);
  } catch (error) {
    next(error);
  }
}

module.exports = controller;