/*Given Input:
(0, 1) = 4
(0, 7) = 8
(1, 2) = 8
(1, 7) = 11
(2, 3) = 7
(2, 8) = 2
(2, 5) = 4
(3, 4) = 9
(3, 5) = 14 
(4, 5) = 10
(5, 6) = 2
(6, 7) = 1
(6, 8) = 6
(7, 8) = 7*/

class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element) {
        this.elements.push(element);
        this.elements.sort((a, b) => a.weight - b.weight);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function prim(graph, startVertex) {
    const visted = new Set();
    const minEdges = new PriorityQueue();
    let totalCost = 0;

    //Start from the initial vertex
    visted.add(startVertex);
    for (const edge of graph[startVertex]) {
        minEdges.enqueue(edge);
    }

    while(!minEdges.isEmpty()) {
        const minEdge = minEdges.dequeue();
        const { from, to, weight } = minEdge;

        //Proceed if destination vertex is not visited
        if (!visted.has(to)) {
            visted.add(to);
            totalCost += weight;

            //Add all edges from new vertex
            for (const edge of graph[to]) {
                if (!visted.has(edge.to)) {
                    minEdges.enqueue(edge);
                }
            }
        }
    }
    return totalCost;
}

//Sample Input:
const graph = {
    0: [new Edge(0, 1, 4), new Edge(0, 7, 8)],
    1: [new Edge(1, 0, 4), new Edge(1, 2, 8), new Edge(1, 7, 11)],
    2: [new Edge(2, 1, 8), new Edge(2, 3, 7), new Edge(2, 8, 2), new Edge(2, 5, 4)],
    3: [new Edge(3, 2, 7), new Edge(3, 4, 9), new Edge(3, 5, 14)],
    4: [new Edge(4, 3, 9), new Edge(4, 5, 10)],
    5: [new Edge(5, 2, 4), new Edge(5, 3, 14), new Edge(5, 4, 10), new Edge(5, 6, 2)],
    6: [new Edge(6, 5, 2), new Edge(6, 7, 1), new Edge(6, 8, 6)],
    7: [new Edge(7, 0, 8), new Edge(7, 1, 11), new Edge(7, 6, 1), new Edge(7, 8, 7)],
    8: [new Edge(8, 2, 2), new Edge(8, 6, 6), new Edge(8, 7, 7)]
};

//Start Prim's alogrithm from vertex 0
const minimumCost = prim(graph, 0);
console.log(`Minimum cost to connect all rooms: ${minimumCost}`); //Output: 37
