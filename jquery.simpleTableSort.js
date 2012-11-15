/**
 * Easiest way to sort your tables
 *
 * For further information and documentation go to https://github.com/dan-lee/jquery-easyTableSort
 *
 * Copyright (c) 2012 Daniel Lehr <daniellehr@gmx.de>, agixo <http://agixo.de>
 * Released under the MIT license.
 * See MIT-LICENSE.txt
 */

(function($) {
  $.fn.simpleTableSort = function(options) {
    var table = $(this);
    var rows = table.find('tbody').children();
    var headCols = table.find('thead').find('th');

    var sortOrder = new Array(headCols.length);
    var sortModes = ['asc', 'desc'];

    var defaults = {
      prefix: 'sort',
      order: sortModes[0],
      autoSort: false,
      sortMethods: {},
      excludeSortColumns: [],
      onBeforeSort: function () {},
      onAfterSort: function () {}
    };
    options = $.extend({}, defaults, options);
    options.prefix += (options.prefix.slice(-1) !== '-' ? '-' : '');

    // main hook
    headCols.on('click', sort);

    // http://stackoverflow.com/a/1353711/612202
    function isDate(d) {
      if (Object.prototype.toString.call(d) === '[object Date]') {
        return !isNaN(d.getTime());
      } else {
        return false;
      }
    }

    var defaultSortMethods = {
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

        if (isDate(a) && isDate(b)) {
          return (a > b) ? 1 : -1;
        }
        return 0;
      }
    };
    $.extend(options.sortMethods, defaultSortMethods);

    if (!Array.prototype.getIndexByValue) {
      Array.prototype.getIndexByValue = function(value) {
        var result = false;
        $.each(this, function(index, item) {
          if (value === item) {
            result = index;
            return false;
          }
        });
        return result;
      };
    }

    function toggleOrder(col) {
      var index = col.index;
      var currentOrder = sortOrder[index];
      var newKey, oldKey;

      if (typeof currentOrder === 'undefined') {
        newKey = sortModes.getIndexByValue(options.order);
        sortOrder[index] = sortModes[newKey];
        col.element.addClass(options.prefix + sortModes[newKey]);
      } else {
        oldKey = sortModes.getIndexByValue(currentOrder);
        // little trick for toggling of two values:
        // 1. cast to bool, 2. negate the value, 3. cast back to int
        newKey = +!oldKey;
        sortOrder[index] = sortModes[newKey];

        col.element.removeClass(options.prefix + sortModes[oldKey]).addClass(options.prefix + sortModes[newKey]);
      }
    }

    function isExcluded(current) {
      var len = headCols.length;

      // is the clicked column an excluded one? if so: abort
      var abort = false;
      $.each(options.excludeSortColumns, function(i, val) {
        val += val < 0 ? len : 0;

        if (current === val) {
          abort = true;
        }
      });
      return abort;
    }

    function sort() {
      var element = $(this);
      var columnLength = headCols.length;
      var columnIndex = headCols.index(element);

      var cn = this.className;
      // check if there's a class starting with the given prefix
      if (new RegExp('\\b' + options.prefix).test(cn)) {
        var method = cn.match(new RegExp(options.prefix + '([^\\s]+)'))[1];

        if (options.sortMethods.hasOwnProperty(method)) {
          options.onBeforeSort.call(element, columnIndex+1);

          // is the clicked column an excluded one? if so: abort
          if (isExcluded(columnIndex, columnLength)) {
            return;
          }

          // change order of the rows
          toggleOrder({
            element: element,
            index: columnIndex
          });

          rows.sort(function(a, b) {
            a = $(a).find('td').eq(columnIndex).text();
            b = $(b).find('td').eq(columnIndex).text();

            if (!a || !b) {
              return;
            }

            return options.sortMethods[method](a, b) * (sortOrder[columnIndex] === sortModes[0] ? 1 : -1);
          });

          // re-render the new sorted table
          render();

          // call after sort hook
          options.onAfterSort.call(element, columnIndex+1);
        } else console.error('No suitable sort method found.');
      }
    }

    function render() {
      $.each(rows, function(i, val) {
        table.append(val);
      });
    }

    return this;
  };
})(jQuery);
