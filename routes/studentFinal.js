"use strict";

var express = require("express");
let records = require("./loadRecords"); //  load the load Records module

var router = (module.exports = express.Router());

let studentList = records.addRecords("students.csv", createStudent); //  read the students.csv file

//  Just a test to bring up the page
router.get("/", function(req, res) {
  let average;
  res.render("students", {
    students: studentList,
    average: average,
    title: "All Students"
  });
});

router.get("/searchName", function(req, res) {
  res.render("searchName");
});

//  just a check to see if the code works
router.get("/check/:check", function(req, res) {
  res.send(req.params.check);
});

//  Here is your endpoint needed to service the request from the POST request from the little mini form
router.post("/search", function(req, res) {
  //  TODO 1 - Create variables needed by your code. See TO DONT below, it mentions the variables needed
  let average = 0;
  let outList = studentList;
  let title = "Students";
  let major = req.body.major;
  let state = req.body.state;

  if (major == "" && state == "") {
    title = "All Students";
  }

  if (state) {
    outList = outList.filter(student => student.state == state);
    title += " from " + state;
  }

  if (major) {
    outList = outList.filter(student => student.major == major);
    title += " Majoring in  " + major;
  }

  //average = avgSalaryReduce(outList.map(x => x.salary));
  average = avgSalary(outList);

  //  TODO actually TO DONT
  //  These lines of code will NOT be changed. Below are listed the variables you need to assign
  //      outList - use to contain the list of students that fit the users criteria from the web page
  //      average - use to contain the average salary for the students you find
  //      title   - use to create a descriptive title for the page - "Students from Texas Majoring in Chemistry"
  average = average.formatMoney(0, "$ ");
  res.render("students", { students: outList, average: average, title: title });
});

router.get("/:studentId", function(req, res) {
  let studentId = req.params.studentId;
  let outList = studentList.filter(student => studentId == student.studentId);
  //res.send(outList);
  res.render("student", { students: outList });
});

function avgSalary(a) {
  let sum = 0;
  a.forEach(function(student) {
    sum += student.salary;
  });
  return sum / a.length;
}

function avgSalaryReduce(a) {
  let sum = a.reduce((acc, s) => acc + s);
  return sum / a.length;
}

function createStudent(fields) {
  return new Student(fields);
}

function Student(fields) {
  //  Id,Name,Major,Minor,HomeState,Salary,YearInSchool
  this.studentId = fields[0];
  this.name = fields[1];
  this.major = fields[2];
  this.minor = fields[3];
  this.state = fields[4];
  this.salary = fields[5] * 1;
  this.year = fields[6];
}
