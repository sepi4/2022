using AdventCodeLibrary;

namespace AdventCodeLibraryTest;

public class UnitTest1
{
    [Fact]
    public void Test_InputReaded()
    {
        var path = "/Users/serpo/tutorials/advent-of-code/2023/c#/AdventCodeLibraryTest/example.txt";
        var ss = new string[]
        {
            "kissa",
            "koira",
            "apina"
        };
        Assert.Equal(ss, AdventCode.ReadInput(path));
    }
    
    
    [Fact]
    public void Test_PrintInput()
    {
        var input = new string[]
        {
            "hello",
            "world"
        };
        var sw = new StringWriter();

        // will record the output to sw
        Console.SetOut(sw);

        AdventCode.PrintInput(input);

        var ac = sw.ToString();
        var ex = "hello\nworld\n";
        Assert.Equal(ex, ac);
    }
}