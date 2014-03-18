## [jQuery](http://jquery.com) - simple table sort


This is a simple plugin for jQuery, which adds the capability of sorting rows of your tables by your own rules.  

[**Click here to see a demo**](http://agixo.de/dev/jquery-simpleTableSort/demo/demo.html)

## Basic usage

The easiest way to start off is:

```html
<script src="jquery.js"></script>
<script src="jquery.simpleTableSort.js"></script>
```

```javascript
$(function() {
  $('#myTable').simpleTableSort();
});
```

You have to adjust your table slightly, so that the plugin knows how to sort your rows:

```html
<table id="myTable">
 <thead>
  <tr>
   <th class="sort-numeric">Id</th>
   <th class="sort-alphabetical">Name</th>
   <th class="sort-date">Birth date</th>
   <th class="sort-float">Height</th>
  </tr>
 </thead>

 <tbody>
 <!-- lots of data -->
 </tbody>
</table>
```

Just add one of the following built-in sort methods as class to your `th` tag:

* `sort-alphabetical`: Sorts data by alphabet (*case ignored*)
* `sort-numeric`: Sorts data by numeric values
* `sort-date`: Sorts data by date (Note: relies on JavaScript built-in [`Date`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date) object. Has to be compliant to [RFC2822 Section 3.3](http://tools.ietf.org/html/rfc2822#page-14))
* `sort-float`: Sorts data by floating point values

When a column is clicked a class name is appended: `sort-asc` or `sort-desc`.

So when clicking on the column "Id" with [default options](#options) the modified `th` tag looks like this:

```html
<!-- first click -->
<th class="sort-numeric sort-asc">Id</th>

<!-- second click -->
<th class="sort-numeric sort-desc">Id</th>
```


## Advanced usage

You can easily configurate the plugin with omitting an object like this
```javascript
$('#myTable').simpleTableSort({
  order: 'asc',
  // ...
});
```
### Options

<table>
 <thead>
  <tr>
   <th>Option</th>
   <th>Type</th>
   <th>Default</th>
   <th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td valign="top"><code>prefix</code></td>
   <td valign="top">string</td>
   <td valign="top"><code>"sort"</code></td>
   <td valign="top">
    Changes the prefix of the used css classes in the plugin.<br>
    These classes will be appended to the head columns to determine in which sort state they were ('asc' or 'desc').<br>
    If the prefix 'sort' is already used in your project you can change this value.
   </td>
  </tr>
  <tr>
   <td valign="top"><code>order</code></td>
   <td valign="top">string</td>
   <td valign="top"><code>"asc"</code></td>
   <td valign="top">The sort order in which the table rows will be sorted on first sort.<br>
       Possible values:
       <ul>
        <li>asc: Ascending order (a-z, 0-9, ...)</li>
        <li>desc: Descending order (z-a, 9-0, ...)</li>
       </ul>
   </td>
  </tr>
  <tr>
   <td valign="top"><code>dynamic</code></td>
   <td valign="top">bool</td>
   <td valign="top"><code>false</code></td>
   <td valign="top">
    If the table is dynamic, meaning the table gets updated by AJAX or something else, this setting should be set to true.<br>
    Otherwise the initial table data is restored.
    <br><br>
    This is for performance reason: If it's a static table the rows don't have to be reprocessed every sort change.
   </td>
  </tr>
    <tr>
     <td valign="top"><code>multiSortStates</code></td>
     <td valign="top">bool</td>
     <td valign="top"><code>false</code></td>
     <td valign="top">
       With this option set to <code>true</code> the state classes (e.g. 'sort-asc' and 'sort-desc') won't be removed when a different column is sorted.<br>
       However, the last sort state is never 'forgotten', it will always be the opposite of the last sorted (or the default)
     </td>
    </tr>
  <tr>
   <td valign="top"><code>autoSort</code></td>
   <td valign="top">int</td>
   <td valign="top"><code>null</code></td>
   <td valign="top">
    Adds the possibility to sort the table entries when the table is created.<br>
    Accepts index values of table head column (zero-based).
   </td>
  </tr>
  <tr>
   <td valign="top"><code>sortMethods</code></td>
   <td valign="top">object</td>
   <td valign="top"><code>{}</code></td>
   <td valign="top">
     You can extend the built-in sort methods with your own ones here.
     <br><br>
     Example: <i>Change "dd-mm-yyy" formatted date to JavaScript compatible "mm-dd-yyyy"</i>:<br>
     <pre>
sortMethods: {
  myDate: function(a, b) {
    a = a.split('.');
    a = a[1]+'.'+a[0]+'.'+a[2];

    b = b.split('.');
    b = b[1]+'.'+b[0]+'.'+b[2];

    return new Date(a) > new Date(b) ? 1 : -1;
  }
}</pre>
    To sort by this new method you can add this as css class to your <code>th</code> tag:
    <pre>&lt;th class="sort-myDate"&gt;My date&lt;/th&gt;</pre>
    (Don't forget to change the prefix, if you changed it via option <code>prefix</code>)
   </td>
  </tr>
  <tr>
   <td valign="top"><code>fixTableHead</code></td>
   <td valign="top">bool</td>
   <td valign="top"><code>false</code></td>
   <td valign="top">
    If you have no control over the table structure and it lacks of a table head, then set this value to true
    and the first row of your table will be treatened as table head column
   </td>
  </tr>
  <tr>
   <td valign="top"><code>excludeSortColumns</code></td>
   <td valign="top">array</td>
   <td valign="top"><code>[]</code></td>
   <td valign="top">
    Table head columns can be excluded from to be sorted by adding the index.
    <br><br>
    Example which excludes the second row (zero-based):
    <pre>excludeSortColumns: [ 1 ]</pre>
    Example which excludes the first and the last row:
    <pre>excludeSortColumns: [ 0, -1 ]</pre>
    (Negative values means to start from the end of the columns)
  </td>
  </tr>
  <tr>
   <td valign="top"><code>onBeforeSort</code></td>
   <td valign="top">Event</td>
   <td valign="top"><i>empty</i></td>
   <td valign="top">
    <i>coming soon...</i>
   </td>
  </tr>
  <tr>
   <td valign="top"><code>onAfterSort</code></td>
   <td valign="top">Event</td>
   <td valign="top"><i>empty</i></td>
   <td valign="top">
    <i>coming soon...</i>
   </td>
  </tr>
 </tbody>
</table>

## License

This plugin is licensed under the MIT license.  
See [**MIT-LICENSE.txt**](https://github.com/dan-lee/jquery-simpleTableSort/blob/master/MIT-LICENSE.txt)
