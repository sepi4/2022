using System.Numerics;
using System.Text.RegularExpressions;

// Part1();
Part2();

// FUNCTIONS  -------------------------------------------------------------------
void Part2()
{
    // var input = ReadInput("/Users/serpo/tutorials/advent-of-code/2023/c#/08/example.txt");
    var input = ReadInput("/Users/serpo/tutorials/advent-of-code/2023/c#/08/input.txt");

    var steps = input[0].Aggregate(new List<char>(), (pre, cur) =>
    {
        pre.Add(cur);
        return pre;
    });

    var nodesReg = new Regex("([A-Z]{3}) = \\(([A-Z]{3})\\, ([A-Z]{3})\\)");
    var nodes = new Dictionary<string, Node>();
    foreach (var row in input)
    {
        var match = nodesReg.Match(row);
        if (match.Success)
        {
            var v = match.Groups[1].Value;
            var l = match.Groups[2].Value;
            var r = match.Groups[3].Value;
            var node = new Node(v, l, r);
            nodes.Add(v, node);
        }
    }

    // get nodes with end Z
    var staringNodes = nodes.Where(d => d.Value.value.EndsWith('A')).ToArray();

    // make array of starting nodes
    var currentNodes = new List<Node>();
    foreach (var x in staringNodes)
    {
        currentNodes.Add(nodes[x.Key]);
    }

    int i = 0;
    // count for each how many steps to get to Z
    var stepsToZ = currentNodes.Select(x => 0).ToArray();
    for (;stepsToZ.Where(x => x > 0).Count() != currentNodes.Count; i++)
    {
        for (int j = 0; j < currentNodes.Count; j++)
        {
            var current = currentNodes[j];
            if (steps[i % steps.Count] == 'L')
            {
                currentNodes[j] = nodes[current.L];
            }
            else
            {
                currentNodes[j] = nodes[current.R];
            }

            if (currentNodes[j].value.EndsWith('Z') && stepsToZ[j] == 0)
            {
                stepsToZ[j] = i + 1;
                if (stepsToZ.Where(x => x > 0).Count() == currentNodes.Count)
                {
                    break;
                }
            }
        }
    }

    // find Pienin yhteinen jaettava

    var nums = stepsToZ.Select(x => long.Parse(x.ToString())).ToArray();
    
    var allPrimes = new List<long[]>();
    foreach (var x in nums)
    {
        var primes = ToPrimes(x);
        allPrimes.Add(primes);
    }
    // get amount of all different numbers in pp
    var distinctPrimes = allPrimes.SelectMany(x => x).Distinct().ToArray();

    BigInteger sum = 0;
    foreach (var p in distinctPrimes)
    {
        var maxAmountOfCurrentPrimeNum = allPrimes.Select(x => x.Where(y => y == p).Count()).Max();
        Console.WriteLine($"{p} {maxAmountOfCurrentPrimeNum}");
        if (sum == 0)
        {
            sum = p * maxAmountOfCurrentPrimeNum;
        }
        else
        {
            sum *= (p * maxAmountOfCurrentPrimeNum);
        }
    }
    Console.WriteLine(sum);

}

long[] ToPrimes(long num)
{
    var nums = new List<long>();
    for (long i = 2; i <= num; i++)
    {
        if (num % i == 0)
        {
            nums.Add(i);
            num /= i;
            i = 1;
        }
        if (i == num && i != 1)
        {
            nums.Add(i);
            break;
        }
    }
    return nums.ToArray();
}

long[] MakeAllEqual(long[] original)
{
    var nums = original.Select(x => x).ToArray();
    var max = nums.Max();
    var min = nums.Min();
    long i = 0;
    while (max != min)
    {
        var minIndex = Array.IndexOf(nums, min);
        nums[minIndex] += original[minIndex];
        min = nums.Min();
        max = nums.Max();
        if (i % 1000000 == 0)
        {
            Console.WriteLine(min);
        }
    }
    return nums;
}

void Part1()
{
    var input = ReadInput("/Users/serpo/tutorials/advent-of-code/2023/c#/08/example.txt");
    // var input = ReadInput("/Users/serpo/tutorials/advent-of-code/2023/c#/08/input.txt");
    var steps = input[0].Aggregate(new List<char>(), (pre, cur) =>
    {
        pre.Add(cur);
        return pre;
    });

    var nodesReg = new Regex("([A-Z]{3}) = \\(([A-Z]{3})\\, ([A-Z]{3})\\)");
    var nodes = new Dictionary<string, Node>();
    foreach (var row in input)
    {
        var match = nodesReg.Match(row);
        if (match.Success)
        {
            var v = match.Groups[1].Value;
            var l = match.Groups[2].Value;
            var r = match.Groups[3].Value;
            var node = new Node(v, l, r);
            nodes.Add(v, node);
        }
    }

    Node current = nodes["AAA"];
    int i = 0;
    for (; current.value != "ZZZ"; i++)
    {
        if (steps[i % steps.Count] == 'L')
        {
            current = nodes[current.L];
        }
        else
        {
            current = nodes[current.R];
        }
    }

    Console.WriteLine(i);
}

string[] ReadInput(string path)
{
    var input = File.ReadAllText(path);
    return input.Split("\n");
}

public class Node
{
    public string value;
    public string L;
    public string R;

    public Node(string value, string L, string R)
    {
        this.value = value;
        this.L = L;
        this.R = R;
    }
}