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