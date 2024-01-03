using _16;

namespace _16Test;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        
        var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/16/{file}";
        var input = File.ReadAllText(path);
        var ss = input.Split("\n");
        
        var x = Program.Part1(ss);
        Assert.Equal(46, x);
    }
    
    [Fact]
    public void Test2()
    {
        
        var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/16/{file}";
        var input = File.ReadAllText(path);
        var ss = input.Split("\n");
        
        var x = Program.Part2(ss);
        Assert.Equal(51, x);
    }
    
}