// Part1();
Part2();

// FUNCTIONS -------------------------------------------------------------------
void Part2()
{
    // const string p = "example.txt";
    const string p = "input.txt";
    var input = ReadInput(p);
    var hands = input.Select(x => new Hand(
            x.Split(" ")[0],
            x.Split(" ")[1]
        )
    ).ToArray();

    var groups = hands
        .GroupBy(GetStrongest)
        .OrderBy(x => x.Key);

    var flat = new List<Hand>();
    foreach (var group in groups)
    {
        var sorted = group.OrderByDescending(v => v.value, new HandComparer2()).ToArray();
        foreach (var hand in sorted)
        {
            flat.Add(hand);
        }
    }
    var flattened = flat.ToArray();
    var result = GetAddSum(flattened);
    Console.WriteLine(result);
}

void Part1()
{
    const string p = "input.txt";
    var input = ReadInput(p);

    var hands = input.Select(x => new Hand(
            x.Split(" ")[0],
            x.Split(" ")[1]
        )
    ).ToArray();

    var groups = hands
        .GroupBy(GetGroup)
        .OrderBy(x => x.Key);

    var flat = new List<Hand>();
    foreach (var group in groups)
    {
        var sorted = group.OrderByDescending(v => v.value, new HandComparer()).ToArray();
        foreach (var hand in sorted)
        {
            flat.Add(hand);
        }
    }
    var flattened = flat.ToArray();
    var result = GetAddSum(flattened);
    Console.WriteLine(result);
}

int Test(Hand hand)
{
    return 0;
}

int GetStrongest(Hand hand)
{
    var arr = new string[] {
        "A",
        "K",
        "Q",
        "T",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2" 
    };

    int min = Int32.MaxValue;
    foreach (var jIs in arr)
    {
        var current = GetGroup2(hand, jIs);
        if (current < min) {
            min = current;
        }
    }
    return min;
}

long GetAddSum(Hand[] arr)
{
    arr = arr.Reverse().ToArray();
    int sum = 0;
    for (int i = 0; i < arr.Length; i++)
    {
        sum += arr[i].bid * (i + 1);
    }
    return sum;
}

int GetGroup(Hand hand)
{
    var dic = new Dictionary<string, int>();
    foreach (var c in hand.value)
    {
        var cs = c.ToString();
        if (dic.ContainsKey(cs))
            dic[cs]++;
        else
            dic.Add(cs, 1);
    }

    var five = 0;
    var four = 0;
    var three = 0;
    var pair = 0;

    foreach (var x in dic.Values)
    {
        if (x == 5)
            five++;
        else if (x == 4)
            four++;
        else if (x == 3)
            three++;
        else if (x == 2)
            pair++;
    }

    if (five == 1)
        return 0;
    if (four == 1)
        return 1;
    if (three == 1 && pair == 1)
        return 2;
    if (three == 1)
        return 3;
    if (pair == 2)
        return 4;
    if (pair == 1)
        return 5;
    return 6;
}



int GetGroup2(Hand hand, string jIs)
{
    var dic = new Dictionary<string, int>();
    foreach (var c in hand.value)
    {
        var cs = c.ToString();
        if (cs == "J")
        {
            cs = jIs;
        }
        if (dic.ContainsKey(cs))
            dic[cs]++;
        else
            dic.Add(cs, 1);
    }

    var five = 0;
    var four = 0;
    var three = 0;
    var pair = 0;

    foreach (var x in dic.Values)
    {
        if (x == 5)
            five++;
        else if (x == 4)
            four++;
        else if (x == 3)
            three++;
        else if (x == 2)
            pair++;
    }

    if (five == 1)
        return 0;
    if (four == 1)
        return 1;
    if (three == 1 && pair == 1)
        return 2;
    if (three == 1)
        return 3;
    if (pair == 2)
        return 4;
    if (pair == 1)
        return 5;
    return 6;
}

string[] ReadInput(string path)
{
    //
    // // Relative path from the root of the solution
    // string relativePath = path;
    //
    // // Combine with the base directory to get the full path
    // string fullPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, relativePath);

    var input = File.ReadAllText(path);
    return input.Split("\n");
}

class Hand
{
    public string value { get; set; }
    public int bid { get; set; }
    public Hand(string value, string bid)
    {
        this.value = value;
        this.bid = int.Parse(bid);
    }
}
public class HandComparer : IComparer<string>
{
    public int Compare(string? a, string? b)
    {
        if (a == null || b == null)
        {
            return 0;
        }
        for (int i = 0; i < a.Length; i++)
        {
            if (GetStrength(a[i].ToString()) > GetStrength(b[i].ToString()))
            {
                return 1;
            }
            if (GetStrength(a[i].ToString()) < GetStrength(b[i].ToString()))
            {
                return -1;
            }
        }
        return 0;
    }
    int GetStrength(string v)
    {
        var dic = new Dictionary<string, int> {
            {"A", 14},
            {"K", 13},
            {"Q", 12},
            {"J", 11},
            {"T", 10},
            {"9", 9},
            {"8", 8},
            {"7", 7},
            {"6", 6},
            {"5", 5},
            {"4", 4},
            {"3", 3},
            {"2", 2},
        };
        return dic[v];
    }
}

public class HandComparer2 : IComparer<string>
{
    public int Compare(string? a, string? b)
    {
        if (a == null || b == null)
        {
            return 0;
        }
        for (int i = 0; i < a.Length; i++)
        {
            if (GetStrength(a[i].ToString()) > GetStrength(b[i].ToString()))
            {
                return 1;
            }
            if (GetStrength(a[i].ToString()) < GetStrength(b[i].ToString()))
            {
                return -1;
            }
        }
        return 0;
    }
    int GetStrength(string v)
    {
        var dic = new Dictionary<string, int> {
            {"A", 14},
            {"K", 13},
            {"Q", 12},
            {"T", 10},
            {"9", 9},
            {"8", 8},
            {"7", 7},
            {"6", 6},
            {"5", 5},
            {"4", 4},
            {"3", 3},
            {"2", 2},
            {"J", 1},
        };
        return dic[v];
    }
}
