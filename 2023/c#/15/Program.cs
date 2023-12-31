namespace _15;

public static class Program
{
    public static void Main(string[] args)
    {
        var file = "input.txt";
        // var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/15/{file}";
        var input = File.ReadAllText(path);

        // // part 1
        // var sum = Part1(input);
        // Console.WriteLine($"Part 1: {sum}");

        // part 2
        // var total = Part2(input);
    }
    
    public static int Part2(string input)
    {
        return 0;
    }

    public static int Part1(string input)
    {
        var split = input.Split(",");
        var sum = 0;
        foreach (var item in split)
        {
            var currentValue = 0;
            for (var i = 0; i < item.Length; i++)
            {
                var c = item[i];
                var aciiCode = (int)c;
                currentValue += aciiCode;
                currentValue *= 17;
                currentValue = currentValue % 256;
            }
            sum += currentValue;
        }
        return sum;
    }
}