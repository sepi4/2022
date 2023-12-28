namespace AdventCodeLibrary;

public class AdventCode
{
    public static string[] ReadInput(string path)
    {
        var input = File.ReadAllText(path);
        return input.Split(Environment.NewLine);
    }
}