function bfsShortestPath(graph, source, target) {

    //Queue for BFS, starting with source code
    const queue = [[source]];

    //Set to track visited nodes
    const visited = new Set ([source]);
    while(queue.length > 0) {

        //Get the current path from the queue
        const path = queue.shift();

        //Get the last node in the path
        const node = path[path.length - 1];

        //Check if target node has been reached
        if (node === target) {
            return path;
        }

        //Iterate over neighbors of current node
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);

                //Create new path with added neighbor
                const newPath = [...path, neighbor];

                //Add new path to queue
                queue.push(newPath);
        }
    }
}

//If there is no path from source to target
return [];
}

//Sample Input:
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

const source = 'A';
const target = 'F';
const shortestPath = bfsShortestPath(graph, source, target);
console.log(`Shortest path from ${source} to ${target}:`, shortestPath); //Output: ['A', 'C', 'F']