const addUserCheck = (req, res, next) => {
  const newUser = req.body;
  try {
    if (newUser) {
      const { id, photoUrl, name, gender, contact, address } = newUser;
      if (
        id === undefined ||
        photoUrl === undefined ||
        name === undefined ||
        gender === undefined ||
        contact === undefined ||
        address === undefined
      ) {
        res.status(409).send({
          message: "Property is missing!",
        });
      } else if (!id || !photoUrl || !name || !gender || !contact || !address) {
        res.status(409).send({
          message: "Null value found in a property!",
        });
      } else {
        next();
      }
    }
  } catch (error) {}
};

module.exports = addUserCheck;
