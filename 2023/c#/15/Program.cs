using System.Text.RegularExpressions;

namespace _15;

public static class Program
{
    public static void Main(string[] args)
    {
        var file = "input.txt";
        // var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/15/{file}";
        var input = File.ReadAllText(path);

        // // part 1
        // var sum = Part1(input);
        // Console.WriteLine($"Part 1: {sum}");

        // part 2
        var total = Part2(input);
    }

    // init boxes
    public static List<List<(string, int)>> InitBoxes()
    {
        var boxes = new List<List<(string, int)>>();
        for (var i = 0; i < 256; i++)
        {
            boxes.Add(new List<(string, int)>());
        }

        return boxes;
    }


    public static int Part2(string input)
    {
        var steps = input.Split(",");
        var boxes = InitBoxes();

        // LOOP LIST
        //  - get hash
        //  - get box (number)
        //      - if (=num)
        //          - if not exist in box - add to box
        //          - else - change value
        //      - if (-) remove from box

        foreach (var step in steps)
        {
            CheckBox(boxes, step);
        }

        var sum = 0;
        for (var i = 0; i < boxes.Count; i++)
        {
            var box = boxes[i];
            for (var j = 0; j < box.Count; j++)
            {
                var lens = box[j];
                sum += (i + 1) * (j + 1) * lens.Item2;
            }
        }

        Console.WriteLine($"Part 2: {sum}");


        return 0;
    }

    public static void CheckBox(List<List<(string, int)>> boxes, string step)
    {
        var operationIndex = step.IndexOf("=");
        if (operationIndex == -1)
        {
            operationIndex = step.IndexOf("-");
        }

        var label = step.Substring(0, operationIndex);
        var boxNum = GetHashNum(label);

        var operation = step.Substring(operationIndex, 1);
        if (operation == "=")
        {
            // add
            var lensValue = int.Parse(step.Substring(operationIndex + 1));
            var box = boxes[boxNum];

            // check if exist
            for (var i = 0; i < box.Count; i++)
            {
                var item = box[i];
                // change
                if (item.Item1 == label)
                {
                    box[i] = (label, lensValue);
                    return;
                }
            }

            // not exist
            box.Add((label, lensValue));
        }
        else
        {
            var box = boxes[boxNum];
            for (var i = 0; i < box.Count; i++)
            {
                var item = box[i];
                // remove
                if (item.Item1 == label)
                {
                    box.RemoveAt(i);
                    return;
                }
            }
        }
    }

    public static int GetHashNum(string item)
    {
        var currentValue = 0;
        for (var i = 0; i < item.Length; i++)
        {
            var c = item[i];
            var aciiCode = (int)c;
            currentValue += aciiCode;
            currentValue *= 17;
            currentValue = currentValue % 256;
        }

        return currentValue;
    }


    public static int Part1(string input)
    {
        var split = input.Split(",");
        var sum = 0;
        foreach (var item in split)
        {
            var currentValue = 0;
            for (var i = 0; i < item.Length; i++)
            {
                var c = item[i];
                var aciiCode = (int)c;
                currentValue += aciiCode;
                currentValue *= 17;
                currentValue = currentValue % 256;
            }

            sum += currentValue;
        }

        return sum;
    }
}