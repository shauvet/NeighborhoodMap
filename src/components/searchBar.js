/**
 * Created by xiaowei on 2017/7/23.
 */
export default function () {
  ko.components.register('search-bar', {
    viewModel: function (input) {
      this.searchVal = ko.observable('');
      this.searchAction = () => {};
    },
    template: `<div class="search-area">
<input type="text" id="searchVal" name="searchVal" data-bind="textInput: searchVal">
<button type="button" data-bind="click: searchAction">Filter</button>
</div>`
  })
}