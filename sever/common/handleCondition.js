var handleCondition = (condition, otherCondition) => {
  const keys = [...Object.keys(condition)];
  const values = [...Object.values(condition)];

  let obj = {};

  keys.map((item, index) => {
    if (item == "pattern" && otherCondition) {
      if (values[index] !== "") {
        obj[`list.${otherCondition}`] = { $regex: values[index] };
      }
    } else {
      if (values[index] !== "") {
        obj[`list.${item}`] = values[index];
      }
    }
  });

  return obj;
};

module.exports = handleCondition;
