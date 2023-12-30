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

    [Fact]
    public void Test_Move()
    {
        var input = new[]
        {
            "..#",
            ".O.",
            "..#",
        }.Select(row => row.ToCharArray()).ToArray();
        var expected = new[]
        {
            "..#",
            "O..",
            "..#",
        }.Select(row => row.ToCharArray()).ToArray();

        Program.Move(input, 1, 1, 0, -1);
        Assert.Equal(expected, input);

        // ---
        expected = new[]
        {
            "O.#",
            "...",
            "..#",
        }.Select(row => row.ToCharArray()).ToArray();
        Program.Move(input, 1, 0, -1, 0);
        Assert.Equal(expected, input);

        // ---
        expected = new[]
        {
            ".O#",
            "...",
            "..#",
        }.Select(row => row.ToCharArray()).ToArray();
        Program.Move(input, 0, 0, 0, 1);
        Assert.Equal(expected, input);
    }

    [Fact]
    public void Test_MoveRocks()
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


        // cycle 1
        input = Program.MoveRocks(input, Direction.North);
        input = Program.MoveRocks(input, Direction.West);
        input = Program.MoveRocks(input, Direction.South);
        input = Program.MoveRocks(input, Direction.East);
        var expected = new[]
        {
            ".....#....",
            "....#...O#",
            "...OO##...",
            ".OO#......",
            ".....OOO#.",
            ".O#...O#.#",
            "....O#....",
            "......OOOO",
            "#...O###..",
            "#..OO#....",
        };
        Assert.Equal(expected, input);

        // cycle 2
        input = Program.MoveRocks(input, Direction.North);
        input = Program.MoveRocks(input, Direction.West);
        input = Program.MoveRocks(input, Direction.South);
        input = Program.MoveRocks(input, Direction.East);
        expected = new[]
        {
            ".....#....",
            "....#...O#",
            ".....##...",
            "..O#......",
            ".....OOO#.",
            ".O#...O#.#",
            "....O#...O",
            ".......OOO",
            "#..OO###..",
            "#.OOO#...O",
        };
        Assert.Equal(expected, input);

        // cycle 3
        input = Program.MoveRocks(input, Direction.North);
        input = Program.MoveRocks(input, Direction.West);
        input = Program.MoveRocks(input, Direction.South);
        input = Program.MoveRocks(input, Direction.East);
        expected = new[]
        {
            ".....#....",
            "....#...O#",
            ".....##...",
            "..O#......",
            ".....OOO#.",
            ".O#...O#.#",
            "....O#...O",
            ".......OOO",
            "#...O###.O",
            "#.OOO#...O",
        };
        Assert.Equal(expected, input);
    }
    
    [Fact]
    public void Test_Part2()
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
        Assert.Equal(64, Program.Part2(input));
    }
}