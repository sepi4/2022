namespace _11Test;

public class UnitTest1
{
    [Fact]
    public void Test_ExpandedSpace()
    {
        var ss = new string[]
        {
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
        };
        var expextedSS = new string[]
        {
            "....#........",
            ".........#...",
            "#............",
            ".............",
            ".............",
            "........#....",
            ".#...........",
            "............#",
            ".............",
            ".............",
            ".........#...",
            "#....#.......",
        };
        Assert.Equal(expextedSS, Program.ExpandSpace(ss));
    }


    [Fact]
    public void Test_GetEmptyIndexes()
    {
        var input = new string[]
        {
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
        };
        var list = input.Select(s => s.ToList()).ToList();
        var expectedRowIndexes = new List<int> { 3, 7 };
        var expectedColumnIndexes = new List<int> { 2, 5, 8 };
        var (a, b) = Program.GetEmptyIndexes(list);
        Assert.Equal(expectedRowIndexes.ToArray(), a.ToArray());
        Assert.Equal(expectedColumnIndexes.ToArray(), b.ToArray());
    }

    [Fact]
    public void Test_GetGalaxies()
    {
        var input = new string[]
        {
            ".......",
            ".#.....",
            ".....#.",
            ".......",
        };
        var a = new Galaxy();
        a.Y = 1;
        a.X = 1;

        var b = new Galaxy();
        b.Y = 2;
        b.X = 5;

        var expectedGalaxies = new List<Galaxy> { a, b, };

        var nums = string.Join(":", expectedGalaxies.Select(g => $"{g.Y},{g.X}").ToArray());
        var nums2 = string.Join(":", Program.GetGalaxies(input).Select(g => $"{g.Y},{g.X}").ToArray());

        Assert.Equal(nums, nums2);
    }

    [Fact]
    public void Test_CalculateDistanceSum1()
    {

        var ss = new string[]
        {
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
        };
        Assert.Equal(374, Program.CalculateDistanceSum1(ss));
    }


    [Fact]
    public void Test_CalculateDistanceSum2()
    {
        var ss = new string[]
        {
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
        };
        Assert.Equal(1030, Program.CalculateDistanceSum2(ss, 10));
        Assert.Equal(8040, Program.CalculateDistanceSum2(ss, 100));
    }

    [Fact]
    public void Test_GetDist()
    {
        var a = new Galaxy();
        a.Y = 1;
        a.X = 1;

        var b = new Galaxy();
        b.Y = 2;
        b.X = 5;
        var dist = (b.Y - a.Y) + (b.X - a.X);
        Assert.Equal(dist, Program.GetDist(a, b));
    }

    [Fact]
    public void Test_AreAllEmpty()
    {
        var empty = ".............".ToList();
        var notEmpty = "........#....".ToList();

        Assert.True(Program.AreAllEmpty(empty));
        Assert.False(Program.AreAllEmpty(notEmpty));
    }
}