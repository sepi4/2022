using System.Collections;
using AdventCodeLibrary;

public class Program
{
    public static void Main(string[] args)
    {
        // var file = "input.txt";
        var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/12/{file}";
        var input = AdventCode.ReadInput(path);

        var rows = input.Select(row => row.Split(' ')).ToList();

        // // part 1
        // Console.WriteLine(Part1(rows));

        // part 2

        // var unfolded = Unfold(rows);
        // Console.WriteLine(4 * Math.Pow(8, 4));


        Part2(rows);
    }

    public static long Part2(List<string[]> rows)
    {
        // var rowValue = "?###????????";
        var rowValue = "?###?????????###?????????###?????????###?????????###????????";
        var rowNums = "3,2,1,3,2,1,3,2,1,3,2,1,3,2,1";

        var indexes = GetIndexesOfUnknowns(rowValue);
        var binaries = GetPossibleBinaries(indexes.Count);

        var possibleValues = new List<string>();
        foreach (var binary in binaries)
        {
            var possibleValue = GetPossibleValue(rowValue, binary);
            if (GetHashTagSizes(possibleValue) == rowNums)
            {
                possibleValues.Add(possibleValue);
            }
        }

        Console.WriteLine(possibleValues.Count);
        return 0;
    }

    public static void PrintRows(List<string[]> rows)
    {
        foreach (var row in rows)
        {
            Console.WriteLine($"{row[0]} {row[1]}");
        }
    }

    public static List<string[]> Unfold(List<string[]> rows)
    {
        return rows.Select(row =>
        {
            var rowValue = string.Join("?", Enumerable.Repeat(row[0], 5));
            var rowNums = string.Join(",", Enumerable.Repeat(row[1], 5));
            return new string[]
            {
                rowValue,
                rowNums,
            };
        }).ToList();
    }

    public static long Part1(List<string[]> rows)
    {
        long sum = 0;
        foreach (var row in rows)
        {
            var rowValue = row[0];
            var rowNums = row[1];

            var indexes = GetIndexesOfUnknowns(row[0]);
            var binaries = GetPossibleBinaries(indexes.Count);

            var possibleValues = new List<string>();
            foreach (var binary in binaries)
            {
                var possibleValue = GetPossibleValue(rowValue, binary);
                if (GetHashTagSizes(possibleValue) == rowNums)
                {
                    possibleValues.Add(possibleValue);
                }
            }

            sum += possibleValues.Count;
        }

        return sum;
    }

    public static string GetPossibleValue(string rowValue, string binary)
    {
        var rowChars = rowValue.ToCharArray();
        var binaryChars = new Stack<char>(binary.ToCharArray().Reverse().ToList());
        for (var i = 0; i < rowChars.Length; i++)
        {
            if (rowChars[i] == '?')
            {
                var v = binaryChars.Pop();
                rowChars[i] = v == '0' ? '.' : '#';
            }
        }

        return new string(rowChars);
    }

    public static string GetHashTagSizes(string rowValue)
    {
        var vv = rowValue
            .Split('.')
            .Where(s => s.Length > 0 && s.All(c => c == '#'))
            .Select(s => s.Length)
            .ToList();
        return string.Join(',', vv);
    }

    public static List<int> GetIndexesOfUnknowns(string row)
    {
        var indexes = new List<int>();
        for (var i = 0; i < row.Length; i++)
        {
            if (row[i] == '?')
            {
                indexes.Add(i);
            }
        }

        return indexes;
    }

    public static void PrintInput(string[] input)
    {
        foreach (var line in input)
        {
            Console.WriteLine(line);
        }
    }

    public static List<string> GetPossibleBinaries(int length)
    {
        var binaries = new List<string>();
        var binary = new string('1', length);
        var num = Convert.ToInt32(binary, 2);
        for (int i = 0; i <= num; i++)
        {
            var bin = Convert.ToString(i, 2).PadLeft(length, '0');
            binaries.Add(bin);
        }

        return binaries;
    }
}