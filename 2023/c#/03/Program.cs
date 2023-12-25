using System.Text.RegularExpressions;


// Part1();
Part2();


// FUNCTIONS -------------------

void Part2()
{
  var rawInput = ReadInput("/Users/serpo/tutorials/advent-of-code/2023/c#/03/input.txt");
  // var rawInput = ReadInput("example.txt");
  var matrix = rawInput
    .Select(x => x.Select(y => y.ToString()).ToArray())
    .ToArray();

  var nums = new List<List<int>>();

  // looping through matrix
  for (int y = 0; y < matrix.Length; y++)
  {
    for (int x = 0; x < matrix[y].Length; x++)
    {
      if (matrix[y][x] == "*")
      {
        HandleStar(x, y, matrix, nums);
      }
    }
  }
  var sum = 0;
  foreach (var list in nums)
  {
    if (list.Count == 2)
    {
      sum += list[0] * list[1];
    }
  }
  // PrintMatrix(matrix);
  Console.WriteLine(sum);
}

void HandleStar(int x, int y, string[][] matrix, List<List<int>> nums)
{

  var list = new List<int>();
  var arr = CheckAroundValues(x, y, matrix);
  while (arr != null)
  {
    var coor = GetWordCoordinates(arr[0], arr[1], matrix);
    // add number to list
    var num = "";
    foreach (var c in coor)
    {
      num += matrix[c[1]][c[0]];
    }
    list.Add(int.Parse(num));

    // remove numbers from matrix
    foreach (var c in coor)
    {
      matrix[c[1]][c[0]] = ".";
    }
    arr = CheckAroundValues(x, y, matrix);
  }
  if (list.Count > 0)
  {
    nums.Add(list);
  }
}

void Part1()
{
  var rawInput = ReadInput("input.txt");
  // var rawInput = ReadInput("example.txt");
  var matrix = rawInput
    .Select(x => x.Select(y => y.ToString()).ToArray())
    .ToArray();

  var nums = new List<int>();

  // looping through matrix
  for (int y = 0; y < matrix.Length; y++)
  {
    for (int x = 0; x < matrix[y].Length; x++)
    {
      if (IsSpecialChar(matrix[y][x]))
      {
        HandleSpecialChar(x, y, matrix, nums);
      }
    }
  }

  // PrintMatrix(matrix);
  var sum = nums.Sum();
  Console.WriteLine(sum);

}

void HandleSpecialChar(int x, int y, string[][] matrix, List<int> nums)
{

  var arr = CheckAroundValues(x, y, matrix);
  while (arr != null)
  {
    var coor = GetWordCoordinates(arr[0], arr[1], matrix);
    // add number to list
    var num = "";
    foreach (var c in coor)
    {
      num += matrix[c[1]][c[0]];
    }
    nums.Add(int.Parse(num));

    // remove numbers from matrix
    foreach (var c in coor)
    {
      matrix[c[1]][c[0]] = ".";
    }
    arr = CheckAroundValues(x, y, matrix);
  }
}

bool IsSpecialChar(string v)
{
  var aa = "1234567890."
    .ToArray()
    .Select(x => x.ToString())
    .ToArray();
  return !aa.Contains(v);
}

bool IsNumberChar(string v)
{
  var aa = "1234567890"
    .ToArray()
    .Select(x => x.ToString())
    .ToArray();
  return aa.Contains(v);
}

int[] CheckAroundValues(int x, int y, string[][] input)
{
  var arr = new int[][]
  {
    new int[]{-1, -1},
    new int[]{ 0, -1},
    new int[]{ 1, -1},

    new int[]{-1,  0},
    new int[]{ 1,  0},

    new int[]{-1,  1},
    new int[]{ 0,  1},
    new int[]{ 1,  1},
  };
  // loop through arr
  for (int i = 0; i < arr.Length; i++)
  {
    var currentY = y + arr[i][1];
    var currentX = x + arr[i][0];

    // don't go over matrix borders
    if (
      currentX < 0
      || currentY < 0
      || currentX >= input[0].Length
      || currentY >= input.Length
    )
    {
      continue;
    }

    if (IsNumberChar(input[currentY][currentX].ToString()))
    {
      // MAYBE NEED TO ADD TO LIST
      return new int[] { currentX, currentY };
    }
  }
  return null;
}

int[][] GetWordCoordinates(int startX, int startY, string[][] input)
{
  int start = -1;
  int end = -1;
  var re = new Regex(@"\d");
  int y = startY;
  int x = startX;
  // <-- loop 
  while (x >= 0)
  {
    var v = input[y][x].ToString();
    if (!re.IsMatch(v) || x < 0)
    {
      break;
    }
    start = x;
    x--;
  }

  x = startX;
  // <-- loop 
  while (x < input[0].Length)
  {
    var v = input[y][x].ToString();
    if (!re.IsMatch(v) || x >= input[0].Length)
    {
      break;
    }
    end = x;
    x++;
  }
  var result = new List<int[]>();
  for (int i = start; i <= end; i++)
  {
    result.Add(new int[] { i, y });
  }
  return result.ToArray();
}

string[] ReadInput(string path)
{
  string input = File.ReadAllText(path);
  return input.Split("\n");
}

void PrintMatrix(string[][] matrix)
{
  for (int y = 0; y < matrix.Length; y++)
  {
    for (int x = 0; x < matrix[y].Length; x++)
    {
      Console.Write(matrix[y][x]);
    }
    Console.WriteLine();
  }
}