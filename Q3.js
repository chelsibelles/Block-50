function dfsAllRoutes(graph, source, target) {
    const result = []; // To store all possible routes
    const path = [];   // Current path

    function dfs(current) {
        path.push(current); // Add current node to path

        if (current === target) {
            result.push([...path]); // If we reached the target, add the path to the result
        } else {
            for (const neighbor of graph[current]) {
                // Only continue if the neighbor is not already in the path
                if (!path.includes(neighbor)) {
                    dfs(neighbor); // Recurse with the neighbor
                }
            }
        }

        path.pop(); // Remove the current node to backtrack
    }

    dfs(source); // Start DFS from the source node
    return result; // Return all found routes
}

// Sample Input:
const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E"],
};

const source = "A";
const target = "F";

// Sample Output:
const allRoutes = dfsAllRoutes(graph, source, target);
console.log("All possible routes from A to F:", allRoutes);
