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

        // // part 1
        var total = Part1(input);
        Console.WriteLine(total);

        // part 2
        // Part2(input);
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