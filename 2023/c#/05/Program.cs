// Part1();
Part2();


// FUNCTIONS -------------------------------------------------------------------
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

void Part2()
{
  string[] input = ReadInput("example.txt");
}


string[] ReadInput(string path)
{
  string input = File.ReadAllText(path);
  return input.Split("\n");
}