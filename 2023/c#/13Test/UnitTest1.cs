using _13;

namespace _13Test;

public class UnitTest1
{
    [Fact]
    public void Test_FindTwoSameRows()
    {
        const string input = @"#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#";

        var note = input.Split('\n');

        var list = new List<(int, int)>();
        list.Add((3, 4));

        Assert.Equal(list, Program.FindTwoSameRows(note));
    }


    [Fact]
    public void Test_FindTwoSameColumns()
    {
        const string input = @"#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.";

        var note = input.Split('\n');
        var list = new List<(int, int)>();
        list.Add((4, 5));

        Assert.Equal(list, Program.FindTwoSameColumns(note));
    }


    [Fact]
    public void Test_GroupNotes()
    {
        const string input = @"#.##..##.
..#.##.#.

#...##..#
#....#..#";
        var rows = input.Split(Environment.NewLine);

        var notes = new string[][]
        {
            new string[] { "#.##..##.", "..#.##.#." },
            new string[] { "#...##..#", "#....#..#" }
        };

        Assert.Equal(notes, Program.GroupNotes(rows));
    }

    [Fact]
    public void Test_IsReflection()
    {
        var note = @"#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#".Split(Environment.NewLine);


        Assert.True(Program.IsReflection(note, (3, 4), Direction.Vertical));
        Assert.False(Program.IsReflection(note, (2, 3), Direction.Horizontal));


        note = @"#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.".Split(Environment.NewLine);

        Assert.True(Program.IsReflection(note, (4, 5), Direction.Horizontal));
        Assert.False(Program.IsReflection(note, (2, 3), Direction.Horizontal));
    }

    [Fact]
    public void Test_Part1()
    {
        const string input = @"#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#";
        Assert.Equal(405, Program.Part1(input.Split(Environment.NewLine)));
    }

    [Fact]
    public void Test_Part2()
    {
        const string input = @"#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#";
        Assert.Equal(400, Program.Part2(input.Split(Environment.NewLine)));
    }

    [Fact]
    public void Test_GetNoteOptions()
    {
        var note = new[]
        {
            "##",
            "..",
        };

        string[][] options =
        [
            [
                ".#",
                "..",
            ],
            [
                "#.",
                "..",
            ],
            [
                "##",
                "#.",
            ],
            [
                "##",
                ".#",
            ],
        ];

        Assert.Equal(options, Program.GetNoteOptions(note));
    }

    [Fact]
    public void Test_FindReflections()
    {
        const string input = @"#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#";

        var note = input.Split('\n');
        var list = Program.FindReflection(note);
        var arr = list.ToArray();

        Assert.Equal([((3, 4), Direction.Vertical)], arr);
    }
}