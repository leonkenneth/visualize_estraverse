(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const textArea = document.getElementById("code-area");
const nodesArea = document.getElementById("nodes-area");
const propertiesArea = document.getElementById("properties-area");

const savedNodesAreaContent = localStorage.getItem("savedNodesAreaContent");
if (savedNodesAreaContent) {
  nodesArea.value = savedNodesAreaContent;
}

setInterval(() => {
  localStorage.setItem("savedNodesAreaContent", nodesArea.value);
}, 1000);

var editor = CodeMirror.fromTextArea(textArea, {
  mode: "javascript",
  lineNumbers: true
});

require("./hash-injector")(editor);

function highlightNode(node) {
  var loc = node.loc;

  editor.setSelection(
    { line: loc.start.line - 1, ch: loc.start.column },
    { line: loc.end.line - 1, ch: loc.end.column }
  );
}

function setProperties(node) {
  const nodeClone = Object.assign({}, node);
  delete nodeClone.loc;
  propertiesArea.value = JSON.stringify(nodeClone, null, 2);
}

let nodes = null;
let currentNodeIndex = null;

document.getElementById("step-button").addEventListener("click", function() {
  if (currentNodeIndex === null) {
    nodes = JSON.parse(nodesArea.value);
    currentNodeIndex = 0;
  }

  const nextNode = nodes[currentNodeIndex];

  highlightNode(nextNode);
  setProperties(nextNode);

  currentNodeIndex++;

  if (currentNodeIndex === nodes.length) {
    currentNodeIndex = null;
  }
});

},{"./hash-injector":2}],2:[function(require,module,exports){
/**
 * Created by azu on 2014/03/24.
 * LICENSE : MIT
 */
"use strict";
module.exports = function (editor) {
    var hash = location.hash;
    if(hash) {
        var trimed = hash[0] === "#" ? hash.substring(1) : hash;
        editor.setValue(decodeURIComponent(trimed));
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sZW8vZGV2L25vd29yay92aXN1YWxpemVfZXN0cmF2ZXJzZS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2xlby9kZXYvbm93b3JrL3Zpc3VhbGl6ZV9lc3RyYXZlcnNlL2FwcC9hcHAuanMiLCIvVXNlcnMvbGVvL2Rldi9ub3dvcmsvdmlzdWFsaXplX2VzdHJhdmVyc2UvYXBwL2hhc2gtaW5qZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZGUtYXJlYVwiKTtcbmNvbnN0IG5vZGVzQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9kZXMtYXJlYVwiKTtcbmNvbnN0IHByb3BlcnRpZXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9wZXJ0aWVzLWFyZWFcIik7XG5cbmNvbnN0IHNhdmVkTm9kZXNBcmVhQ29udGVudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2F2ZWROb2Rlc0FyZWFDb250ZW50XCIpO1xuaWYgKHNhdmVkTm9kZXNBcmVhQ29udGVudCkge1xuICBub2Rlc0FyZWEudmFsdWUgPSBzYXZlZE5vZGVzQXJlYUNvbnRlbnQ7XG59XG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZE5vZGVzQXJlYUNvbnRlbnRcIiwgbm9kZXNBcmVhLnZhbHVlKTtcbn0sIDEwMDApO1xuXG52YXIgZWRpdG9yID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEodGV4dEFyZWEsIHtcbiAgbW9kZTogXCJqYXZhc2NyaXB0XCIsXG4gIGxpbmVOdW1iZXJzOiB0cnVlXG59KTtcblxucmVxdWlyZShcIi4vaGFzaC1pbmplY3RvclwiKShlZGl0b3IpO1xuXG5mdW5jdGlvbiBoaWdobGlnaHROb2RlKG5vZGUpIHtcbiAgdmFyIGxvYyA9IG5vZGUubG9jO1xuXG4gIGVkaXRvci5zZXRTZWxlY3Rpb24oXG4gICAgeyBsaW5lOiBsb2Muc3RhcnQubGluZSAtIDEsIGNoOiBsb2Muc3RhcnQuY29sdW1uIH0sXG4gICAgeyBsaW5lOiBsb2MuZW5kLmxpbmUgLSAxLCBjaDogbG9jLmVuZC5jb2x1bW4gfVxuICApO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wZXJ0aWVzKG5vZGUpIHtcbiAgY29uc3Qgbm9kZUNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgbm9kZSk7XG4gIGRlbGV0ZSBub2RlQ2xvbmUubG9jO1xuICBwcm9wZXJ0aWVzQXJlYS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KG5vZGVDbG9uZSwgbnVsbCwgMik7XG59XG5cbmxldCBub2RlcyA9IG51bGw7XG5sZXQgY3VycmVudE5vZGVJbmRleCA9IG51bGw7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RlcC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICBpZiAoY3VycmVudE5vZGVJbmRleCA9PT0gbnVsbCkge1xuICAgIG5vZGVzID0gSlNPTi5wYXJzZShub2Rlc0FyZWEudmFsdWUpO1xuICAgIGN1cnJlbnROb2RlSW5kZXggPSAwO1xuICB9XG5cbiAgY29uc3QgbmV4dE5vZGUgPSBub2Rlc1tjdXJyZW50Tm9kZUluZGV4XTtcblxuICBoaWdobGlnaHROb2RlKG5leHROb2RlKTtcbiAgc2V0UHJvcGVydGllcyhuZXh0Tm9kZSk7XG5cbiAgY3VycmVudE5vZGVJbmRleCsrO1xuXG4gIGlmIChjdXJyZW50Tm9kZUluZGV4ID09PSBub2Rlcy5sZW5ndGgpIHtcbiAgICBjdXJyZW50Tm9kZUluZGV4ID0gbnVsbDtcbiAgfVxufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgYXp1IG9uIDIwMTQvMDMvMjQuXG4gKiBMSUNFTlNFIDogTUlUXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICAgIGlmKGhhc2gpIHtcbiAgICAgICAgdmFyIHRyaW1lZCA9IGhhc2hbMF0gPT09IFwiI1wiID8gaGFzaC5zdWJzdHJpbmcoMSkgOiBoYXNoO1xuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoZGVjb2RlVVJJQ29tcG9uZW50KHRyaW1lZCkpO1xuICAgIH1cbn07Il19
