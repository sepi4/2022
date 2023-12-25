using AdventCodeLibrary;

namespace AdventCodeLibraryTest;

public class UnitTest1
{
    [Fact]
    public void InputReaded()
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
}