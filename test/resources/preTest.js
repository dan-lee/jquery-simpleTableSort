// just throw some table together
function createTestTable(cols, rows, prefix) {
  prefix = prefix || 'sort';

  var table = '<table id="testTable" class="plugin-test">';
  table += '<thead>';
  table += '<tr>';
  var dataLen = 0;

  $.each(cols, function(sort, name) {
    ++dataLen;
    table += '<th class="'+prefix+'-'+sort+'">'+name+'</th>';
  });
  table += '</tr>';
  table += '</thead>';

  table += '<tbody>';
  $.each(rows, function(i, row) {
    if (row.length == dataLen) {
      table += '<tr>';
      $.each(row, function(i, value) {
        table += '<td>'+value+'</td>';
      });
      table += '</tr>';
    }
  });
  table += '</tbody>';
  table += '</table>';

  $('body').after(table);
  return $('#testTable');
}

var testToolkit = {
  getExpectedData: function(testData, column, orderBy) {
    if (!this.sortMethods[orderBy]) {
      throw "Sort method not found";
    }

    var expectedData = [];
    $.each(testData, function(i, val) {
      expectedData.push(val[column]);
    });
    return expectedData.sort(this.sortMethods[orderBy]);
  },

  sortMethods: {
    numeric: function(a, b) {
      return (parseInt(a) - parseInt(b));
    },
    float: function(a, b) {
      return (parseFloat(a) - parseFloat(b));
    },
    alphabetical: function(a, b) {
      return (a.toLowerCase() > b.toLowerCase()) ? 1 : -1;
    },
    date: function(a, b) {
      a = new Date(a);
      b = new Date(b);

      return (a > b) ? 1 : -1;
    }
  }
};