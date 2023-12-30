namespace AdventCodeLibrary;

public class AdventCode
{
    public static string[] ReadInput(string path)
    {
        var input = File.ReadAllText(path);
        return input.Split(Environment.NewLine);
    }
    
    public static void PrintInput(string[] input)
    {
        foreach (var line in input)
        {
            Console.WriteLine(line);
        }
    }
}