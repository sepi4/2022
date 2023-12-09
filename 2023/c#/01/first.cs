// // See https://aka.ms/new-console-template for more information
// string input = File.ReadAllText("./input.txt");


// var rows = input.Split("\n");

// char? aNum = null;
// char? bNum = null;

// int sum = 0;

// // loop rows
// foreach (var row in rows)
// {
//   // loop --->
//   for (int i = 0; i < row.Length; i++)
//   {
//     var x = row[i];
//     if (char.IsDigit(x))
//     {
//       aNum = x;
//       break;
//     }
//   }

//   // loop <---
//   for (int i = row.Length - 1; i >= 0; i--)
//   {
//     var x = row[i];
//     if (char.IsDigit(x))
//     {
//       bNum = x;
//       break;
//     }
//   }
//   if (!aNum.HasValue || !bNum.HasValue) {
//     throw new Exception("No numbers found");
//   }

//   sum += int.Parse($"{aNum}{bNum}");
// }

// Console.WriteLine($"sum: {sum}");


// -----------------------------------------------------
// SECODN PART
// -----------------------------------------------------


using System.Text.RegularExpressions;

int getNum(string str)
{
  switch (str)
  {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return int.Parse(str);
  }
}

string input = File.ReadAllText("./input.txt");
// string input = File.ReadAllText("./input2.txt");
// string input = "82sixtwonez";

var rows = input.Split("\n");

int sum = 0;

string x = @"(\d|one|two|three|four|five|six|seven|eight|nine)";
Regex leftRegex = new Regex(x);
Regex rightRegex = new Regex(x, RegexOptions.RightToLeft);

// loop rows
foreach (var row in rows)
{
  int? aNum = null;
  int? bNum = null;


  aNum = getNum(leftRegex.Matches(row).First().Value);
  bNum = getNum(rightRegex.Matches(row).First().Value);

  Console.WriteLine($"{aNum}{bNum} : {row}");
  sum += int.Parse($"{aNum}{bNum}");
}

Console.WriteLine($"---");
Console.WriteLine($"sum: {sum}");
