Part1();
// Part2();

// FUNCTIONS  -------------------------------------------------------------------
void Part1()
{
    // const string path = "/Users/serpo/tutorials/advent-of-code/2023/c#/09/example.txt";
    const string path = "/Users/serpo/tutorials/advent-of-code/2023/c#/09/input.txt";
    var input = ReadInput(path);
    var lists = ParseInput(input);

    var nextValues = new List<int>();
    foreach (var list in lists)
    {
        nextValues.Add(CalculateNextValue(list));
    }
    var result = nextValues.Sum();
    Console.WriteLine(result);
}

int CalculateNextValue(List<int> list)
{
    var helperLists = MakeHelperLists(list);
    // loop through helper lists last elements
    for (int i = helperLists.Count - 1; i >= 0; i--)
    {
        var currentList = helperLists[i];
        if (i + 1 < helperLists.Count)
        {
            // append (last + prev(last)) to end of current list
            var prevList = helperLists[i + 1];
            var currentLast = currentList.Last();
            var prevLast = prevList.Last();
            currentList.Add(currentLast + prevLast);
        }
        else
        {
            currentList.Add(0);
        }
    }

    return helperLists[0].Last();
}

List<List<int>> MakeHelperLists(List<int> list)
{
    var helperLists = new List<List<int>> { list };
    while (true)
    {
        // append new list with (len - 1), where values are diffs of prev list nums
        var prevList = helperLists.Last();
        var newList = new List<int>();
        for (int i = 1; i < prevList.Count; i++)
        {
            var diff = prevList[i] - prevList[i - 1];
            newList.Add(diff);
        }

        helperLists.Add(newList);
        // repeat untill all diffs are 0 in new list
        if (newList.All(x => x == 0))
        {
            break;
        }
    }

    return helperLists;
}


List<List<int>> ParseInput(string[] input)
{
    var lists = input.Select(
        row => row.Split(" ").Select(int.Parse).ToList()
    ).ToList();
    return lists;
}

void Part2()
{
}

string[] ReadInput(string path)
{
    var input = File.ReadAllText(path);
    return input.Split("\n");
}