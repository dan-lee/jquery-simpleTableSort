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
    var cols = table.find('thead').find('th');

    var sortOrder = new Array(cols.length);
    var sortModes = ['asc', 'desc'];

    var defaults = {
      /**
       * Changes the prefix of the used css classes in the plugin.
       * These classes will be appended to the head columns to determine which state they were.
       * If the prefix 'sort' is already used in your project you can change it here
       */
      prefix: 'sort',

      /**
       * The sort order in which your table entries will be sorted first.
       * Possible entries:
       *  - asc: Ascending order (a-z, 0-9, ...)
       *  - desc: Descending order (z-a, 9-0, ...)
       */
      order: 'asc',

      /**
       * Do you want your table entries sorted initially (after creating it) then set this to value true
       */
      autoSort: null,

      /**
       * You can add your own sort methods here
       */
      sortMethods: {},

      /**
       * If you have no control over the table structure and it lacks of a table head, then set this value to true
       * and the first row of your table will be treatened as table head column
       */
      fixTableHead: false,

      /**
       * If you want exclude head columns
       */
      excludeSortColumns: [],
      onBeforeSort: function () {},
      onAfterSort: function () {}
    };
    options = $.extend({}, defaults, options);
    options.prefix += (options.prefix.slice(-1) !== '-' ? '-' : '');



    function init() {

    }

    if (options.fixTableHead) {
      fixTableHead();
    }

    if (options.autoSort !== null) {
      cols.eq(options.autoSort).trigger('click');
    }

    // main hook
    cols.on('click', sort);

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

    function fixTableHead() {
      var thead = $('<thead></thead>');
      var child = table.find('tr').first().remove();
      table.prepend(thead.append(child));
    }

    function sortBy(rows, method, columnIndex) {
      rows.sort(function(a, b) {
        a = $(a).find('td').eq(columnIndex).text();
        b = $(b).find('td').eq(columnIndex).text();

        if (!a || !b) {
          return 0;
        }

        return options.sortMethods[method](a, b) * (sortOrder[columnIndex] === sortModes[0] ? 1 : -1);
      });
    }

    function toggleOrder(element, columnIndex) {
      var currentOrder = sortOrder[columnIndex];
      var newKey, oldKey;

      if (typeof currentOrder === 'undefined') {
        newKey = sortModes.getIndexByValue(options.order);
        sortOrder[columnIndex] = sortModes[newKey];
        element.addClass(options.prefix + sortModes[newKey]);
      } else {
        oldKey = sortModes.getIndexByValue(currentOrder);
        // little trick for toggling of two values:
        // 1. cast to bool, 2. negate the value, 3. cast back to int
        newKey = +!oldKey;
        sortOrder[columnIndex] = sortModes[newKey];

        element.removeClass(options.prefix + sortModes[oldKey]).addClass(options.prefix + sortModes[newKey]);
      }
    }

    function isExcluded(current) {
      var len = cols.length;

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
      var columnIndex = cols.index(element);

      // check if there's a class starting with the given prefix
      if (new RegExp('\\b' + options.prefix).test(this.className)) {
        var method = this.className.match(new RegExp(options.prefix + '([^\\s]+)'))[1];

        if (options.sortMethods.hasOwnProperty(method)) {
          // is the clicked column an excluded one? if so: abort
          if (isExcluded(columnIndex)) {
            return false;
          }
          options.onBeforeSort.call(element, columnIndex);

          toggleOrder(element, columnIndex);
          sortBy(rows, method, columnIndex);
          render();

          // call after sort hook
          options.onAfterSort.call(element, columnIndex);

          return true;
        } else console.error('No suitable sort method found.');
      }
      return false;
    }

    function render() {
      $.each(rows, function(i, val) {
        table.append(val);
      });
    }

    return this;
  };
})(jQuery);
