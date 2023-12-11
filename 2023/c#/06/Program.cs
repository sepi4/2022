using System.Text.RegularExpressions;


// Part1();

Part2();


// FUNCTIONS -------------------------------------------------------------------
void Part2()
{

  /*
  this is more math problem than programming problem

  image math.jpg added to help understand the problem and solution
  */




  // string[] input = ReadInput("example.txt");
  string[] input = ReadInput("input.txt");

  var timeStr = input[0].Split(" ").Skip(1).Where(x => x.Length > 0).Aggregate("", (acc, x) => $"{acc}{x}");
  var distanceStr = input[1].Split(" ").Skip(1).Where(x => x.Length > 0).Aggregate("", (acc, x) => $"{acc}{x}");
  var time = long.Parse(timeStr);
  var distance = long.Parse(distanceStr);

  var result = quadraticEquation(1, -time, distance);

  var diff = result[0] - result[1];

  Console.WriteLine(Math.Floor(diff));
}

double[] quadraticEquation(long a, long b, long c)
{
  double x1 =  (-b + Math.Sqrt(Math.Pow(b, 2) - 4 * a * c)) / (2 * a);
  double x2 =  (-b - Math.Sqrt(Math.Pow(b, 2) - 4 * a * c)) / (2 * a);
  return new double[] { x1, x2 };
}

void Part1()
{
  // string[] input = ReadInput("example.txt");
  string[] input = ReadInput("input.txt");
  var times = input[0].Split(" ").Skip(1).Where(x => x.Length > 0).Select(x => int.Parse(x)).ToArray();
  var distances = input[1].Split(" ").Skip(1).Where(x => x.Length > 0).Select(x => int.Parse(x)).ToArray();

  var speedOverLimit = new List<int[]>();
  for (int i = 0; i < times.Length; i++) {
    speedOverLimit.Add(
      findWhereOverLimit(distances[i], times[i])
    );
  }
  var x = speedOverLimit.Select(x => x.Length).Aggregate(1, (acc, x) => acc * x);
  Console.WriteLine(x);
}

int[] findWhereOverLimit(int distanceLimit, int timeLimit)
{
  var over = new List<int>();
  for (int i = 0; i < timeLimit; i++)
  {
    var speed = i;
    var timeLeft = timeLimit - i;
    var distance = speed * timeLeft;
    if (distance > distanceLimit)
    {
      over.Add(i);
    }
  }
  return over.ToArray();
}




string[] ReadInput(string path)
{
  string input = File.ReadAllText(path);
  return input.Split("\n");
}