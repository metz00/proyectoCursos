const boom = require('@hapi/boom');
//VALIDAR EL ROL CORRECTO DEL USUARIO, SE EJECUTA ANTES DEL ENDPOINT
function checkRoles( roles ) { //close sure
  return (req, res, next) =>{
    const payload = req.user;
    if (roles.includes(payload.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  }
}

module.exports = { checkRoles }