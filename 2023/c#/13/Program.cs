using AdventCodeLibrary;

namespace _13;

public static class Program
{
    public static void Main(string[] args)
    {
        var file = "input.txt";
        // var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/13/{file}";
        var input = AdventCode.ReadInput(path);

        // part 1
        var sum = Part1(input);
        Console.WriteLine(sum);

        // part 2
    }

    public static int Part1(string[] input)
    {
        var notes = GroupNotes(input);

        var rowReflections = new List<(int, int)>();
        var columnReflections = new List<(int, int)>();
        foreach (var note in notes)
        {
            foreach (var item in FindTwoSameRows(note))
            {
                var rowReflection = IsReflection(note, item, Direction.Vertical);
                if (rowReflection)
                {
                    rowReflections.Add(item);
                }
            }
            foreach (var item in FindTwoSameColumns(note))
            {
                var colReflection = IsReflection(note, item, Direction.Horizontal);
                if (colReflection)
                {
                    columnReflections.Add(item);
                }
            }
        }

        var sum = columnReflections.Sum(pair => pair.Item1 + 1);
        sum += rowReflections.Sum(pair => 100 * (pair.Item1 + 1));
        return sum;
    }

    public static bool IsReflection(string[] note, (int, int) startingPosition, Direction direction)
    {
        var (a, b) = startingPosition;
        if (a == -1 || b == -1)
        {
            return false;
        }

        switch (direction)
        {
            case Direction.Vertical:
            {
                for (int aRowIndex = a, bRowIndex = b;
                     aRowIndex >= 0 && bRowIndex < note.Length;
                     aRowIndex--, bRowIndex++)
                {
                    var row1 = note[aRowIndex];
                    var row2 = note[bRowIndex];
                    if (row1 != row2)
                    {
                        return false;
                    }
                }

                return true;
            }
            case Direction.Horizontal:
            {
                for (int aColumnIndex = a, bColumnIndex = b;
                     aColumnIndex >= 0 && bColumnIndex < note[0].Length;
                     aColumnIndex--, bColumnIndex++)
                {
                    var aColumn = string.Join("", note.Select(row => row[aColumnIndex]).ToArray());
                    var bColumn = string.Join("", note.Select(row => row[bColumnIndex]).ToArray());
                    if (aColumn != bColumn)
                    {
                        return false;
                    }
                }

                return true;
            }
            default:
                return false;
        }
    }

    public static string[][] GroupNotes(string[] input)
    {
        var notes = new List<List<string>>();
        var group = new List<string>();
        foreach (var row in input)
        {
            if (row == "")
            {
                notes.Add(group);
                group = new List<string>();
                continue;
            }

            group.Add(row);
        }

        if (group.Count > 0)
        {
            notes.Add(group);
        }

        return notes.Select(g => g.ToArray()).ToArray();
    }

    public static List<(int, int)> FindTwoSameRows(string[] input)
    {
        var pairs = new List<(int, int)>();
        var previousRow = input[0];
        for (var i = 1; i < input.Length; i++)
        {
            var row = input[i];
            if (row == previousRow)
            {
                pairs.Add((i - 1, i));
            }

            previousRow = row;
        }

        return pairs;
    }

    public static List<(int, int)> FindTwoSameColumns(string[] input)
    {
        var pairs = new List<(int, int)>();
        var previousColumn = string.Join("", input.Select(row => row[0]).ToArray());
        for (var i = 1; i < input[0].Length; i++)
        {
            var column = string.Join("", input.Select(row => row[i]).ToArray());
            if (column == previousColumn)
            {
                pairs.Add((i - 1, i));
            }

            previousColumn = column;
        }

        return pairs;
    }
}

public enum Direction
{
    Vertical,
    Horizontal,
}