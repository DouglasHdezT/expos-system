const User = require("../models/User.model");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("./../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    //Obtener la info
    const { username, email, password, name, team } = req.body;

    //Verificar la existencia del correo y el user
    const user = 
      await User.findOne({ $or: [{username: username}, {email: email}] });

    if(user){
      return res.status(409).json({ error: "User already exists!" });
    }
    // Si no existe lo creamos
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      name: name,
      team: team,
      roles: [ROLES.USER]
    })

    await newUser.save();

    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);    
  }
}

controller.login = async (req, res, next) => {
  try {
    // Obtener la info -> identificador, password
    const { identifier, password } = req.body;

    // Verificar si el usuario exite
    const user = 
      await User.findOne({ $or: [{username: identifier}, {email: identifier}] });

    // Si no exite, retornar 404
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Si existe, verificamos la password
    // Si la password no coincide -> 401
    if(!user.comparePassword(password)) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    // Si la password  coincide -> Loggeamos (TODO)
    // Crear un token
    const token = await createToken(user._id);

    // Almacenar Token
    // Verificar la integridad de los tokens actuales - max 5 sesiones
    let _tokens = [...user.tokens];
    const _verifyPromises = _tokens.map(async (_t) => {
      const status = await verifyToken(_t);
      return status ? _t : null;
    });

    _tokens = (await Promise.all(_verifyPromises))
      .filter(_t => _t)
      .slice(0, 4);

    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();

    // Devolver token
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
} 

controller.whoami = async (req, res, next) => {
  try {
    const { _id, username, email, roles, name } = req.user;
    return res.status(200).json({
      _id, username, email, roles, name
    })
  } catch (error) {
    next(error); 
  }
}

module.exports = controller;