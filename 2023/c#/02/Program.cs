using System.Linq.Expressions;
using System.Text.RegularExpressions;

Part1();
Part2();

void Part1()
{
  var maxes = new Dictionary<string, int> { { "green", 13 }, { "blue", 14 }, { "red", 12 } };

  var games = ReadInput();
  var gameIdRegex = new Regex(@"Game (\d+):");

  var re = @"(\d+) (blue|green|red)";
  var regex = new Regex(re);

  var idSum = 0;

  foreach (var game in games)
  {
    var m = gameIdRegex.Match(game);
    var id = int.Parse(m.Groups[1].Value);

    bool gamePossible = true;

    string[] subsets = game.Split(";");
    foreach (var subset in subsets)
    {
      var matches = regex.Matches(subset);
      var oo = new Dictionary<string, int> { { "green", 0 }, { "blue", 0 }, { "red", 0 } };
      foreach (Match match in matches)
      {
        var arr = match.Value.Split(" ");
        oo[arr[1]] = int.Parse(arr[0]);
      }
      // check some value over max
      foreach (var item in oo)
      {
        if (item.Value > maxes[item.Key])
        {
          gamePossible = false;
        }
      }
    }
    if (gamePossible)
    {
      idSum += id;
    }
  }

  Console.WriteLine(idSum);
}

void Part2()
{
  var mins = new Dictionary<string, int> { { "green", 0 }, { "blue", 0 }, { "red", 0 } };
  var games = ReadInput();

  var re = @"(\d+) (blue|green|red)";
  var regex = new Regex(re);
  var powerSum = 0;

  foreach (var game in games)
  {
    string[] subsets = game.Split(";");
    var max = new Dictionary<string, int> { { "green", 0 }, { "blue", 0 }, { "red", 0 } };
    foreach (var subset in subsets)
    {
      var matches = regex.Matches(subset);
      foreach (Match match in matches)
      {
        var arr = match.Value.Split(" ");
        var color = arr[1];
        var value = int.Parse(arr[0]);

        if (value > max[color])
        {
          max[color] = value;
        }
      }
    }
    var power = 1;
    foreach (var item in max)
    {
      power *= item.Value;
    }
    powerSum += power;
  }
  Console.WriteLine(powerSum);
}

string[] ReadInput()
{
  string input = File.ReadAllText("./input.txt");
  // string input = File.ReadAllText("./example.txt");
  var rows = input.Split("\n");
  return rows;
}
