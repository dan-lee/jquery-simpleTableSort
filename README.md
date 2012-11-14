## [jQuery](http://jquery.com) - easy table sort


This is a simple plugin for jQuery, which adds the capability of sorting rows of your tables by your own rules.  
[**Click here to see a demo**](http://agixo.de/dev/jquery-easyTableSort/demo.html)

### Basic usage

The easiest way to start off is:
```javascript
$(function() {
  $('#myTable').easyTableSort();
});
```

You have to adjust your table slightly, so that the plugin knows how to sort your rows:

```html
<table id="someTable">
 <thead>
  <tr>
   <th class="sort-numeric">Id</th>
   <th class="sort-alphabetic">Name</th>
   <th class="sort-date">Birth date</th>
   <th class="sort-float">Height</th>
  </tr>
 </thead>

 <tbody>
 <!-- keep your data going -->
 </tbody>
</table>
```

Just add one of the following built-in sort methods as class to your `th` tag:

* `sort-alphabetical`: Sorts data by alphabet (*case ignored*)
* `sort-numeric`: Sorts data by numeric values
* `sort-date`: Sorts data by date (Note: relies on JavaScript built-in [`Date`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date) object. Has to be compliant to [RFC2822 Section 3.3](http://tools.ietf.org/html/rfc2822#page-14))
* `sort-float`: Sorts data by floating point values

### Advanced usage

*coming soon...*