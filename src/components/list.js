/**
 * Created by xiaowei on 2017/7/23.
 */
export default function () {
  ko.components.register('list-item', {
    viewModel: function (params) {
      this.name = params.value;
    },
    template: `<li>
        <span data-bind="text: name"></span>
    </li>`
  });
  ko.components.register('list', {
    viewModel: function (params) {
      this.children = ko.observableArray(params.content);
    },
    template: `<ul class="list-area" data-bind="foreach: children">
            <list-item  params="value: name"></list-item>
        </ul>`
  });

  var viewModel = {
    "children": [{"name": "Arnie"}, {"name": "Arnie2"}, {"name": "Arnie3"}]
  };

  ko.applyBindings(viewModel);
}
