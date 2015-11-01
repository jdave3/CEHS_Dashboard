$(function() {
  $('#tablecontainer').CSVToTable('sample1610.csv');
});

$('#tablecontainer').CSVToTable('sample1610.csv',{

// class name to apply to the <table> tag
tableClass: "CSVTable",

// class name to apply to the <thead> tag
theadClass: "",

// class name to apply to the <th> tag
thClass: "",

// class name to apply to the <tbody> tag
tbodyClass: "",

// class name to apply to the <tr> tag
trClass: "",

// class name to apply to the <td> tag
tdClass: "",

// path to an image to display while CSV/TSV data is loading
loadingImage: "",

// text to display while CSV/TSV is loading
loadingText: "Loading CSV data...",

// separator to use when parsing CSV/TSV data
separator: ",",

startLine: 0

});

