/*

seeds: 
3136945476 509728956 
1904897211 495273540 
1186343315 66026055 
1381149926 11379441 
4060485949 190301545 
444541979 351779229 
1076140984 104902451 
264807001 60556152 
3676523418 44140882 
3895155702 111080695

*/


// Part1();
Part2();


// FUNCTIONS -------------------------------------------------------------------
void Part2()
{
  // string[] input = ReadInput("example.txt");
  string[] input = ReadInput("input.txt");
  string[][] groups = SplitByEmptyLine(input);

  long[][] seeds = GetSeedsPart2(groups);
  var mapNums = GetMapNums(groups);

  foreach (var ss in seeds)
  {
    var minLocation = ss
      .Select(seed => Calculate(mapNums, seed))
      .Min();
    Console.WriteLine(minLocation);
  }
}

void Part1()
{
  // string[] input = ReadInput("example.txt");
  string[] input = ReadInput("input.txt");
  string[][] groups = SplitByEmptyLine(input);

  long[] seeds = GetSeeds(groups);
  var mapNums = GetMapNums(groups);

  var minLocation = seeds
    .Select(seed => Calculate(mapNums, seed))
    .Min();

  Console.WriteLine(minLocation);

}

long Calculate(long[][][] mapNums, long seed)
{
  long seedCurrent = seed;
  for (long i = 0; i < mapNums.Length; i++)
  {
    var map = mapNums[i];
    for (long j = 0; j < map.Length; j++)
    {
      var row = map[j];
      var dest = row[0];
      var source = row[1];
      var range = row[2];
      if (seedCurrent >= source && seedCurrent < source + range)
      {
        seedCurrent = dest + (seedCurrent - source);
        break;
      }
    }
    // Console.WriteLine($"{seedCurrent}");
  }
  // Console.WriteLine($"{seed} -> {seedCurrent}");
  return seedCurrent;
}

long[][] GetSeedsPart2(string[][] groups)
{
  var arr = GetSeeds(groups);
  var seeds = new List<long[]>();
  for (long i = 0; i < arr.Length; i += 2)
  {
    var start = arr[i];
    var amount = arr[i + 1];
    var ss = new List<long>();
    for (long j = 0; j < amount; j++)
    {
      ss.Add(start + j);
    }
    seeds.Add(ss.ToArray());
  }
  var s = seeds.ToArray();
  return s;
}

// getseeds

long[] GetSeeds(string[][] groups)
{
  return groups[0][0]
    .Split(":")[1]
    .Split(" ")
    .Where(x => x.Length > 0)
    .Select(x => long.Parse(x))
    .ToArray();
}

long[][][] GetMapNums(string[][] groups)
{
  return groups
      .Skip(1)
      .Select(group => group
        .Skip(1)
        .Select(row => row
          .Split(" ")
          .Select(x => long.Parse(x))
          .ToArray()
        ).ToArray()
      ).ToArray();
}

string[][] SplitByEmptyLine(string[] input)
{
  var groups = new List<string[]>();
  var currentList = new List<string>();
  foreach (string line in input)
  {
    if (line == "" && currentList.Count > 0)
    {
      groups.Add(currentList.ToArray());
      currentList = new List<string>();
    }
    else
    {
      currentList.Add(line);
    }
  }
  if (currentList.Count > 0)
  {
    groups.Add(currentList.ToArray());
  }
  return groups.ToArray();
}

string[] ReadInput(string path)
{
  string input = File.ReadAllText(path);
  return input.Split("\n");
}