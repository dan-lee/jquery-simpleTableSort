var i = 0;

function createTestTable(cols, rows, prefix) {
  prefix = prefix || 'sort';

  var id = 'testTable-'+(i++);

  var table = '<table id="'+id+'" class="plugin-test">';
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
  return $('#'+id);
}

$.fn.clickHeadCol = function(index, times) {
  times = times || 1;
  var col = this.find('th').eq(index);
  for (var i = 0; i < times; i++) {
    col.trigger('click');
  }
};

$.fn.collectActualData = function(index) {
  var actual = [];
  this.find('tbody tr').each(function() {
    actual.push($('td', this).eq(index).text());
  });

  return actual;
};