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
  </tr>
 </thead>

 <tbody>
  <tr>
   <td>2</td>
   <td>John</td>
   <td>02 Feb, 1989</td>
 </tr>
 <tr>
  <td>12</td>
  <td>Peter</td>
  <td>17 Jul, 1957</td>
 </tr>
 <!-- keep your data going -->
 </tbody>
</table>
```

### Advanced usage

*coming soon...*