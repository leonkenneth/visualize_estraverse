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
