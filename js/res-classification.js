"use strict";

// helper to find the closest parent by class with on optional stop class to stop searching
function closest(el, clazz, stopClazz) {  //最近的父类，并停止搜索
  if (el.classList.contains(stopClazz)) return null;

  while ((el = el.parentElement) && !el.classList.contains(clazz) && !el.classList.contains(stopClazz)) {}

  return el.classList.contains(stopClazz) ? null : el;
}

var dnd = function dnd(element, options) {
  //找到所有的draggable属性的元素
  var draggableElements = element.querySelectorAll("[draggable=true]");
  var activeDragElement;
  var placeholderElement;
  var startElementRect;
  console.log("Drag'n'Drop Container: ", element, "Draggable elements: ", draggableElements);

  // 负责排序的功能
  var _onDragOver = function _onDragOver(event) {
    placeholderElement.style.width = startElementRect.width + "px";
    placeholderElement.style.height = startElementRect.height + "px";
    placeholderElement.style.top = startElementRect.top + "px";
    placeholderElement.style.left = startElementRect.left + "px";
    console.log("Placeholder: ", placeholderElement, "startRect: ", startElementRect);

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    //target
        //选择相应的playground
        var $uicard = $(".row").find(".card");

    var target = closest(event.target, 'uicard', 'playground');
    if (target && target !== activeDragElement) {
      var rect = target.getBoundingClientRect();
      var horizontal = event.clientY > startElementRect.top && event.clientY < startElementRect.bottom;
      var next = false;

      if (horizontal) {
        next = (event.clientX - rect.left) / (rect.right - rect.left) > .5;
      } else {
        next = !((event.clientY - rect.top) / (rect.bottom - rect.top) > .5);
      }

      console.log("onDragOver target classlist: ", target);

      // insert at new position
      element.insertBefore(activeDragElement, next && target.nextSibling || target);

      // update rect for insert poosition calculation
      startElementRect = activeDragElement.getBoundingClientRect();
    }
  };
  //选择card面板（分类card）
  let $uicard = $(".row").find(".card");
function chooseCard($uicard) {

}
  // handle drag event end
  var _onDragEnd = function _onDragEnd(event) {
    event.preventDefault();

    placeholderElement.style.width = "0px";
    placeholderElement.style.height = "0px";
    placeholderElement.style.top = "0px";
    placeholderElement.style.left = "0px";

    activeDragElement.classList.remove('moving');
    element.removeEventListener('dragover', _onDragOver, false);
    element.removeEventListener('dragend', _onDragEnd, false);
  };

  element.addEventListener("dragstart", function (event) {
    // don't allow selection to be dragged if it is not draggable
    if (event.target.getAttribute("draggable") !== "true") {
      event.preventDefault();
      return;
    }

    activeDragElement = event.target;
    startElementRect = activeDragElement.getBoundingClientRect();

    // Limiting the movement type
    event.dataTransfer.effectAllowed = 'move';

    // setData => Fuinktioniert im IE nicht bzw. nur bedingt
    // !!!! wird aber scheinbar im Firefox für die Vorschau benötigt
    //event.dataTransfer.setData('text/html', activeDragElement.innerHtml);
    event.dataTransfer.setData("text/uri-list", "http://www.mozilla.org");

    // Subscribing to the events at dnd
    element.addEventListener('dragover', _onDragOver, false);
    element.addEventListener('dragend', _onDragEnd, false);

    activeDragElement.classList.add('moving');

    // import placeholder
    placeholderElement = element.querySelector('.tpl-placeholder');
  });
};

// active the drag'n'drop functionallity for the .playground element
dnd(document.querySelector(".playground"));