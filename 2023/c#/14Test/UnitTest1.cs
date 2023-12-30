using _14;

namespace _14Test;

public class UnitTest1
{
    [Fact]
    public void Test_MoveUp()
    {
        var matrix = new[]
        {
            "......#.",
            "....#...",
            "........",
            "....O..."
        }.Select(row => row.ToCharArray()).ToArray();

        var expected = new[]
        {
            "......#.",
            "....#...",
            "....O...",
            "........"
        }.Select(row => row.ToCharArray()).ToArray();

        Program.MoveUp(matrix, 3, 4);
        Assert.Equal(expected, matrix);
    }

    [Fact]
    public void Test_MoveRocksNorth()
    {
        var input = new[]
        {
            "O.....#.",
            "....#..O",
            "..O...O.",
            "O...O..O"
        };
        var expected = new[]
        {
            "O.O...#O",
            "O...#.OO",
            "....O...",
            "........"
        };
        var actual = Program.MoveRocksNorth(input);
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void Test_GetRocksTotalLoad()
    {
        var input = new[]
        {
            "OOOO.#.O..",
            "OO..#....#",
            "OO..O##..O",
            "O..#.OO...",
            "........#.",
            "..#....#.#",
            "..O..#.O.O",
            "..O.......",
            "#....###..",
            "#....#....",
        };
        const int expected = 136;
        var actual = Program.GetRocksTotalLoad(input);
        Assert.Equal(expected, actual);
    }


    [Fact]
    public void Test_Part1()
    {
        var input = new[]
        {
            "O....#....",
            "O.OO#....#",
            ".....##...",
            "OO.#O....O",
            ".O.....O#.",
            "O.#..O.#.#",
            "..O..#O..O",
            ".......O..",
            "#....###..",
            "#OO..#....",
        };
        Assert.Equal(136, Program.Part1(input));
    }
}