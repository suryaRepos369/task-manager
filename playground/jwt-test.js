const jwt = require("jsonwebtoken");

  const verify = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlMzc1YjYwNTkyNTg2MmNhOGYyZWIiLCJpYXQiOjE2NTI0Mzg4NzV9.UigKWS3PSo7cuWrHwN2WhWGC4FqKneckJtqcFouAAlE",
    "verifyString"
  );
  console.log(verify);

