/**
 * Easiest way to sort your tables
 *
 * Basic usage:
 *
 * Javascript:
 *  $('#someTable').tableSort();
 *
 * HTML:
 *  <table id="someTable">
 *    <thead>
 *     <tr>
 *      <th class="sort-numeric">Id</th>
 *      <th class="sort-alphabetic">Name</th>
 *      <th class="sort-date">Birth date</th>
 *     </tr>
 *    </thead>
 *
 *    <tbody>
 *     <tr>
 *      <td>2</td>
 *      <td>John</td>
 *      <td>02 Feb, 1989</td>
 *     </tr>
 *     <tr>
 *      <td>12</td>
 *      <td>Peter</td>
 *      <td>17 Jul, 1957</td>
 *     </tr>
 *     ... keep on going
 *    </tbody>
 *  </table>
 *
 *
 *
 *
 * @author Daniel Lehr <daniellehr@gmx.de>
 * @internal-coding = utf-8
 * @internal UTF-Chars: ÄÖÜäöüß∆
 * created on 13.11.12 8:38 PM.
 */

(function($) {
  $.fn.easyTableSort = function(options) {

    var defaultOptions = {
      defaultOrder: 'asc',
      sortMethods: {},
      excludeSortColumns: [],
      onBeforeSort: function () {},
      onAfterSort: function () {}
    };
    options = $.extend(defaultOptions, options || {});

    var table = $(this);
    var rows  = table.find('tbody').children();

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

    table.find('thead').find('th').on('click', sort);

    // default ordering
    var orderBy = options.defaultOrder;

    function toggleOrder(el) {
      if (!el.hasClass('sort-asc') && !el.hasClass('sort-desc')) {
        el.addClass('sort-' + orderBy);
      } else if (el.hasClass('sort-asc')) {
        el
          .addClass('sort-desc')
          .removeClass('sort-asc');

        orderBy = 'desc';
        console.log('order set to desc');
      } else if (el.hasClass('sort-desc')) {
        el
          .addClass('sort-asc')
          .removeClass('sort-desc');

        orderBy = 'asc';
      }
    }

    function isExcluded(current, len) {
      // is the clicked column an excluded one? if so: abort
      var abort = false;
      $.each(options.excludeSortColumns, function(i, val) {
        val += val < 0 ? len : -1;

        if (current === val) {
          abort = true;
        }
      });
      return abort;
    }

    function sort() {
      var el = $(this);
      var columns = el.parent().children();
      var columnLength = columns.length;
      var columnIndex = columns.index(el);

      var cn = this.className;
      // check if there's a class starting with 'sort-'
      if (/\bsort-/.test(cn)) {
        var method = cn.match(/sort-([^\s]+)/)[1];

        if (options.sortMethods.hasOwnProperty(method)) {
          options.onBeforeSort.call(el, columnIndex+1);

          // is the clicked column an excluded one? if so: abort
          if (isExcluded(columnIndex, columnLength)) {
            return;
          }

          // change order of the rows
          toggleOrder(el);

          rows.sort(function(a, b) {
            a = $(a).find('td').eq(columnIndex).text();
            b = $(b).find('td').eq(columnIndex).text();

            if (!a || !b) {
              return;
            }

            console.log(orderBy);
            return options.sortMethods[method](a, b) * (orderBy === 'asc' ? 1 : -1);
          });

          // re-render the new sorted table
          render();

          // call after sort hook
          options.onAfterSort.call(el, columnIndex+1);
        } else console.error('No suitable sort method found.');
      }
    }

    function render() {
      $.each(rows, function(i, val) {
        table.append(val);
      });
    }
  };
})(jQuery);
