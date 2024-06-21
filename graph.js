class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(node => {
      if(node.adjacent.has(vertex)) node.adjacent.delete(vertex)
      });

    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set(); //array of visited nodes
    let result = []; //array of values

    const DFSRecursion = (vertex) => {
      if(!vertex) return null;
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      for(let neighbor of vertex.adjacent){
        if(!visited.has(neighbor)) {
          DFSRecursion(neighbor);
        }
      }
      return null;
    }

    DFSRecursion(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visited = new Set();
    let result = [];

    while(toVisitQueue.length > 0){
      let vertex = toVisitQueue.shift();
      if(!visited.has(vertex)){
        visited.add(vertex);
        result.push(vertex.value);
      }
      for(let neighbor of vertex.adjacent){
        if(!visited.has(neighbor)) toVisitQueue.push(neighbor);
      }
    }
    
    return result;
  }
}

module.exports = {Graph, Node}