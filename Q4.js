function dijkstra(graph, startNode, endNode) {
    const distances = {}; // To hold the shortest distance to each node
    const previous = {};  // To track the path
    const priorityQueue = new PriorityQueue(); // Create a priority queue

    // Initialize distances and priority queue
    for (const node in graph) {
        distances[node] = Infinity; // Start with infinite distance
        previous[node] = null; // Previous node in path
    }
    distances[startNode] = 0; // Distance to start node is 0
    priorityQueue.enqueue(startNode, 0); // Enqueue the start node

    while (!priorityQueue.isEmpty()) {
        const currentNode = priorityQueue.dequeue().element; // Get node with shortest distance

        // If we reached the end node, reconstruct the path
        if (currentNode === endNode) {
            const path = [];
            let current = endNode;

            while (current) {
                path.unshift(current); // Add to the beginning of the path
                current = previous[current]; // Move to the previous node
            }
            return { path: path.join(' -> '), distance: distances[endNode] }; // Return path and distance
        }

        // Explore neighbors
        for (const neighbor in graph[currentNode]) {
            const weight = graph[currentNode][neighbor];
            const totalDistance = distances[currentNode] + weight;

            // Only consider this new path if it's better
            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance; // Update shortest distance
                previous[neighbor] = currentNode; // Update path
                priorityQueue.enqueue(neighbor, totalDistance); // Add to the priority queue
            }
        }
    }

    return { path: null, distance: Infinity }; // Return if no path found
}

// Priority Queue Class
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority); // Sort by priority
    }

    dequeue() {
        return this.items.shift(); // Remove and return the highest priority element
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Sample Input:
const graph = {
    A: { B: 5, C: 2 },
    B: { D: 4, E: 2 },
    C: { B: 8, E: 7 },
    D: { E: 6, F: 3 },
    E: { F: 1 },
    F: {}
};

const startNode = "A";
const endNode = "F";

// Sample Output:
const result = dijkstra(graph, startNode, endNode);
console.log(`Shortest path: ${result.path} and Distance: ${result.distance}`);
