const { ExtractJwt, Strategy } = require("passport-jwt");
const { config } = require("../../../config/config");
const { models } = require("../../../libs/sequelize");
const boom = require("@hapi/boom");

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    console.log(payload, done)
    try {
      const _user = await models.Users.findByPk(payload.sub);
      console.log(_user)
      if (!_user) {
        return done(boom.unauthorized(), false); //en caso de que el user no exista acceso denegado
      }
      return done(null, {
        id: _user.id,
        email: _user.email,
        role: _user.role,
      });
    } catch (error) {
      console.log(error)
      done(error, false); // en caso de no encontrar el encabezado arroja un error y deniega el acceso
    }
  },
);

module.exports = jwtStrategy;
