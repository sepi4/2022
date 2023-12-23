// Part1();
Part2();

// FUNCTIONS  -------------------------------------------------------------------
void Part2()
{
    // const string file = "example2.txt";
    // const string file = "example3.txt";
    // const string file = "example4.txt";
    const string file = "input.txt";
    const string path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/10/{file}";
    var input = ReadInput(path);
    var nodes = InitNodes(input);
    var queue = new Queue<Node>();

    // FIND S INDEXES
    var startingNode = FindStartingNode(nodes);
    startingNode.Value = 0;

    queue.Enqueue(startingNode);
    while (queue.Count > 0)
    {
        // TAKE FIRST ITEM (X) FROM QUEUE
        var currentNode = queue.Dequeue();

        // PUT ALL S NEIGHBORS THAT ARE POSSIBLE TO MOVE TO FROM S TO QUEUE
        var neighbors = GetNeighbors(currentNode, nodes);
        foreach (var node in neighbors)
        {
            node.Value = currentNode.Value + 1;
            queue.Enqueue(node);
        }
        // REPEAT UNTIL QUEUE IS EMPTY
    }

    var edges = GetEdges(nodes, startingNode);
    var nodesNotInLoop = nodes.SelectMany(nn => nn).Where(n => n.Value == -1).ToArray();
    RayCasting(edges, nodesNotInLoop);
    // PrintNodesCharOrInLoop(nodes);
    var amountInside = nodes.SelectMany(nn => nn).Count(node => node.IsInLoop);
    Console.WriteLine($"Amount inside: {amountInside}");
}

(Node, Node)[] GetEdges(Node[][] nodes, Node startingNode)
{
    var edges = new List<(Node, Node)>();
    var visited = new HashSet<Node>();
    var currentNode = startingNode;
    visited.Add(currentNode);
    var inc = 1;
    // loop increment up
    while (true)
    {
        var nextNode = GetNextNode(nodes, visited, currentNode, currentNode.Value + inc);
        if (nextNode == null)
        {
            break;
        }
        edges.Add((currentNode, nextNode));
        visited.Add(nextNode);
        currentNode = nextNode;
    }
    
    // MAX VALUE IS FOUND
    
    inc = -1;
    // loop increment down
    while (true)
    {
        var nextNode = GetNextNode(nodes, visited, currentNode, currentNode.Value + inc);
        if (nextNode == null)
        {
            break;
        }
        edges.Add((currentNode, nextNode));
        visited.Add(nextNode);
        currentNode = nextNode;
    }
    
    // add last edge, which is between last node and starting node
    edges.Add((currentNode, startingNode));
    return edges.ToArray();
}

Node GetNextNode(Node[][] nodes, HashSet<Node> visited, Node currentNode, int expectedValue)
{
    (int, int)[] arr =
    {
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1),
    };
    foreach (var (y, x) in arr)
    {
        var newY = currentNode.Y + y;
        var newX = currentNode.X + x;
        
        // check that new indexes in limits
        if (newY < 0 || newY >= nodes.Length || newX < 0 || newX >= nodes[0].Length)
        {
            continue;
        }
        if (nodes[newY][newX].Value == expectedValue && !visited.Contains(nodes[newY][newX]))
        {
            return nodes[newY][newX];
        }
    }
    return null;
}

/**
 * Ray casting algorithm,
 * will cast ray to one direction and count how many times it hits the wall,
 * if it hits odd amount of times, then point is inside the loop
 * 
 * https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
 */
void RayCasting((Node, Node)[] edges, Node[] nodesNotInLoop)
{
    foreach (var node in nodesNotInLoop)
    {
        var inside = IsInside(edges, node);
        if (inside)
        {
            node.IsInLoop = true;
        }
    }
}

bool IsInside((Node, Node)[] edges, Node currentNode)
{
    var wallHits = 0;
    foreach (var edge in edges)
    {
        var (aNode, bNode) = edge;
        // 1 condition - if node is between a.Y and b.Y vertically a
        if (currentNode.Y < aNode.Y != currentNode.Y < bNode.Y)
        {
            // 2 condition - if node is before / edge
            var v = aNode.X + ((currentNode.Y - aNode.Y) / (bNode.Y - aNode.Y)) * (bNode.X - aNode.X);
            if (currentNode.X < v)
            {
                wallHits++;
            }
        }
    }
    return wallHits % 2 == 1;
}

void PrintNodesCharOrInLoop(Node[][] nodes)
{
    foreach (var row in nodes)
    {
        foreach (var node in row)
        {
            if (node.Value > -1)
            {
                Console.Write(node.Char);
            }
            else
            {
                if (node.IsInLoop)
                {
                    Console.Write("x");
                }
                else
                {
                    Console.Write("o");
                }
            }
        }

        Console.WriteLine();
    }
}

void Part1()
{
    // const string file = "example.txt";
    const string file = "input.txt";

    const string path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/10/{file}";
    var input = ReadInput(path);
    var nodes = InitNodes(input);
    var queue = new Queue<Node>();

    // FIND S INDEXES
    var startingNode = FindStartingNode(nodes);
    startingNode.Value = 0;

    queue.Enqueue(startingNode);
    while (queue.Count > 0)
    {
        // TAKE FIRST ITEM (X) FROM QUEUE
        var currentNode = queue.Dequeue();

        // PUT ALL S NEIGHBORS THAT ARE POSSIBLE TO MOVE TO FROM S TO QUEUE
        var neighbors = GetNeighbors(currentNode, nodes);
        foreach (var node in neighbors)
        {
            node.Value = currentNode.Value + 1;
            queue.Enqueue(node);
        }
        // REPEAT UNTIL QUEUE IS EMPTY
    }

    var max = GetMaxValue(nodes);
    Console.WriteLine($"Max value: {max}");
}

int GetMaxValue(Node[][] nodes)
{
    return nodes.SelectMany(nn => nn).Max(n => n.Value);
}

void PrintNodeValues(Node[][] nodes)
{
    var max = GetMaxValue(nodes);
    
    foreach (var row in nodes)
    {
        foreach (var node in row)
        {
            Console.Write($"{node.Value, 2} ");
        }

        Console.WriteLine();
    }
}

void PrintInput(string[] input)
{
    foreach (var item in input)
    {
        Console.WriteLine(item);
    }
}

Node[][] InitNodes(string[] input)
{
    var nodes = new Node[input.Length][];
    for (var i = 0; i < input.Length; i++)
    {
        var row = input[i];
        nodes[i] = new Node[row.Length];
        for (var j = 0; j < row.Length; j++)
        {
            nodes[i][j] = new Node
            {
                Y = i,
                X = j,
                Value = -1,
                Char = input[i][j],
                IsInLoop = false,
            };
        }
    }

    return nodes;
}

Node[] GetNeighbors(Node node, Node[][] nodes)
{
    var neighbors = new List<Node>();

    var possibleDirections = GetPossibleDirections(node.Char);
    foreach (var d in possibleDirections)
    {
        int newY = node.Y;
        int newX = node.X;
        switch (d)
        {
            case Direction.Up:
                newY--;
                break;
            case Direction.Down:
                newY++;
                break;
            case Direction.Left:
                newX--;
                break;
            case Direction.Right:
                newX++;
                break;
        }

        // check that new indexes in limits
        if (newY < 0 || newY >= nodes.Length || newX < 0 || newX >= nodes[0].Length)
        {
            continue;
        }

        // make sure that node is visited already
        if (
            nodes[newY][newX].Value == -1 &&
            IsPossibleToMoveTo(nodes[newY][newX], GetComingFromDirection(nodes[newY][newX], node))
        )
        {
            neighbors.Add(nodes[newY][newX]);
        }
    }

    return neighbors.ToArray();
}

bool IsPossibleToMoveTo(Node node, Direction fromDirection)
{
    if (node.Char == 'S')
    {
        return false;
    }

    var possibleDirections = GetPossibleDirections(node.Char);
    return possibleDirections.Contains(fromDirection);
}

Direction GetComingFromDirection(Node node, Node prevNode)
{
    if (node.X == prevNode.X)
    {
        if (node.Y > prevNode.Y)
        {
            return Direction.Up;
        }

        if (node.Y < prevNode.Y)
        {
            return Direction.Down;
        }

        throw new Exception("Nodes are on the same position");
    }

    if (node.Y == prevNode.Y)
    {
        if (node.X > prevNode.X)
        {
            return Direction.Left;
        }

        if (node.X < prevNode.X)
        {
            return Direction.Right;
        }

        throw new Exception("Nodes are on the same position");
    }

    throw new Exception("Nodes are on the same position");
}

Direction[] GetPossibleDirections(char c)
{
    switch (c)
    {
        case '-':
            return new[] { Direction.Left, Direction.Right };
        case '|':
            return new[] { Direction.Up, Direction.Down };
        case 'L':
            return new[] { Direction.Up, Direction.Right };
        case 'J':
            return new[] { Direction.Up, Direction.Left };
        case '7':
            return new[] { Direction.Down, Direction.Left };
        case 'F':
            return new[] { Direction.Right, Direction.Down };
        case 'S':
            return new[] { Direction.Up, Direction.Right, Direction.Down, Direction.Left };
        default:
            return Array.Empty<Direction>();
    }
}

Node FindStartingNode(Node[][] nodes)
{
    foreach (var row in nodes)
    {
        foreach (var node in row)
        {
            if (node.Char == 'S')
            {
                return node;
            }
        }
    }

    return null;
}

string[] ReadInput(string path)
{
    var input = File.ReadAllText(path);
    return input.Split("\n");
}

// CONSTANTS  -------------------------------------------------------------------
public enum Direction
{
    Up,
    Down,
    Left,
    Right
}

// CLASSES  -------------------------------------------------------------------
public class Node
{
    public int Y { get; set; }
    public int X { get; set; }
    public int Value { get; set; }
    public char Char { get; set; }
    public bool IsInLoop { get; set; }
}