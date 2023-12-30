using AdventCodeLibrary;

namespace _14;

public static class Program
{
    public static void Main(string[] args)
    {
        var file = "input.txt";
        // var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/14/{file}";
        var input = AdventCode.ReadInput(path);

        // // // part 1
        // var total = Part1(input);
        // Console.WriteLine(total);

        // part 2
        var total = Part2(input);
        Console.WriteLine(total);
    }

    public static int Part2(string[] input)
    {
        // You cannot loop the billion time. 
        // But this sequence is repeating, so you can find when it starts to repeat and how long is the cycle
        // Then you can calculate what billion index would be

        var dirs = new List<Direction> { Direction.North, Direction.West, Direction.South, Direction.East };
        var i = 0;
        var all = new List<string>();
        var afterCyclePositions = input.Select(s => s).ToArray();

        var maxIndex = 1000_000_000 - 1;
        while (i < maxIndex)
        {
            foreach (var dir in dirs)
            {
                afterCyclePositions = MoveRocks(afterCyclePositions, dir);
            }

            // var for searching repetition
            var joinedAfterCyclePositions = string.Join("\n", afterCyclePositions);
            var startIndex = all.IndexOf(joinedAfterCyclePositions);
            if (startIndex != -1)
            {
                var cycleLength = i - startIndex;
                var remaining = maxIndex - i;
                var mod = remaining % cycleLength;
                afterCyclePositions = all[startIndex + mod].Split("\n");
                break;
            }
            all.Add(joinedAfterCyclePositions);
            i++;
        }
        // Console.WriteLine(string.Join("\n", after));

        var totalLoad = GetRocksTotalLoad(afterCyclePositions);
        return totalLoad;
    }

    public static string[] MoveRocks(string[] input, Direction dir)
    {
        var matrix = input.Select(row => row.ToCharArray()).ToArray();

        var dy = 0;
        var dx = 0;
        var sy = 0;
        var sx = 0;

        switch (dir)
        {
            case Direction.North:
                dy = -1;
                sy = 0;
                for (var y = sy; y < matrix.Length && y >= 0; y++)
                {
                    for (var x = sx; x < matrix[y].Length && x >= 0; x++)
                    {
                        Move(matrix, y, x, dy, dx);
                    }
                }

                break;
            case Direction.South:
                dy = 1;
                sy = input.Length - 1;
                for (var y = sy; y < matrix.Length && y >= 0; y--)
                {
                    for (var x = sx; x < matrix[y].Length && x >= 0; x++)
                    {
                        Move(matrix, y, x, dy, dx);
                    }
                }

                break;
            case Direction.East:
                dx = 1;
                sx = input[0].Length - 1;
                for (var x = sx; x < matrix[0].Length && x >= 0; x--)
                {
                    for (var y = sy; y < matrix.Length && y >= 0; y++)
                    {
                        Move(matrix, y, x, dy, dx);
                    }
                }

                break;
            case Direction.West:
                dx = -1;
                sx = 0;
                for (var x = sx; x < matrix[0].Length && x >= 0; x++)
                {
                    for (var y = sy; y < matrix.Length && y >= 0; y++)
                    {
                        Move(matrix, y, x, dy, dx);
                    }
                }

                break;
            default:
                throw new Exception("Unknown direction");
        }

        return matrix.Select(row => new string(row)).ToArray();
    }

    public static void Move(char[][] matrix, int y, int x, int dy, int dx)
    {
        if (matrix[y][x] != 'O') return;

        while (
            y + dy >= 0 &&
            y + dy < matrix.Length &&
            x + dx >= 0 &&
            x + dx < matrix[0].Length &&
            matrix[y + dy][x + dx] == '.')
        {
            matrix[y][x] = '.';
            matrix[y + dy][x + dx] = 'O';

            y += dy;
            x += dx;
        }
    }

    public static int Part1(string[] input)
    {
        var newInput = MoveRocksNorth(input);
        var totalLoad = GetRocksTotalLoad(newInput);
        Console.WriteLine(totalLoad);
        return totalLoad;
    }

    public static int GetRocksTotalLoad(string[] input)
    {
        var result = 0;
        for (var y = 0; y < input.Length; y++)
        {
            for (var x = 0; x < input[y].Length; x++)
            {
                if (input[y][x] == 'O')
                {
                    result += input.Length - y;
                }
            }
        }

        return result;
    }

    public static string[] MoveRocksNorth(string[] input)
    {
        var matrix = input.Select(row => row.ToCharArray()).ToArray();
        for (var y = 0; y < matrix.Length; y++)
        {
            for (var x = 0; x < matrix[y].Length; x++)
            {
                MoveUp(matrix, y, x);
            }
        }

        return matrix.Select(row => new string(row)).ToArray();
    }

    public static void MoveUp(char[][] matrix, int y, int x)
    {
        if (matrix[y][x] != 'O') return;
        while (
            y - 1 >= 0 &&
            matrix[y - 1][x] == '.')
        {
            matrix[y][x] = '.';
            matrix[y - 1][x] = 'O';
            y--;
        }
    }
}

public enum Direction
{
    North,
    South,
    East,
    West
}