namespace _12Test;

public class UnitTest1
{
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

        Program.PrintInput(input);

        var ac = sw.ToString();
        var ex = "hello\nworld\n";
        Assert.Equal(ex, ac);
    }

    [Fact]
    public void Test_GetIndexesOfUnknowns()
    {
        var input = "1?1?1";
        var ac = Program.GetIndexesOfUnknowns(input);
        var ex = new List<int> { 1, 3 };
        Assert.Equal(ex, ac);

        input = "kissa";
        ac = Program.GetIndexesOfUnknowns(input);
        ex = new List<int> { };
        Assert.Equal(ex, ac);

        input = "?????";
        ac = Program.GetIndexesOfUnknowns(input);
        ex = new List<int> { 0, 1, 2, 3, 4 };
        Assert.Equal(ex, ac);
    }

    [Fact]
    public void Test_GetPossibleBinaries()
    {
        var ac = Program.GetPossibleBinaries(2);
        var ex = new List<string> { "00", "01", "10", "11" };
        Assert.Equal(ex, ac);

        ac = Program.GetPossibleBinaries(1);
        ex = new List<string> { "0", "1" };
        Assert.Equal(ex, ac);

        ac = Program.GetPossibleBinaries(3);
        ex = new List<string> { "000", "001", "010", "011", "100", "101", "110", "111" };
        Assert.Equal(ex, ac);
    }

    [Fact]
    public void Test_GetPossibleValue()
    {
        var rowValue = ".?#?.";
        var binary = "00";
        var ac = Program.GetPossibleValue(rowValue, binary);
        var ex = "..#..";
        Assert.Equal(ex, ac);

        rowValue = ".?#?.";
        binary = "01";
        ac = Program.GetPossibleValue(rowValue, binary);
        ex = "..##.";
        Assert.Equal(ex, ac);

        rowValue = ".?#?.";
        binary = "10";
        ac = Program.GetPossibleValue(rowValue, binary);
        ex = ".##..";
        Assert.Equal(ex, ac);

        rowValue = ".?#?.";
        binary = "11";
        ac = Program.GetPossibleValue(rowValue, binary);
        ex = ".###.";
        Assert.Equal(ex, ac);
    }

    [Fact]
    public void Test_GetHashTagSizes()
    {
        var rowValue = ".##..#.#..";
        var ac = Program.GetHashTagSizes(rowValue);
        var ex = "2,1,1";
        Assert.Equal(ex, ac);

        rowValue = ".####....";
        ac = Program.GetHashTagSizes(rowValue);
        ex = "4";
        Assert.Equal(ex, ac);

        rowValue = ".#.#..###";
        ac = Program.GetHashTagSizes(rowValue);
        ex = "1,1,3";
        Assert.Equal(ex, ac);
    }

    [Fact]
    public void Test_Unfold()
    {
        var rows = new List<string[]>
        {
            new string[] { "???.###", "1,1,3" },
        };
        var ex = new List<string[]>
        {
            new string[] { "???.###????.###????.###????.###????.###", "1,1,3,1,1,3,1,1,3,1,1,3,1,1,3" },
        };
        var ac = Program.Unfold(rows);
        Assert.Equal(ex, ac);


        rows = new List<string[]>
        {
            new string[] { ".#", "1" },
        };
        ex = new List<string[]>
        {
            new string[] { ".#?.#?.#?.#?.#", "1,1,1,1,1" },
        };
        ac = Program.Unfold(rows);
        Assert.Equal(ex, ac);
    }
}