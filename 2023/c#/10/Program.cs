Part1();
// Part2();

// FUNCTIONS  -------------------------------------------------------------------
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
        // take first item (x) from queue
        var currentNode = queue.Dequeue();

        // PUT ALL S NEIGHBORS THAT ARE POSSIBLE TO MOVE TO FROM S TO QUEUE
        var neighbors = GetNeighbors(currentNode, nodes);
        foreach (var node in neighbors)
        {
            node.Value = currentNode.Value + 1;
            queue.Enqueue(node);
        }
        // repeat until queue is empty
    }

    var max = nodes.SelectMany(nn => nn).Max(n => n.Value);
    Console.WriteLine($"Max value: {max}");
}


void PrintNodeValues(Node[][] input)
{
    foreach (var row in input)
    {
        foreach (var node in row)
        {
            Console.Write($"{node.Value} ");
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

void Part2()
{
    const string path = "";
    var input = ReadInput(path);
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
}