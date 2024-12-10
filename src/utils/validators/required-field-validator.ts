const { query } = require("express-validator");

const requiredFieldValidator = (field: string) => query(field).notEmpty();

export default requiredFieldValidator;
