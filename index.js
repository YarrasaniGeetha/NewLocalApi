const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());
const Employees = [
  { id: 1, Fname: "yarrasani", Lname: "Geetha" },
  { id: 2, Fname: "XYZ", Lname: "Nani" },
  { id: 3, Fname: "ABCD", LName: "Rani" },
  { id: 4, Fname: "Local", LName: "Rajeev" },
  { id: 5, Fname: "Power", LName: "Star" },
];

app.post("/api/Employees", (req, res) => {
  const schema = Joi.object({
    Fname: Joi.string().min(3).required(),
    Lname: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);

  if (validation.error)
    //400 bad request
    return res.status(400).send(validation.error.details[0].message); //to get the error message

  const emp = {
    id: Employees.length + 1, //when working with database id will be assigned by the database.
    Fname: req.body.Fname,
    Lname:req.body.Lname
  };
  Employees.push(emp);
  res.send(emp);
});
app.get("/", (req, res) => {
    res.send("Welcome to Piktorlabs");
  });
app.get("/api/Employees", (req, res) => {
    res.send(Employees);
  });
app.get("/api/Employees/:id", (req, res) => {
    var emp = Employees.find((c) => c.id === parseInt(req.params.id));
    if (!emp)
      return res.status(404).send("The emp with given id was not Found"); //404 Not found status
    res.send(emp);
  });
  
app.put("/api/Employees/:id", (req, res) => {
  //Look up the emp
  //if not exists,return 404 error
  var emp = Employees.find((c) => c.id === parseInt(req.params.id));
  if (!emp)
    return res.status(404).send("The emp with given id was not Found"); //404 Not found status
  res.send(emp);
  //validate
  //if invalid,return 400-bad request
  const validation = validateemp(req.body);
  if (validation.error)
    //400 bad request
    return res.status(400).send(validation.error.details[0].message); //to get the error message

  //update emp
  emp.Fname = req.body.Fname;
  emp.Lname = req.body.Lname;
  res.send(emp); //update the emp
});
app.delete("/api/Employees/:id", (req, res) => {
  //Look up the Employees
  //if not exists,return 404 error
  var emp = Employees.find((c) => c.id === parseInt(req.params.id));
  if (!emp)
    return res.status(404).send("The emp with given id was not Found"); //404 Not found status
  res.send(emp);
  //delete the emp data
  const index = Employees.indexOf(emp);
  Employees.splice(index, 1);
  res.send(emp);
});
function validateemp(emp) {
  const schema = Joi.object({
    Fname: Joi.string().min(3).required(),
    Lname: Joi.string().min(3).required(),
  });
  return schema.validate(emp);
}

//PORT--environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
