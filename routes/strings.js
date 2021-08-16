"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const stringSchema = require("../schemas/stringSchema.json");
let stringList = require("../stringList");

/** POST /strings
 *
 * Add string coming from json body:
 *   { string }
 *
 * Returns { added: string }
 */

router.post("/", function (req, res, next) {
  console.log(req.body);

  const result = jsonschema.validate(req.body, stringSchema);

  if (!result.valid){
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  
  const { string } = req.body;
  stringList.push(string);
  return res.json({ added: string });
});

/** GET /strings
 *
 * Get list of strings
 *
 * Returns { strings }
 */

 router.get("/", function (req, res, next) {
   console.log("get route");
  const strings = stringList
  return res.json({ strings });
});


module.exports = router;