﻿using AdventCodeLibrary;

public class Program
{
  public static void Main(string[] args)
  {
    var file = "example.txt";
    var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/11/{file}";
    var input = AdventCode.ReadInput(path);
    Console.WriteLine(CalculateDistanceSum(input));
  }

  public static int CalculateDistanceSum(string[] input)
  {
    var expandedSpace = ExpandSpace(input);
    var galaxies = GetGalaxies(expandedSpace);
    var pairs = new List<(Galaxy, Galaxy)>();
    for (var i = 0; i < galaxies.Count - 1; i++)
    {
      for (var j = i + 1; j < galaxies.Count; j++)
      {
        pairs.Add((galaxies[i], galaxies[j]));
      }
    }
    var distSum = pairs.Aggregate(0, (pre, pair) =>
    {
      var (a, b) = pair;
      return pre + GetDist(a, b);
    });
    return distSum;
  }

  public static int GetDist(Galaxy a, Galaxy b)
  {
    return Math.Abs(a.Y - b.Y) + Math.Abs(a.X - b.X);
  }

  public static List<Galaxy> GetGalaxies(string[] space)
  {
    var galaxies = new List<Galaxy>();
    for (var i = 0; i < space.Length; i++)
    {
      for (var j = 0; j < space[i].Length; j++)
      {
        if (space[i][j] == '#')
        {
          galaxies.Add(new Galaxy { Y = i, X = j });
        }
      }
    }

    return galaxies;
  }

  public static string[] ExpandSpace(string[] space)
  {
    var list = space.Select(s => s.ToList()).ToList();
    var (emptyRowIndexes, emptyColumnIndexes) = GetEmptyIndexes(list);

    // rows
    var rowIndexOffset = 0;
    foreach (var rowIndex in emptyRowIndexes)
    {
      list.Insert(rowIndex + rowIndexOffset, Enumerable.Repeat('.', list[0].Count).ToList());
      rowIndexOffset++;
    }

    // columns
    var newList = new List<List<char>>();
    foreach (var row in list)
    {
      var newRow = row.ToList();
      var columnIndexOffset = 0;
      foreach (var columnIndex in emptyColumnIndexes)
      {
        newRow.Insert(columnIndex + columnIndexOffset++, '.');
      }

      newList.Add(newRow);
    }

    return newList.Select(row => string.Join("", row)).ToArray();
  }

  public static (List<int>, List<int>) GetEmptyIndexes(List<List<char>> list)
  {
    // go through each row
    var emptyRowIndexes = new List<int>();
    for (var i = 0; i < list.Count; i++)
    {
      if (AreAllEmpty(list[i]))
      {
        emptyRowIndexes.Add(i);
      }
    }

    // go through each column
    var emptyColumnIndexes = new List<int>();
    for (var i = 0; i < list[0].Count; i++)
    {
      var column = list.Select(row => row[i]).ToList();
      if (AreAllEmpty(column))
      {
        emptyColumnIndexes.Add(i);
      }
    }

    return (emptyRowIndexes, emptyColumnIndexes);
  }

  public static bool AreAllEmpty(List<char> list)
  {
    return list.All(c => c == '.');
  }
}

public class Galaxy
{
  public int Y { get; set; }
  public int X { get; set; }
}