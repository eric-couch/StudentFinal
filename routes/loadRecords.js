"use strict";
let fs = require("fs");

module.exports = {
  addRecords: function(csv, create) {
    let list = []; //  Array of students
    let data = fs.readFileSync(csv).toString(); //  read the students.csv file, convert to string
    let lines = data.split("\r\n"); //  Convert to array of individual lines by splitting on CR LF

    let firstLine = true; //  we want to ignore the header line

    for (let line of lines) {
      if (firstLine) {
        //  if this is just the first line we want to skip it
        firstLine = false; //  we are now past line 1
        continue; //  skip to next line
      }
      let fields = line.split(","); //  split the line into the individual student fields
      let student = create(fields); //  create a new Student record
      list.push(student); //  save to the array of students
    }
    return list; //  return the list of students back to the calling app
  }
};

// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : "")
  );
};
