// Part1();
Part2();


// FUNCTIONS ------------------
void Part2()
{
  var input = ReadInput("./example.txt");
  // var input = ReadInput("./input.txt");

  // amount or cards for each row is 1 at the start
  var amountCards = new int[input.Length].Select(x => 1).ToArray();
  var i = 0;
  foreach (var item in input)
  {
    var temp = item.Split(":");
    var numsPart = temp[1].Split("|");
    var winningNums = GetNums(numsPart[0]);
    var myNums = GetNums(numsPart[1]);

    var winningNumsDict = GetWinningNumsDict(winningNums);
    var matches = GetMatches(winningNumsDict, myNums);

    for (var j = i + 1; j <= i + matches; j++)
    {
      amountCards[j] += amountCards[i];
    }
    i++;
  }
  var sum = amountCards.Sum();
  Console.WriteLine(sum);
}

Dictionary<int, int> GetWinningNumsDict(int[] winningNums)
{
  var winningNumsDict = new Dictionary<int, int>();
  foreach (var num in winningNums)
  {
    winningNumsDict[num] = num;
  }
  return winningNumsDict;
}

int GetMatches(Dictionary<int, int> winningNumsDict, int[] myNums)
{
  var matches = 0;
  foreach (var num in myNums)
  {
    if (winningNumsDict.ContainsKey(num))
    {
      matches++;
    }
  }
  return matches;
}

void Part1()
{
  // var input = ReadInput("./example.txt");
  var input = ReadInput("./input.txt");
  var sum = 0;
  foreach (var item in input)
  {
    var temp = item.Split(":");
    var numsPart = temp[1].Split("|");
    var winningNums = GetNums(numsPart[0]);
    var myNums = GetNums(numsPart[1]);
    var winningNumsDict = new Dictionary<int, int>();
    foreach (var num in winningNums)
    {
      winningNumsDict[num] = num;
    }

    var rowSum = 0;
    foreach (var num in myNums)
    {
      if (winningNumsDict.ContainsKey(num))
      {
        if (rowSum == 0)
        {
          rowSum = 1;
        }
        else
        {
          rowSum += rowSum;
        }
      }
    }
    sum += rowSum;
  }

  Console.WriteLine(sum);
}

int[] GetNums(string arr)
{
  return arr.Split(" ").Where(x => x.Length > 0).Select(x => int.Parse(x)).ToArray();
}

string[] ReadInput(string path)
{
  string input = File.ReadAllText(path);
  return input.Split("\n");
}