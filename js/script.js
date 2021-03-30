console.log("load");

var options = {
  valueNames: ["title", "year", { name: "warnickNumber", attr: "data-id" }]
};

var workList = new List("work-list", options);
